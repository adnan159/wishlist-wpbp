export default function Input( {
	type = 'text',
	name = '',
	value = '',
	placeholder = '',
	classes = '',
	size = 'wawl-h-12 wawl-w-72',
	required = false,
	onChange,
} ) {
	return (
		<div className="">
			<input
				className={ [
					'wawl-block wawl-rounded-md wawl-border-0 wawl-py-1.5 !wawl-px-4 wawl-text-gray-900 wawl-ring-1 wawl-ring-inset placeholder:!wawl-text-gray-400 focus:!wawl-ring-1 focus:!wawl-ring-inset focus:!wawl-ring-gray-200 focus:!wawl-border-none sm:wawl-text-sm sm:wawl-leading-6 wawl-shadow-lg',
					classes,
					size,
				].join( ' ' ) }
				type={ type }
				name={ name }
				id={ name }
				value={ value || '' }
				required={ required }
				placeholder={ placeholder }
				onChange={ onChange }
			/>
		</div>
	);
}
