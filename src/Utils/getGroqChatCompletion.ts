import { Groq } from "groq-sdk"
import systemPrompt from "./systemPrompt"

// Define interfaces
interface ChatMessage {
	role: "user" | "assistant" | "system"
	content: string
}

interface ChatDelta {
	content?: string
}

interface StreamChunk {
	choices: Array<{
		delta: ChatDelta
		index: number
	}>
}

const groq = new Groq({
	apiKey: import.meta.env.VITE_GROQ_API_KEY,
	dangerouslyAllowBrowser: true,
})

const getGroqChatCompletion = async (
	prompt: string,
	modelSelected: string,
	setStreamMessage?: (message: string) => void,
	chatHistory?: Array<{ role: string; content: string }>,
): Promise<string> => {
	try {
		const response = await groq.chat.completions.create({
			messages: [
				{
					role: "system",
					content: systemPrompt + JSON.stringify(chatHistory),
				},
				{
					role: "user",
					content: prompt,
				},
			] as ChatMessage[],
			model: modelSelected,
			stream: true,
		})
		console.log(systemPrompt + JSON.stringify(chatHistory))
		let fullResponse: string = ""

		for await (const chunk of response as AsyncIterable<StreamChunk>) {
			const content: string = chunk.choices[0]?.delta?.content ?? ""
			if (content) {
				fullResponse += content
				setStreamMessage?.(fullResponse)
			}
			//console.log(chunk)
		}
		return fullResponse
	} catch (error) {
		console.error("Error fetching chat completion:", error as Error)
		throw error
	}
}

export default getGroqChatCompletion
