export default function Input( {
	type = 'text',
	name = '',
	value = '',
	placeholder = '',
	classes = '',
	size = 'wm-h-11 wm-w-72',
	required = false,
	onChange,
} ) {
	return (
		<div className="">
			<input
				className={ [
					'wm-block wm-rounded-md wm-border-0 wm-py-1.5 !wm-px-4 wm-text-gray-900 wm-ring-1 wm-ring-inset placeholder:!wm-text-gray-400 focus:!wm-ring-1 focus:!wm-ring-inset focus:!wm-ring-gray-200 focus:!wm-border-none sm:wm-text-sm sm:wm-leading-6 wm-shadow-lg',
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
