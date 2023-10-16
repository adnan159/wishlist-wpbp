/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [ './backend/views/page/**/*.{js,jsx,ts,tsx}' ],
	prefix: 'wm-',
	theme: {
		customForms: ( theme ) => ( {
			default: {
				'input, textarea, multiselect, select': {
					borderRadius: theme( 'borderRadius.none' ),
					borderColor: theme( 'colors.gray.400' ),
					borderWidth: theme( 'width.px' ),
					fontSize: theme( 'fontSize.sm' ),
					boxShadow: theme( 'boxShadow.md' ),
					paddingTop: theme( 'padding.3' ),
					paddingBottom: theme( 'padding.3' ),
				},
			},
			checkbox: {
				borderColor: theme( 'colors.gray.500' ), //<- will work
				textColor: theme( 'colors.indigo.500' ), //<-wont change the selected state
				//bg color of the check or radio
				height: theme( 'height.5' ),
				width: theme( 'width.5' ),
				boxShadow: theme( 'boxShadow.md' ),
			},
			radio: {
				borderColor: theme( 'colors.gray.500' ),
				boxShadow: theme( 'boxShadow.md' ),
				height: theme( 'height.5' ),
				width: theme( 'width.5' ),
				icon: '<svg fill="#fff" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="4.5"/></svg>',
			},
		} ),
		extend: {
			colors: {
				primary: '#2C2C2C',
				accent: '#03D6B3',
				default: '#4B6F23',
			},
			boxShadow: {
				primary: '0px 1px 4px rgba(0, 0, 0, 0.16) !important',
			},
		},
	},
	plugins: [],
};
