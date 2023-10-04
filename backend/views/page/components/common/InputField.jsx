export default function InputField( {
	label = '',
	type = 'text',
	name,
	value = '',
	placeholder = '',
	classes = '',
	required = false,
	readOnly = false,
	onBlur = null,
	onChange = null,
	onFocus = null,
	toolTip = '',
	toolTipClasses = '',
	dataId = null,
	dataIndex = null,
	checked = false,
} ) {
	return (
		<>
			<div className="" ctx-group ctx-flex ctx-relative>
				{ label && (
					<label
						className="ctx-inline-flex ctx-mt-1 ctx-text-gray-500"
						htmlFor="input-field"
					>
						{ label }
					</label>
				) }
				<input
					type={ type }
					name={ name }
					id={ name }
					data-id={ dataId }
					data-index={ dataIndex }
					value={ value }
					required={ required }
					readOnly={ readOnly }
					autoComplete="off"
					placeholder={ placeholder }
					className="ctx-block ctx-rounded-md !ctx-border-gray-300 ctx-shadow-sm sm:ctx-text-sm"
					onChange={ onChange && onChange }
					onFocus={ onFocus && onFocus }
					onBlur={ onBlur && onBlur }
					checked={ checked && checked }
				/>
			</div>
		</>
	);
}
