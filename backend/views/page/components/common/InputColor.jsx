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
					<HiMiniEyeDropper className="wm-text-gray-400" />
				</span>
			) : null }
			<input
				ref={ inputRef }
				className="wm-h-10 wm-w-10 wm-bg-gray-400"
				type="color"
				name={ name }
				value={ value || `#ffffff` }
				onChange={ onChange }
			/>
		</div>
	);
}
