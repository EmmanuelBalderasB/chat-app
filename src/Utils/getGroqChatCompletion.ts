import { Groq } from "groq-sdk"

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
): Promise<string> => {
	try {
		const response = await groq.chat.completions.create({
			messages: [
				{
					role: "user",
					content: prompt,
				},
			] as ChatMessage[],
			model: modelSelected,
			stream: true,
		})

		let fullResponse: string = ""

		for await (const chunk of response as AsyncIterable<StreamChunk>) {
			const content: string = chunk.choices[0]?.delta?.content ?? ""
			if (content) {
				fullResponse += content
				setStreamMessage?.(fullResponse)
			}
			console.log(chunk)
		}
		return fullResponse
	} catch (error) {
		console.error("Error fetching chat completion:", error as Error)
		throw error
	}
}

export default getGroqChatCompletion
