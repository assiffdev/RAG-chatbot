import OpenAI  from "openai";
import { OpenAIStream , StreamingTextResponse} from "ai"
import { DataAPIClient } from "@datastax/astra-db-ts";

const { ASTRA_DB_NAMESPACE , 
    ASTRA_DB_COLLECTION ,
    ASTRA_DB_API_ENDPOINT ,
    ASTRA_DB_API_APPLICATION_TOKEN ,
    OPENAI_API_KEY ,
}= process.env

const openai = new OpenAI({
    apiKey: OPENAI_API_KEY
})

const client = new DataAPIClient(ASTRA_DB_API_APPLICATION_TOKEN)
const db = client.db(ASTRA_DB_API_ENDPOINT , {namespace: ASTRA_DB_NAMESPACE})

export async function POST(req: Request){
    try{
        const { messages } = await req.json()
        const lastMessage = messages[messages.length-1]?.content
    }catch(err){
        console.log("Error in querying db ....")
        
    }
}