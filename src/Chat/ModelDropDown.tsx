import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../Components/Select"

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
	return (
		<Select>
			<SelectTrigger>
				<SelectValue>{selectedModel}</SelectValue>
			</SelectTrigger>
			<SelectContent>
				{models.map((model, i) => (
					<SelectItem
						key={i}
						value={model}
						onClick={() => setSelectedModel(model)}
					>
						{model}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	)
}

export default ModelDropDown
