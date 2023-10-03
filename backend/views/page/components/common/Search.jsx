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
	size = 'wawl-h-12 wawl-w-72',
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
			<div className="wawl-relative wawl-rounded-md wawl-shadow-sm">
				<input
					className={ [
						'wawl-block wawl-rounded-md wawl-border-0 wawl-py-1.5 !wawl-px-4 wawl-text-gray-900 wawl-ring-1 wawl-ring-inset placeholder:!wawl-text-gray-400 focus:!wawl-ring-1 focus:!wawl-ring-inset focus:!wawl-ring-gray-200 focus:!wawl-border-none sm:wawl-text-sm sm:wawl-leading-6',
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
						className={ `wawl-pointer-events-none wawl-absolute wawl-inset-y-0 wawl-right-0 wawl-flex wawl-items-center wawl-pr-3` }
					>
						<HiMagnifyingGlass
							className="wawl-h-5 wawl-w-5 wawl-text-gray-400"
							aria-hidden="true"
						/>
					</div>
				) }
			</div>

			{ errorMessage && (
				<p
					className="wawl-mt-2 wawl-text-sm wawl-text-red-600"
					id="email-error"
				>
					{ errorMessage }
				</p>
			) }
		</div>
	);
}
