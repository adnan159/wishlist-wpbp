import InputCSS from './InputCSS';

export default function PopupBtnCustomStyle( { onChange, items, values } ) {
	return (
		<div className="wawl-grid wawl-grid-cols-1 wawl-max-w-max wawl-p-4 wawl-border wawl-border-gray-200 wawl-rounded-lg">
			<div className=" wawl-col-span-1 wawl-grid wawl-grid-cols-2  wawl-gap-8  wawl-justify-between">
				{ items.map( ( size ) => (
					<div
						key={ size.name }
						className="wawl-flex wawl-justify-between wawl-items-center"
					>
						<label
							className="wawl-text-base wawl-text-gray-500 wawl-my-2.5 wawl-mr-8"
							htmlFor={ size.name }
						>
							{ size.label }
						</label>
						<InputCSS
							className="wawl-h-10 wawl-w-10"
							id={ size.name }
							name={ size.name }
							value={ values[ size.name ] }
							placeholder={ `${ values[ size.name ] }px` }
							onChange={ onChange }
						/>
					</div>
				) ) }
			</div>
		</div>
	);
}
