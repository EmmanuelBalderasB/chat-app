/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, FormEvent } from "react"
import getGroqChatCompletion from "../Utils/getGroqChatCompletion"
import ModelDropDown from "./ModelDropDown"

interface PromptInputProps {
	// Function to set the message in the chat window
	setMessage: (message: string, type: string) => void

	// Chat history state and setter
	chatHistory: Array<{ role: string; content: string }>
	setChatHistory: (
		chatHistory: Array<{ role: string; content: string }>,
	) => void
	setStreamMessage: (message: string) => void
	isLoading: boolean
	setIsLoading: (isLoading: boolean) => void
	models: string[]
	model: string
	setModel: (model: string) => void
}

const PromptInput: React.FC<PromptInputProps> = ({
	setMessage,
	chatHistory,
	setChatHistory,
	setStreamMessage,
	isLoading,
	setIsLoading,
	models,
	model,
	setModel,
}) => {
	const placeholders: string[] = [
		"Type your prompt",
		"Type your prompt.",
		"Type your prompt..",
		"Type your prompt...",
	]

	const [placeholderIndex, setPlaceholderIndex] = useState<number>(0)
	const placeholder: string = placeholders[placeholderIndex]
	const [inputValue, setInputValue] = useState<string>("")
	const [chatStarted, setChatStarted] = useState<boolean>(false)

	useEffect(() => {
		const interval: NodeJS.Timeout = setInterval(() => {
			setPlaceholderIndex(
				(prevIndex: number) => (prevIndex + 1) % placeholders.length,
			)
		}, 500)
		return () => clearInterval(interval)
	}, [])

	useEffect(() => {
		if (chatHistory.length > 0) {
			setChatHistory([])
		}
	}, [model])

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		if (inputValue.length === 0 || isLoading) {
			return null
		}

		setIsLoading(true)
		setMessage(inputValue, "user")
		setChatStarted(true)

		try {
			// Get the title of the conversation
			const title = await getGroqChatCompletion(
				"give me a title for a conversation where the user asked the following question:" +
					inputValue +
					"ONLY RESPOND WITH THE TITLE NAME",
				"llama-3.3-70b-versatile",
			)

			// Get the response from the model
			const llmResponse = await getGroqChatCompletion(
				inputValue,
				model,
				setStreamMessage,
				chatHistory,
			)
			//console.log(title)
			document.title = ("Chat App | " + title) as string
			setMessage(llmResponse as string, "system")
			setChatHistory([
				...chatHistory,
				{ role: "user", content: inputValue },
				{ role: "system", content: llmResponse as string },
			])
		} catch (error) {
			setInputValue("")
			setStreamMessage("")
			setIsLoading(false)
			console.error("Error getting chat completion:", error)
		} finally {
			setInputValue("") // Clear the input after submission
			setStreamMessage("")
			setIsLoading(false)
		}
	}

	return (
		<div className="flex flex-col justify-center items-center w-1/2 border-1 border-zinc-700 bg-zinc-800 px-4 py-3 rounded-xl text-gray-200">
			<label
				htmlFor="textarea"
				className="mb-2 font-light text-sm text-zinc-500"
			>
				{chatStarted
					? null
					: "Make sure you agree to our Terms and our Privacy Policy"}
			</label>
			<form onSubmit={handleSubmit} className="w-full">
				<input
					name="textarea"
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					className="py-2 px-2 w-full resize-none outline-none overflow-y-visible  disabled:text-zinc-600 disabled:cursor-not-allowed"
					placeholder={placeholder}
					disabled={isLoading}
				/>
			</form>
			<div className="flex flex-row justify-center items-center w-fit hover:cursor-pointer self-end text-zinc-400 outline-none active:outline-none focus:outline-none">
				<ModelDropDown
					models={models}
					selectedModel={model}
					setSelectedModel={setModel}
				/>
			</div>
		</div>
	)
}

export default PromptInput
