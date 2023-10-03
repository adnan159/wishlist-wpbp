export default function Page( { classes = '', children, title = '' } ) {
	return (
		<div
			className={ [
				'sm:wawl-grid sm:wawl-grid-cols-12 sm:wawl-gap-4',
				classes,
			].join( ' ' ) }
		>
			<div className="wawl-col-span-12">
				<h2 className="wawl-text-[25px] wawl-font-semibold wawl-gray-800">
					{ title }
				</h2>
			</div>
			{ children }
		</div>
	);
}
