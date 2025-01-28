import SystemMessage from "./SystemMessage"
import UserMessage from "./UserMessage"

interface ChatWindowProps {
	messages: Array<{ text: string; timestamp: string; type: string }>
}
const ChatWindow: React.FC<ChatWindowProps> = ({ messages }) => {
	return (
		<div
			className={`max-h-10/12 ${messages.length > 0 ? "h-10/12" : ""} w-2/3 px-4 py-4 overflow-y-auto resize-none`}
		>
			{messages.map((msg, i) =>
				msg.type === "user" ? (
					<UserMessage
						key={i}
						text={msg.text}
						timestamp={msg.timestamp}
					/>
				) : (
					<SystemMessage
						key={i}
						text={msg.text}
						timestamp={msg.timestamp}
					/>
				),
			)}
		</div>
	)
}

export default ChatWindow
