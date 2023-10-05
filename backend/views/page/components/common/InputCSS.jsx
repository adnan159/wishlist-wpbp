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
					className="wawl-h-8 wawl-w-16 wawl-text-center wawl-bg-gray-400"
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
