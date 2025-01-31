import { useState } from "react"
import PromptInput from "./Chat/PromptInput"
import ChatWindow from "./Chat/ChatWindow"

function App() {
	const models: string[] = [
		"deepseek-r1-distill-llama-70b",
		"distill-whisper-large-v3-en",
		"llama-3.3-70b-versatile",
		"llama-3.2-11b-vision-preview",
		"llama-3.2-90b-vision-preview",
		"mixtral-8x7b-32768",
	]
	const [model, setModel] = useState<string>("deepseek-r1-distill-llama-70b")
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
