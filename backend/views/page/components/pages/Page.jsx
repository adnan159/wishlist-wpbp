export default function Page( { classes = '', children } ) {
	return (
		<div
			className={ [
				'sm:wawl-grid sm:wawl-grid-cols-12 sm:wawl-gap-4',
				classes,
			].join( ' ' ) }
		>
			{ children }
		</div>
	);
}
