import { useRef } from 'react';
import { HiMiniEyeDropper } from 'react-icons/hi2';

export default function InputColor( { name, value, onChange } ) {
	const inputRef = useRef();

	const handleToggleIcon = () => {
		if ( inputRef.current ) {
			inputRef.current.click();
		}
	};

	return (
		<div className="color-input-container">
			{ ! value ? (
				<span className="pen-icon" onClick={ handleToggleIcon }>
					<HiMiniEyeDropper className="wawl-text-gray-400" />
				</span>
			) : null }
			<input
				ref={ inputRef }
				className="wawl-h-10 wawl-w-10 wawl-bg-gray-400"
				type="color"
				name={ name }
				value={ value || `#ffffff` }
				onChange={ onChange }
			/>
		</div>
	);
}
