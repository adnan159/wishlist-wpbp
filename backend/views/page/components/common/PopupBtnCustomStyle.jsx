import { useState } from 'react';
import InputCSS from './InputCSS';

export default function PopupBtnCustomStyle() {
	const [ borderStyles, setBorderStyles ] = useState( {
		boderWidth: '',
		borderHeight: '',
		borderRadius: '',
		margin: '',
	} );

	const handleColorChange = ( e ) => {
		const { name, value } = e.target;
		setBorderStyles( { ...borderStyles, [ name ]: value } );
		console.log( e.target );
	};

	const borderStyleValue = [
		{
			label: 'Boder width',
			name: 'boderWidth', // Use a colon instead of an equal sign
		},

		{
			label: 'Border radius',
			name: 'borderRadius', // Use a colon instead of an equal sign
		},
		{
			label: 'Border height',
			name: 'borderHeight', // Use a colon instead of an equal sign
		},
		{
			label: 'Margin',
			name: 'margin', // Use a colon instead of an equal sign
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
							value={
								borderStyles[ style.name ]
									? borderStyles[ style.name ]
									: ''
							}
							placeholder={ '10px' }
							onChange={ handleColorChange }
						/>
					</div>
				) ) }
			</div>
		</div>
	);
}
