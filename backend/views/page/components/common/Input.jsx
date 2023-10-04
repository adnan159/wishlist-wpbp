export default function Input( {
	label = '',
	type = 'text',
	name = '',
	value = '',
	placeholder = '',
	classes = '',
	size = 'wawl-h-12 wawl-w-72',
	required = false,
	onBlur = null,
	onChange,
	onFocus = null,
	dataId = null,
	dataIndex = null,
	checked = false,
	accept = '',
} ) {
	return (
		<div className="">
			{ /* { label && (
				<label
					className="ctx-inline-flex ctx-mt-1 ctx-text-gray-500"
					htmlFor="input-field"
				>
					{ label }
				</label>
			) } */ }

			<input
				className={ [
					'wawl-block wawl-rounded-md wawl-border-0 wawl-py-1.5 !wawl-px-4 wawl-text-gray-900 wawl-ring-1 wawl-ring-inset placeholder:!wawl-text-gray-400 focus:!wawl-ring-1 focus:!wawl-ring-inset focus:!wawl-ring-gray-200 focus:!wawl-border-none sm:wawl-text-sm sm:wawl-leading-6 wawl-shadow-lg',
					classes,
					size,
				].join( ' ' ) }
				type={ type }
				name={ name }
				id={ name }
				data-id={ dataId }
				data-index={ dataIndex }
				required={ required }
				autoComplete="off"
				placeholder={ placeholder }
				accept={ accept }
				onChange={ onChange && onChange }
				onFocus={ onFocus && onFocus }
				onBlur={ onBlur && onBlur }
			/>
		</div>
	);
}
