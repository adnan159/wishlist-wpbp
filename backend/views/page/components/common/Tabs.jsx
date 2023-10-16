// @ts-ignore
export default function Tabs( { active, onChange, children } ) {
	return (
		<>
			<div className="wm-bg-gray-100 wm-rounded-sm wm-mt-10 wm-mb-8">
				{ children.map( ( menu, index ) => (
					<a
						key={ index }
						onClick={ () => onChange( index ) }
						className={
							active === index
								? 'wm-bg-gradient-to-b wm-from-[#F6ADB7] wm-via-[#F6ADB7] wm-to-[#FBCCB3] wm-text-white hover:wm-text-gray-50 wm-py-3 wm-px-4 wm-rounded-sm wm-cursor-pointer wm-inline-block wm-items-center wm-w-32 wm-text-center wm-text-base'
								: 'wm-inline-block wm-items-center wm-justify-between  wm-cursor-pointer wm-w-32 wm-text-center    hover:wm-text-gray-600 wm-text-base'
						}
					>
						{ menu.props.title }
					</a>
				) ) }
			</div>
			<div className="">{ children[ active ] }</div>
		</>
	);
}
