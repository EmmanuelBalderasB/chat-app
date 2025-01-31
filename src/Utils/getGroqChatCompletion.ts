import { Groq } from "groq-sdk"

const groq = new Groq({
	apiKey: import.meta.env.VITE_GROQ_API_KEY, // Your API key
	dangerouslyAllowBrowser: true,
})

const getGroqChatCompletion = async (
	prompt: string,
	modelSelected: string,
): Promise<unknown> => {
	try {
		const response = await groq.chat.completions.create({
			messages: [
				{
					role: "user",
					content: prompt,
				},
			],
			model: modelSelected,
			stream: true,
		})

		let fullResponse: string = ""

		for await (const chunk of response) {
			const content: string = chunk.choices[0].delta.content ?? ""
			if (content) {
				fullResponse += content
			}
			console.log(chunk)
		}
		return fullResponse
	} catch (error) {
		console.error("Error fetching chat completion:", error)
		throw error
	}
}

export default getGroqChatCompletion
