interface SystemMessageProps {
	text: string
	timestamp: string
}

const SystemMessage: React.FC<SystemMessageProps> = ({ text, timestamp }) => {
	console.log(text, timestamp)
	return <></>
}

export default SystemMessage
