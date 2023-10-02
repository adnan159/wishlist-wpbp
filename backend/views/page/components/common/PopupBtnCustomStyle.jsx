import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateWishlistSetting } from '../../redux/reducers/wishlistSlice';
import InputCSS from './InputCSS';

export default function PopupBtnCustomStyle( onBtnBorderStyleChange ) {
	const [ btnBorderStyles, setBtnBorderStyles ] = useState( {
		border_width: '',
		border_height: '',
		border_radius: '',
		popup_button_margin: '',
	} );
	useEffect( () => {
		handleUpdateSettings();
	}, [ btnBorderStyles ] );

	const dispatch = useDispatch();

	const handleUpdateSettings = () => {
		// Example: Update the "default_wishlist_name" property

		dispatch(
			updateWishlistSetting( {
				popup_button_size: { ...btnBorderStyles },
			} )
		);
	};
	const handleBtnBorderStyleChange = ( e ) => {
		const { name, value } = e.target;
		console.log(
			`📌 ~ file: InputColorPicker.jsx:14 ~ handleColorChange ~ name, value:`,
			name,
			value
		);
		// const updatedValue = value.endsWith( 'px' ) ? value : value + 'px'; // Add 'px' if not present
		// setBtnBorderStyles( { ...btnBorderStyles, [ name ]: updatedValue } );
		setBtnBorderStyles( { ...btnBorderStyles, [ name ]: value } );
	};

	// const handleColorChange = ( e ) => {
	// 	const { name, value } = e.target;
	// 	setBtnBorderStyles( { ...btnBorderStyles, [ name ]: value } );
	// 	console.log( e.target );
	// };

	const borderStyleValue = [
		{
			label: 'Boder width',
			name: 'border_width', // Use a colon instead of an equal sign
		},

		{
			label: 'Border radius',
			name: 'border_height', // Use a colon instead of an equal sign
		},
		{
			label: 'Border height',
			name: 'border_radius', // Use a colon instead of an equal sign
		},
		{
			label: 'Margin',
			name: 'popup_button_margin', // Use a colon instead of an equal sign
		},
	];

	return (
		<div className="wawl-grid wawl-grid-cols-1 wawl-max-w-max wawl-p-4 wawl-border wawl-border-gray-200 wawl-rounded-lg">
			<div className=" wawl-col-span-1 wawl-grid wawl-grid-cols-2  wawl-gap-8  wawl-justify-between">
				{ borderStyleValue.map( ( style, index ) => (
					<div
						key={ index }
						className="wawl-flex wawl-justify-between wawl-items-center"
					>
						<label
							className="wawl-text-base wawl-text-gray-500 wawl-my-2.5 wawl-mr-8"
							htmlFor={ style.name }
						>
							{ style.label }
						</label>
						<InputCSS
							className="wawl-h-10 wawl-w-10"
							id={ style.name }
							name={ style.name }
							value={ btnBorderStyles[ style.name ] || '' }
							placeholder={ '10px' }
							onChange={ ( e ) => {
								handleBtnBorderStyleChange( e );
							} }
						/>
					</div>
				) ) }
			</div>
		</div>
	);
}
