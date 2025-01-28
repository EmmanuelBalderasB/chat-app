import React from "react"
import "./Message.css"

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
			<div className="max-w-32 bg-zinc-200 p-4 rounded-lg text-zinc-900">
				<div className="message-text">{text}</div>
			</div>
		</div>
	)
}

export default UserMessage
