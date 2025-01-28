import React from "react"

interface MessageProps {
	text: string
	timestamp: string
}

const UserMessage: React.FC<MessageProps> = ({ text, timestamp }) => {
	return (
		<div className="message-container flex flex-col items-end mb-3">
			<div className="message-timestamp text-sm text-zinc-500">
				{timestamp}
			</div>
			<div className="max-w-32 bg-zinc-200 px-4 py-2 rounded-lg text-zinc-900">
				<div className="message-text">{text}</div>
			</div>
		</div>
	)
}

export default UserMessage
