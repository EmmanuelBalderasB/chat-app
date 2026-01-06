import { useState } from "react"
import PromptInput from "./Chat/PromptInput"
import ChatWindow from "./Chat/ChatWindow"

function App() {
	const models: string[] = [
		"qwen/qwen3-32b",
		"openai/gpt-oss-20b",
		"llama-3.3-70b-versatile",
		"llama-3.1-8b-instant",
		"meta-llama/llama-4-maverick-17b-128e-instruct",
		"openai/gpt-oss-120b",
		"groq/compound",
	]
	const [model, setModel] = useState<string>("llama-3.3-70b-versatile")
	const [messages, setMessages] = useState<
		Array<{ text: string; timestamp: string; type: string }>
	>([])
	const [chatHistory, setChatHistory] = useState<
		Array<{ role: string; content: string }>
	>([])
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [streamMessage, setStreamMessage] = useState<string>("")
	const setMessage = (text: string, type: string) => {
		setMessages((prev) => [
			...prev,
			{
				text,
				timestamp: new Date().toLocaleTimeString(),
				type,
			},
		])
	}

	return (
		<div className="w-screen h-screen bg-zinc-900 flex flex-col justify-center items-center">
			<ChatWindow
				messages={messages}
				isLoading={isLoading}
				streamMessage={streamMessage}
			/>
			<PromptInput
				setMessage={setMessage}
				chatHistory={chatHistory}
				setChatHistory={setChatHistory}
				setStreamMessage={setStreamMessage}
				isLoading={isLoading}
				setIsLoading={setIsLoading}
				models={models}
				model={model}
				setModel={setModel}
			/>
		</div>
	)
}

export default App
