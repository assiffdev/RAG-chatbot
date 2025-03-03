"use client"
import Image from "next/image"
import f1GPTLogo from "./assets/f1-logo.png"
import { useChat } from 'ai/react';
import { Message } from "ai"

const Home = () => {
    const { append , isLoading , messages, input , handleInputChange , handleSubmit} = useChat()
    const noMessages = true
    return (
        <main>
            <Image src={f1GPTLogo} width="250" height="250" alt="F1GPT"/>
            <section className= {noMessages ? "" : "populated"}>
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
            <form onSubmit= {handleSubmit}>
                    <input className="question-box" onChange={handleInputChange} value={input} placeholder="Ask something about Formula one"/>
                    <input type="submit" />

            </form>
        </main>
    )
}

export default Home