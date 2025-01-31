import { useEffect, useState } from "react"
import PromptInput from "./Chat/PromptInput"
import ChatWindow from "./Chat/ChatWindow"

function App() {
	const [messages, setMessages] = useState<
		Array<{ text: string; timestamp: string; type: string }>
	>([])
	const [chatHistory, setChatHistory] = useState<
		Array<{ role: string; content: string }>
	>([])

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

	useEffect(() => {
		console.log(chatHistory)
	}, [chatHistory])

	return (
		<div className="w-screen h-screen bg-zinc-900 flex flex-col justify-center items-center">
			<ChatWindow messages={messages} />
			<PromptInput
				setMessage={setMessage}
				chatHistory={chatHistory}
				setChatHistory={setChatHistory}
			/>
		</div>
	)
}

export default App
