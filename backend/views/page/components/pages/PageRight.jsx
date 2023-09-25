export default function PageRight( { classes = '', children } ) {
	return (
		<div className={ [ 'sm:wawl-col-span-3', classes ].join( ' ' ) }>
			{ children }
		</div>
	);
}
