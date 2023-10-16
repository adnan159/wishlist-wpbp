import { useState } from 'react';
import { HiMagnifyingGlass } from 'react-icons/hi2';

export default function Search( {
	label = '',
	errorMessage = '',
	type = 'text',
	name = '',
	value = '',
	placeholder = '',
	defaultValue = '',
	classes = '',
	size = 'wm-h-11 wm-w-72',
	required = false,
	onChange = null,
	onBlur = null,
	onFocus = null,
	dataId = null,
	dataIndex = null,
} ) {
	const [ isFocused, setIsFocused ] = useState( false );

	const handleFocus = ( e ) => {
		setIsFocused( true );
		if ( onFocus ) onFocus( e );
	};

	const handleBlur = ( e ) => {
		setIsFocused( false );
		if ( onBlur ) onBlur( e );
	};

	return (
		<div>
			<div className="wm-relative wm-rounded-md wm-shadow-sm">
				<input
					className={ [
						'wm-block wm-rounded-md wm-border-0 wm-py-1.5 !wm-px-4 wm-text-gray-900 wm-ring-1 wm-ring-inset placeholder:!wm-text-gray-400 focus:!wm-ring-1 focus:!wm-ring-inset focus:!wm-ring-gray-200 focus:!wm-border-none sm:wm-text-sm sm:wm-leading-6',
						classes,
						size,
					].join( ' ' ) }
					defaultValue={ defaultValue }
					aria-invalid="true"
					type={ type }
					name={ name }
					id={ name }
					data-id={ dataId }
					data-index={ dataIndex }
					required={ required }
					autoComplete="off"
					placeholder={ placeholder }
					onChange={ onChange }
					onFocus={ handleFocus }
					onBlur={ handleBlur }
				/>
				{ ! isFocused && (
					<div
						className={ `wm-pointer-events-none wm-absolute wm-inset-y-0 wm-right-0 wm-flex wm-items-center wm-pr-3` }
					>
						<HiMagnifyingGlass
							className="wm-h-5 wm-w-5 wm-text-gray-400"
							aria-hidden="true"
						/>
					</div>
				) }
			</div>

			{ errorMessage && (
				<p
					className="wm-mt-2 wm-text-sm wm-text-red-600"
					id="email-error"
				>
					{ errorMessage }
				</p>
			) }
		</div>
	);
}
