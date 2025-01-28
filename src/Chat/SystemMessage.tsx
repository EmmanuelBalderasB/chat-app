interface SystemMessageProps {
	text: string
	timestamp: string
}

const SystemMessage: React.FC<SystemMessageProps> = ({ text, timestamp }) => {
	console.log(text, timestamp)
	return (
		<div className="message-container flex flex-col items-start mb-3">
			<div className="message-timestamp text-sm text-zinc-500">
				{timestamp}
			</div>
			<div className="max-w-32 text-zinc-200 px-4 py-2 rounded-lg">
				<div className="message-text">{text}</div>
			</div>
		</div>
	)
}

export default SystemMessage
