export default function RadioButton( {
	changed,
	id,
	isSelected,
	label,
	value,
} ) {
	return (
		<div className="RadioButton">
			<input
				id={ id }
				onChange={ changed }
				value={ value }
				type="radio"
				checked={ isSelected }
			/>
			<label htmlFor={ id }>{ label }</label>
		</div>
	);
}
