export default function RadioButton( {
	items,
	name,
	label,
	value,
	isChecked,
	onChange,
	id,
} ) {
	const handleRadioChange = ( e ) => {
		const { id } = e.currentTarget;
		onChange( id );
	};

	return (
		<>
			<input
				className="focus:wm-outline-1 focus:wm-shadow-none"
				type="radio"
				name={ name }
				id={ id }
				value={ value }
				checked={ isChecked }
				onChange={ handleRadioChange }
			/>
			<label
				className="-wm-mt-1.5 wm-ml-2 wm-text-base"
				htmlFor={ value }
			>
				{ label }
			</label>
		</>
	);
}
