export default function ToggleButton( { onToggle, isOn } ) {
	return (
		<div>
			<button
				onClick={ () => onToggle( ! isOn ) } // Toggle the value and call the callback
				className={ `${
					isOn
						? 'wawl-ring-2 wawl-ring-accent focus:wawl-ring-accent'
						: 'wawl-ring-2 wawl-ring-gray-200 focus:wawl-ring-gray-200 wawl-transition-colors wawl-duration-200 wawl-ease-in-out focus:wawl-outline-none'
				} ${ isOn ? 'wawl-justify-end' : 'wawl-justify-start' } ${
					isOn ? 'wawl-bg-accent' : 'wawl-bg-gray-200'
				} wawl-w-[50px]  wawl-h-6 wawl-p-0 wawl-m-auto  wawl-rounded-full wawl-flex wawl-transition wawl-duration-500 wawl-shadow-2xl` }
			>
				<span
					className={ `wawl-bg-white wawl-transition wawl-duration-500 wawl-rounded-full wawl-w-1/2 wawl-h-full wawl-m-0 wawl-p-0 wawl-shadow-xl` }
				></span>
			</button>
		</div>
	);
}
