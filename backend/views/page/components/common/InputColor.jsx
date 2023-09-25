import { useRef, useState } from 'react';
import { HiMiniEyeDropper } from 'react-icons/hi2';

export default function InputColor( { id, name, value, onClick, onChange } ) {
	const [ showIcon, setShowIcon ] = useState( true );
	const inputRef = useRef( null ); // Create a ref for the input element

	const handleToggleIcon = () => {
		setShowIcon( ! showIcon );
		if ( inputRef.current ) {
			inputRef.current.click(); // Trigger a click event on the input element
		}
	};

	return (
		<>
			<div className="color-input-container">
				{ showIcon ? (
					<span className="pen-icon" onClick={ handleToggleIcon }>
						<HiMiniEyeDropper className="wawl-text-gray-400" />
					</span>
				) : null }
				<input
					ref={ inputRef } // Assign the ref to the input element
					className="wawl-h-10 wawl-w-10 wawl-bg-gray-400"
					type="color"
					id={ id }
					name={ name }
					value={ value }
					onChange={ onChange }
					onClick={ () => setShowIcon( false ) }
					onFocus={ () => setShowIcon( false ) }
				/>
			</div>
		</>
	);
}
