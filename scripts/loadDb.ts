//to interact with Astra db that support vector search
import { DataAPIClient } from "@datastax/astra-db-ts"
//for web scrapping using puppeteer
import { PuppeteerWebBaseLoader } from "langchain/document_loaders/web/puppeteer"
// to use openai api for text embeddings generation
import OpenAI from "openai"
// to convert large text into manageable chunks
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter"

import "dotenv/config"

type SimilarityMetric = "dot_product" | "cosine" | "euclidean"

const { ASTRA_DB_NAMESPACE , 
        ASTRA_DB_COLLECTION ,
        ASTRA_DB_API_ENDPOINT ,
        ASTRA_DB_API_APPLICATION_TOKEN ,
        OPENAI_API_KEY ,
    }= process.env
//initialize openai api client
const openai = new OpenAI({ apiKey : OPENAI_API_KEY })

const f1Data = [
    'https://en.wikipedia.org/wiki/Formula_One',
    'https://www.formula1.com/en/latest/all',
    'https://www.formula1.com/en/racing/2024.html'
]

//initializes AstraDb client with APT Token
const client =  new DataAPIClient(ASTRA_DB_API_APPLICATION_TOKEN)
//using client connect to namespace using API end point
const db = client.db(ASTRA_DB_API_ENDPOINT, {namespace: ASTRA_DB_NAMESPACE})

const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 512, //512 character chunk
    chunkOverlap: 100 // 100 character overlap or 100 character share with adjacent chunks
})
// Now going to create a collection in Astra DB
const createCollection = async (similarityMetric:SimilarityMetric = "dot_product") => {
    const res = await db.createCollection(ASTRA_DB_COLLECTION, {
        vector: {
            dimension: 1536, //1536 dimensional vector (assuming OpenAI's embedding size for text-embedding-3-small model)
            metric: similarityMetric // default dot_product
        }
    })
    console.log(res)
}

const loadSampleData = async () => {
    //fetch Astra DB collection
    const collection = await db.collection(ASTRA_DB_COLLECTION)
    //for each url in f1data
    for await ( const url of f1Data){
        //scrapes the page using url
        const content = await scrapePage(url)
        //splits the content into chunks
        const chunks = await splitter.splitText(content)
        for await (const chunk of chunks){
            // generates embeddings for each chunk 
            const embedding = await openai.embeddings.create({
                model: "text-embedding-3-small",
                input: chunk , 
                encoding_format: "float"
            })
            
            const vector = embedding.data[0].embedding
            // insert embeddings as vector into AstraDB with original chunk text
            const res = await collection.insertOne({
                $vector : vector,
                text: chunk
            })
            console.log(res)
        }
    }
}

const scrapePage = async (url: string) => {
    //load page in headless mode and wait till dom content fully loaded
    // headless means running a browser without any GUI 
    // to allowing for automated interaction with web pages through code or a command-line interface. 
    const loader = new PuppeteerWebBaseLoader(url , {
        launchOptions: {
            headless: true
        },
        gotoOptions: {
            waitUntil: "domcontentloaded"
        },
        evaluate: async (page , browser) => {
            const result = await page.evaluate(()=> document.body.innerHTML)
            await browser.close()
            return result
        }
    })
    //remove tags and return just plain text.
    return (await loader.scrape())?.replace(/<[^>]*>?/gm , '')
}

createCollection().then(() => loadSampleData())