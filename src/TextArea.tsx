/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, FormEvent } from "react"

const TextArea: React.FC = () => {
	const placeholders: string[] = [
		"Type your prompt",
		"Type your prompt.",
		"Type your prompt..",
		"Type your prompt...",
	]
	const [placeholderIndex, setPlaceholderIndex] = useState<number>(0)
	const [inputValue, setInputValue] = useState<string>("")
	const placeholder: string = placeholders[placeholderIndex]

	useEffect(() => {
		const interval: NodeJS.Timeout = setInterval(() => {
			setPlaceholderIndex(
				(prevIndex: number) => (prevIndex + 1) % placeholders.length,
			)
		}, 500)
		return () => clearInterval(interval)
	}, [])

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault() // Prevent page reload
		console.log(inputValue) // Log the input value
		setInputValue("") // Clear the input after submission
	}

	return (
		<div className="flex flex-col justify-center items-center w-1/2 absolute bottom-16 left-0 right-0 mx-auto">
			<label
				htmlFor="textarea"
				className="mb-2 font-light text-sm text-zinc-500"
			>
				Make sure you agree to our Terms and our Privacy Policy
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
