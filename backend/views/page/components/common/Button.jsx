export default function Button( {
	children = '',
	onClick,
	icon,
	buttonStyle = 'buttonPrimary', // Default style is 'buttonPrimary'
	classNames = [], // Change from string to an array
	iconPosition = 'after',
	style = {},
	addBgColor = true,
	type = 'button',
	disabled = false,
	onMouseLeave,
	onMouseEnter,
} ) {
	const buttons = {
		buttonPrimary:
			'wm-px-5 wm-py-3 wm-text-sm wm-rounded-[0.1375rem] wm-leading-4 ',

		buttonDefault:
			'wm-rounded-md wm-px-4 wm-w-full wm-py-2 wm-text-sm wm-text-red-500 ',
	};

	const getClassNames = ( style ) => {
		let classNamesArr = [
			'wm-items-center wm-border wm-border-accent wm-shadow-sm wm-font-medium focus:wm-outline-accent ',
		];

		if ( buttons[ style ] ) {
			classNamesArr.push( buttons[ style ] );
		} else {
			classNamesArr.push( buttons[ 'buttonPrimary' ] );
		}

		// Add background color and additional classNames if required
		if ( addBgColor && style !== 'buttonPrimary' ) {
			classNamesArr.push(
				'wm-bg-accent wm-text-white hover:wm-opacity-95 '
			);
		}

		// Add custom class names to the array
		classNamesArr.push( ...classNames );

		return classNamesArr.join( '' );
	};

	return (
		<button
			className={ getClassNames( buttonStyle ) } // Call getClassNames with buttonStyle
			onClick={ onClick }
			type={ type }
			style={ style }
			disabled={ disabled }
			onMouseLeave={ onMouseLeave }
			onMouseEnter={ onMouseEnter }
		>
			{ iconPosition === 'after' ? (
				<>
					{ children + ' ' } { icon }
				</>
			) : (
				<>
					{ ' ' }
					{ icon } { ' ' + children }{ ' ' }
				</>
			) }
		</button>
	);
}
