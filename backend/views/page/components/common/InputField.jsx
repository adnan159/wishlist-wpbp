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
			<div className="" wm-group wm-flex wm-relative>
				{ label && (
					<label
						className="wm-inline-flex wm-mt-1 wm-text-gray-500"
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
					className="wm-block wm-rounded-md !wm-border-gray-300 wm-shadow-sm sm:wm-text-sm"
					onChange={ onChange && onChange }
					onFocus={ onFocus && onFocus }
					onBlur={ onBlur && onBlur }
					checked={ checked && checked }
				/>
			</div>
		</>
	);
}
