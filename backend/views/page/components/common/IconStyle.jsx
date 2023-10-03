import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateProductListing } from '../../redux/reducers/productListingSlice';
import InputColor from '../common/InputColor';
import InputCSS from './InputCSS';

export default function InputColorPicker( { iconStyleProps } ) {
	const [ iconStyles, setIconStyles ] = useState( {
		icon_size: '',
		icon_color: '',
		icon_hover_color: '',
	} );
	useEffect( () => {
		handleUpdateSettings();
	}, [ iconStyles ] );

	const dispatch = useDispatch();

	const handleUpdateSettings = () => {
		dispatch(
			updateProductListing( {
				listing_icon_style: {
					...iconStyles,
				},
			} )
		);
	};
	const handleIconStyleChange = ( e ) => {
		const { name, value } = e.target;
		console.log(
			`📌 ~ file: InputColorPicker.jsx:14 ~ handleColorChange ~ name, value:`,
			name,
			value
		);

		setIconStyles( { ...iconStyles, [ name ]: value } );
	};

	const iconStylesValue = [
		{
			label: 'Size',
			name: 'icon_size', // Use a colon instead of an equal sign
		},
		{
			label: 'Icon color',
			name: 'icon_color', // Use a colon instead of an equal sign
		},
		{
			label: 'Icon hover color',
			name: 'icon_hover_color', // Use a colon instead of an equal sign
		},
	];

	return (
		<div className="wawl-grid wawl-grid-cols-1 wawl-w-72 wawl-px-4 wawl-border wawl-border-gray-200 wawl-rounded-lg">
			<div className=" wawl-col-span-1  wawl-gap-8  wawl-justify-between">
				{ iconStyleProps.map( ( style, index ) => (
					<div
						key={ index }
						className="wawl-flex wawl-justify-between wawl-items-center wawl-my-4"
					>
						<label
							className="wawl-text-base wawl-text-gray-500 wawl-mr-8"
							htmlFor={ style.name }
						>
							{ style.label }
						</label>
						{ style.name === 'icon_size' ? (
							<InputCSS
								className="wawl-h-10 wawl-w-10"
								id={ style.name }
								name={ style.name }
								value={ iconStyles[ style.name ] || '' }
								placeholder={ '10px' }
								onChange={ ( e ) => {
									handleIconStyleChange( e );
								} }
							/>
						) : (
							<InputColor
								className="wawl-h-10 wawl-w-10"
								name={ style.name }
								value={
									iconStyles[ style.name ]
										? iconStyles[ style.name ]
										: '#ffffff'
								}
								// onChange={handleColorChange}
								onChange={ ( e ) => {
									handleIconStyleChange( e );
								} }
							/>
						) }
					</div>
				) ) }
			</div>
		</div>
	);
}
