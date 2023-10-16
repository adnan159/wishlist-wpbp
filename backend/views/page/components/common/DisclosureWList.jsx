import { Disclosure } from '@headlessui/react';

export default function DisclosureWList( { title, children } ) {
	return (
		<div className="wm-w-full">
			<div className="wm-w-full wm-max-w-full wm-p-2 wm-mx-auto wm-bg-white wm-rounded-2xl">
				<Disclosure>
					{ ( { open } ) => (
						<>
							<Disclosure.Button className="">
								<h2 className="wm-text-[25px] wm-font-semibold wm-gray-800">
									{ title }
								</h2>

								{ /* <ChevronUpIcon
									className={ `${
										open ? 'transform rotate-180' : ''
									} w-5 h-5 text-purple-500` }
								/> */ }
							</Disclosure.Button>
							<Disclosure.Panel className="">
								{ children }
							</Disclosure.Panel>
						</>
					) }
				</Disclosure>
			</div>
		</div>
	);
}
