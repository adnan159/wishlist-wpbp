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
			'wawl-px-5 wawl-py-3 wawl-text-sm wawl-rounded-[0.1375rem] wawl-leading-4 ',

		buttonDefault:
			'wawl-rounded-md wawl-px-4 wawl-w-full wawl-py-2 wawl-text-sm wawl-text-red-500 ',
	};

	const getClassNames = ( style ) => {
		let classNamesArr = [
			'wawl-items-center wawl-border wawl-border-accent wawl-shadow-sm wawl-font-medium focus:wawl-outline-accent ',
		];

		if ( buttons[ style ] ) {
			classNamesArr.push( buttons[ style ] );
		} else {
			classNamesArr.push( buttons[ 'buttonPrimary' ] );
		}

		// Add background color and additional classNames if required
		if ( addBgColor && style !== 'buttonPrimary' ) {
			classNamesArr.push(
				'wawl-bg-accent wawl-text-white hover:wawl-opacity-95 '
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
