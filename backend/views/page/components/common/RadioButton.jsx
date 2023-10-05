export default function RadioButton( {
	items,
	name,
	label,
	value,
	isChecked,
	onChange,
} ) {
	const handleRadioChange = ( e ) => {
		const { id } = e.currentTarget;
		onChange( id );
	};

	return (
		<>
			<input
				className="focus:wawl-outline-1 focus:wawl-shadow-none"
				type="radio"
				name={ name }
				id={ value }
				value={ value }
				checked={ isChecked }
				onChange={ handleRadioChange }
			/>
			<label
				className="-wawl-mt-1.5 wawl-ml-2 wawl-text-base"
				htmlFor={ value }
			>
				{ label }
			</label>
		</>
	);
}
