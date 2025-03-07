"use client"
import Image from "next/image"
import f1GPTLogo from "./assets/f1-logo.jpg"
import { useChat } from 'ai/react';
import { Message } from "ai"
import Bubble from "./components/Bubble"
import LoadingBubble from "./components/LoadingBubble";
import PromptSuggestionsRow from "./components/PromptSuggestionsRow";

const Home = () => {
    const handlePrompt = (promptText) => {
        const msg:Message = {
            id: crypto.randomUUID(),
            content: promptText ,
            role: "user"
        }
        append(msg)
    }
    const { append , isLoading , messages, input , handleInputChange , handleSubmit} = useChat()
    const noMessages = !messages || messages.length == 0
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
                        {<PromptSuggestionsRow onPromptClick={handlePrompt}/>}
                    </>

                ) : (
                    <>
                        {messages.map((message , index) => <Bubble key={`message-${index}`} message={message}/>)}
                        {isLoading && <LoadingBubble />}
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