import { useState } from "react"
import TextArea from "./TextArea"
import ChatWindow from "./Chat/ChatWindow"

function App() {
	const [messages, setMessages] = useState<
		Array<{ text: string; timestamp: string; type: string }>
	>([])

	const handleNewUserMessage = (text: string, type: string) => {
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
			<ChatWindow messages={messages} />
			<TextArea setMessage={handleNewUserMessage} />
		</div>
	)
}

export default App
