export default function InputCSS( {
	id,
	name,
	value,
	placeholder,
	onChange,
	onFocus,
	onBlur,
} ) {
	return (
		<>
			<div className="color-input-container">
				<input
					className="wm-h-8 wm-w-16 wm-text-center wm-bg-gray-400"
					type="text"
					id={ id }
					name={ name }
					value={ value || '' }
					placeholder={ placeholder }
					onChange={ onChange }
					onBlur={ onBlur }
				/>
			</div>
		</>
	);
}
