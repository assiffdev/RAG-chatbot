import PromptSuggestionButton from "./PromptSuggestionButton"

const PromptSuggestionsRow = ({onPromptClick}) => {
    const propmpts = [
        "Who is head of racing for Aston Martin's F1 Academy team?",
        "Who is the highest paid F1 driver?",
        "Who will be the newest driver for Ferrari?",
        "Who is the current Formula One World Driver's Champion?"
    ]
    return (
        <div className="prompt-suggestion-row">
            {propmpts.map((prompt , index) => 
            <PromptSuggestionButton
             key={`suggestion-${index}`}
             text={prompt}
             onClick={onPromptClick}
             />
             )}
            
        </div>
    )
}
export default PromptSuggestionsRow