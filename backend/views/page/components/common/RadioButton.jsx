import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectWishlist,
	updateWishlistSetting,
} from '../../redux/reducers/wishlistSlice';
// Import the action and selector

export default function RadioButton( { items, classes = '' } ) {
	const dispatch = useDispatch();
	const radioButtonValue = useSelector( selectWishlist );

	const [ checked, setChecked ] = useState( radioButtonValue );
	const [ value, setValue ] = useState( '' );
	// useEffect( () => {
	// 	setValue( items.find( ( item ) => item.id === checked )?.value || ' ' );
	// }, [ checked, items ] );
	useEffect( () => {
		handleUpdateSettings();
	}, [ checked, value ] );

	const handleUpdateSettings = () => {
		// Example: Update the "default_wishlist_name" property
		dispatch(
			updateWishlistSetting( {
				enable_wishlist_for: value,
			} )
		);
	};
	const handleChange = ( e ) => {
		// const name = e.target.name;
		const newValue = e.target.id;
		console.log(
			`📌 ~ file: PopupInputs.jsx:14 ~ handlePopupInputs ~ name, value:`,
			newValue
		);
		setChecked( newValue );
		setValue( items.find( ( item ) => item.id === checked )?.value || ' ' );
	};

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
						className="focus:wawl-outline-1 focus:wawl-shadow-none"
						type="radio"
						name="radioValue"
						id={ item.id }
						value={ item.value }
						checked={ checked === item.id }
						onChange={ ( e ) => {
							handleChange( e );
						} }
					/>
					<label
						className="-wawl-mt-1.5 wawl-ml-2 wawl-text-base"
						htmlFor={ item.value }
					>
						{ item.title }
					</label>
				</div>
			) ) }
			<h2>{ checked ? value : 'hello' }</h2>
		</>
	);
}
