import InputCSS from './InputCSS';

export default function PopupBtnCustomStyle( { onChange, items, values } ) {
	return (
		<div className="wm-grid wm-grid-cols-1 wm-max-w-max wm-p-4 wm-border wm-border-gray-200 wm-rounded-lg">
			<div className=" wm-col-span-1 wm-grid wm-grid-cols-2  wm-gap-8  wm-justify-between">
				{ items.map( ( size ) => (
					<div
						key={ size.name }
						className="wm-flex wm-justify-between wm-items-center"
					>
						<label
							className="wm-text-base wm-text-gray-500 wm-my-2.5 wm-mr-8"
							htmlFor={ size.name }
						>
							{ size.label }
						</label>
						<InputCSS
							className="wm-h-10 wm-w-10"
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
