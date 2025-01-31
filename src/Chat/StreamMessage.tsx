interface StreamMessageProps {
	text: string
}

const StreamMessage: React.FC<StreamMessageProps> = ({ text }) => {
	return (
		<div className="message-container flex flex-col items-start mb-3">
			<div className="message-timestamp text-sm text-zinc-500">
				{new Date().toLocaleTimeString()}
			</div>
			<div className="max-w-2/3 text-zinc-200 px-4 py-2 rounded-lg">
				<div className="message-text">{text}</div>
			</div>
		</div>
	)
}

export default StreamMessage
