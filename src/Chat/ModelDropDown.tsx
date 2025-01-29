interface ModelDropDownProps {
	models: Array<string>
	selectedModel: string
	setSelectedModel: (model: string) => void
}

const ModelDropDown: React.FC<ModelDropDownProps> = ({
	models,
	selectedModel,
	setSelectedModel,
}) => {
	console.log(models)
	return (
		<select
			value={selectedModel}
			onChange={(e) => setSelectedModel(e.target.value)}
		>
			{models.map((model: string, i: number) => (
				<option key={i} value={model}>
					{model}
				</option>
			))}
		</select>
	)
}

export default ModelDropDown
