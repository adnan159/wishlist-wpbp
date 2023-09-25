export default function Radio( { items } ) {
	// const items = [
	// 	{ id: null, title: 'Option 1', value: 'option1' },
	// 	{ id: 1, title: 'Option 2', value: 'option2' },
	// 	{ title: 'Option 3', value: 'option3' },
	// ];
	return (
		<fieldset>
			<div className="wawl-mt-4 wawl-divide-y wawl-divide-gray-200 wawl-border-b wawl-border-t wawl-border-gray-200">
				{ items.map( ( item, index ) => (
					<div
						key={ index }
						className="wawl-relative wawl-flex wawl-items-start wawl-py-4"
					>
						<div className="wawl-min-w-0 wawl-flex-1 wawl-text-sm wawl-leading-6">
							<label
								htmlFor={ `item-${ item.id }` }
								className="wawl-select-none wawl-font-medium wawl-text-gray-900"
							>
								{ item.title }
							</label>
						</div>
						<div className="wawl-ml-3 wawl-flex wawl-h-6 wawl-items-center">
							<input
								id={ `item-${ item.id }` }
								name="plan"
								type="radio"
								defaultChecked={ item.id === null }
								className="wawl-h-4 wawl-w-4 wawl-border-gray-300 wawl-text-indigo-600 focus:wawl-ring-indigo-600"
							/>
						</div>
					</div>
				) ) }
			</div>
		</fieldset>
	);
}
