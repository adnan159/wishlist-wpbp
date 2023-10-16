export default function ToggleButton( { onToggle, isOn } ) {
	return (
		<div>
			<button
				onClick={ () => onToggle( ! isOn ) } // Toggle the value and call the callback
				className={ `${
					isOn
						? 'wm-ring-2 wm-ring-accent focus:wm-ring-accent'
						: 'wm-ring-2 wm-ring-gray-200 focus:wm-ring-gray-200 wm-transition-colors wm-duration-200 wm-ease-in-out focus:wm-outline-none'
				} ${ isOn ? 'wm-justify-end' : 'wm-justify-start' } ${
					isOn ? 'wm-bg-accent' : 'wm-bg-gray-200'
				} wm-w-[50px]  wm-h-6 wm-p-0 wm-m-auto  wm-rounded-full wm-flex wm-transition wm-duration-500 wm-shadow-2xl` }
			>
				<span
					className={ `wm-bg-white wm-transition wm-duration-500 wm-rounded-full wm-w-1/2 wm-h-full wm-m-0 wm-p-0 wm-shadow-xl` }
				></span>
			</button>
		</div>
	);
}
