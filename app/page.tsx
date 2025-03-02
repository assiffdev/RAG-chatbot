"use client"
import Image from "next/image"
import F1Logo from "./assets/f1-logo.png"
import { useChat } from "ai/react"
import { Message } from "ai"

const Home = () => {
    const noMessages = true
    return (
        <main>
            <Image src={F1Logo} width="250" height="250" alt="F1GPT"/>
            <section>
                {noMessages ? (
                    <>
                        <p className="starter-text">
                            The Ultimate Place for formula one super fans.
                            Ask anything about the fantastic topics of formula one racing
                        </p>
                        <br/>
                        {/*<PromptSuggestionRow/>*/}
                    </>

                ) : (
                    <>
                        {/*map messages onto text bubbles */}
                        {/*<LoadingBubble />*/}
                    </>
                )}
            </section>
        </main>
    )
}

export default Home