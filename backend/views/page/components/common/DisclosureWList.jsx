import { Disclosure } from '@headlessui/react';

export default function DisclosureWList( { title, children } ) {
	return (
		<div className="wawl-w-full">
			<div className="wawl-w-full wawl-max-w-full wawl-p-2 wawl-mx-auto wawl-bg-white wawl-rounded-2xl">
				<Disclosure>
					{ ( { open } ) => (
						<>
							<Disclosure.Button className="">
								<h2 className="wawl-text-[25px] wawl-font-semibold wawl-gray-800">
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
