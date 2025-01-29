import { Groq } from "groq-sdk"

const groq = new Groq({
	apiKey: process.env.GROQ_API_KEY, // Your API key
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
		})
		return response.choices[0].message.content
	} catch (error) {
		console.error("Error fetching chat completion:", error)
		throw error
	}
}

export default getGroqChatCompletion
