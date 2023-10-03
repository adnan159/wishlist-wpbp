import { useEffect, useState } from 'react';

export default function RadioButton( { items, classes = '' } ) {
	const [ checked, setChecked ] = useState( '1' );
	const [ value, setValue ] = useState( '' );

	const handleChange = ( event ) => {
		setChecked( event.target.id );
		setValue( event.target.value );
	};
	const toggleRadio = () => {
		// Toggle the checked state between '1' and '2' (or any other value)
		const newValue = checked === '1' ? '2' : '1';
		setChecked( newValue );
	};
	useEffect( () => {
		setValue( items.find( ( item ) => item.id === checked )?.value || ' ' );
	}, [ checked, items ] );
	return (
		<>
			{ items.map( ( item ) => (
				<div
					key={ item.id }
					className={ [
						'wawl-text-gray-800 wawl-items-center wawl-mb-4  wawl-inline-flex',
						classes,
					].join( ' ' ) }
				>
					<input
						className=" focus:wawl-outline-1 focus:wawl-shadow-none"
						type="radio"
						name="radioValue"
						id={ item.id }
						value={ item.value }
						checked={ checked === item.id }
						onChange={ handleChange }
					/>
					<label
						className=" -wawl-mt-1.5 wawl-ml-2 wawl-text-base"
						htmlFor={ item.value }
					>
						{ item.title }
					</label>
				</div>
			) ) }
			{ /* <h2>{ checked ? value : 'hello' }</h2> */ }
		</>
	);
}
