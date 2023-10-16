function classNames( ...classes ) {
	return classes.filter( Boolean ).join( ' ' );
}

export default function Toggle( { onChange, active = true } ) {
	return (
		<div
			onClick={ onChange }
			className={ classNames(
				active ? 'wm-bg-accent' : 'wm-bg-gray-200',
				'wm-relative wm-inline-flex wm-h-8 wm-w-[65px] wm-flex-shrink-0 wm-cursor-pointer wm-rounded-full wm-border-2 wm-border-transparent wm-transition-colors wm-duration-200 wm-ease-in-out focus:wm-outline-none focus:wm-ring-0 focus:wm-ring-gray-200 focus:wm-ring-offset-0'
			) }
		>
			<span className="wm-sr-only">Use setting</span>
			<span
				aria-hidden="true"
				className={ classNames(
					active
						? 'wm-translate-x-9 wm-translate-y-0.5'
						: 'wm-translate-x-0.5 wm-translate-y-0.5',
					'wm-pointer-events-none wm-inline-block wm-h-6 wm-w-6 wm-transform wm-rounded-full wm-bg-white wm-shadow wm-ring-0 wm-transition wm-duration-200 wm-ease-in-out'
				) }
			/>
		</div>
	);
}
