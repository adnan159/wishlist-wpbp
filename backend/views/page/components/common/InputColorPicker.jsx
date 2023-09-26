import { useState } from 'react';
import InputColor from '../common/InputColor';

export default function InputColorPicker( { onColorChange } ) {
	const [ colors, setColors ] = useState( {
		background_color: '',
		background_hover_color: '',
		border_color: '',
		border_hover_color: '',
	} );

	const handleColorChange = ( e ) => {
		const { name, value } = e.target;
		setColors( { ...colors, [ name ]: value } );
		onColorChange( name, value );
		if ( onColorChange ) {
			onColorChange( 'popup_button_color', colors );
		}
	};

	const colorValue = [
		{
			label: 'Background color',
			name: 'background_color', // Use a colon instead of an equal sign
		},

		{
			label: 'Border color',
			name: 'border_color', // Use a colon instead of an equal sign
		},
		{
			label: 'Background hover color',
			name: 'background_hover_color', // Use a colon instead of an equal sign
		},
		{
			label: 'Border hover color',
			name: 'border_hover_color', // Use a colon instead of an equal sign
		},
	];

	return (
		<div className="wawl-grid wawl-grid-cols-1 wawl-max-w-max wawl-p-4 wawl-border wawl-border-gray-200 wawl-rounded-lg">
			<div className=" wawl-col-span-1 wawl-grid wawl-grid-cols-2  wawl-gap-8  wawl-justify-between">
				{ colorValue.map( ( color, index ) => (
					<div
						key={ index }
						className="wawl-flex wawl-justify-between wawl-items-center"
					>
						<label
							className="wawl-text-base wawl-text-gray-500 wawl-my-2.5 wawl-mr-8"
							htmlFor={ color.name }
						>
							{ color.label }
						</label>
						<InputColor
							className="wawl-h-10 wawl-w-10"
							id={ color.name }
							name={ color.name }
							value={
								colors[ color.name ]
									? colors[ color.name ]
									: '#ffffff'
							}
							onChange={ handleColorChange }
						/>
					</div>
				) ) }
			</div>
		</div>
	);
}
