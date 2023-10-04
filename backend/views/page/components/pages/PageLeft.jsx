export default function PageLeft( { classes = '', children } ) {
	return (
		<div className={ [ 'sm:wawl-col-span-9', classes ].join( ' ' ) }>
			{ children }
		</div>
	);
}
