/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, FormEvent } from "react"

interface TextAreaProps {
	// Add props here
	setMessage: (message: string, type: string) => void
}

const TextArea: React.FC<TextAreaProps> = ({ setMessage }) => {
	const placeholders: string[] = [
		"Type your prompt",
		"Type your prompt.",
		"Type your prompt..",
		"Type your prompt...",
	]

	const [placeholderIndex, setPlaceholderIndex] = useState<number>(0)
	const [inputValue, setInputValue] = useState<string>("")
	const placeholder: string = placeholders[placeholderIndex]
	const [chatStarted, setChatStarted] = useState<boolean>(false)
	useEffect(() => {
		const interval: NodeJS.Timeout = setInterval(() => {
			setPlaceholderIndex(
				(prevIndex: number) => (prevIndex + 1) % placeholders.length,
			)
		}, 500)
		return () => clearInterval(interval)
	}, [])

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		console.log(inputValue)
		// Call the setMessage function with the input value
		setMessage(inputValue, "user")
		setChatStarted(true)
		setInputValue("") // Clear the input after submission
	}

	return (
		<div className="flex flex-col justify-center items-center w-1/2">
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
					className="border-1 border-zinc-700 bg-zinc-800 px-2 py-4 w-full rounded-xl text-gray-200 resize-none outline-none overflow-y-visible"
					placeholder={placeholder}
				/>
			</form>
		</div>
	)
}

export default TextArea
