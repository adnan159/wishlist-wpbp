// @ts-ignore
export default function Tabs( { active, onChange, children } ) {
	return (
		<>
			<div className="wawl-border waal-border-gray-200 wawl-py-7 wawl-px-4 wawl-justify-between wawl-rounded-lg wawl-mt-10 wawl-mb-8">
				{ children.map( ( menu, index ) => (
					<a
						key={ index }
						onClick={ () => onChange( index ) }
						className={
							active === index
								? ' wawl-bg-accent wawl-text-white hover:wawl-text-gray-50 wawl-py-3 wawl-px-4 wawl-rounded-md wawl-cursor-pointer'
								: ' wawl-mx-4 lg:wawl-mx-6  wawl-inline  wawl-cursor-pointer'
						}
						style={ {
							width: 100,
						} }
					>
						{ menu.props.title }
					</a>
				) ) }
			</div>
			<div className="">{ children[ active ] }</div>
		</>
	);
}
