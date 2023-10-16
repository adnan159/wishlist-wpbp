import { Listbox, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { HiCheck, HiChevronDown } from 'react-icons/hi2';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectWishlist,
	updateWishlistSetting,
} from '../../redux/reducers/wishlistSlice';

const product = [ { type: 'product' }, { type: 'category' } ];

function classNames( ...classes ) {
	return classes.filter( Boolean ).join( ' ' );
}

export default function Select( {
	label = '',
	classes = '',
	size = 'wm-h-11 wm-w-72',
} ) {
	const wishlistState = useSelector( selectWishlist );
	const dispatch = useDispatch();

	const excludeType = wishlistState.exclude_type || null;
	console.log( 'first selected wishlist', excludeType );
	const handleSelect = ( newSelected ) => {
		dispatch(
			updateWishlistSetting( {
				...wishlistState,
				exclude_type: newSelected,
			} )
		);
	};

	return (
		<Listbox value={ excludeType } onChange={ handleSelect }>
			{ ( { open } ) => (
				<>
					<div className="wm-relative">
						<Listbox.Button
							className={ [
								'wm-block wm-rounded-md wm-border-0 wm-py-1.5 !wm-px-4 wm-text-gray-400 wm-ring-0 wm-ring-transparent   wm-ring-inset placeholder:!wm-text-gray-400 focus:!wm-ring-0 focus:!wm-ring-inset focus:!wm-border-none sm:wm-text-sm sm:wm-leading-6 wm-shadow-primary',
								classes,
								size,
							].join( ' ' ) }
						>
							<span className="wm-inline-flex wm-w-full wm-truncate">
								<span className="wm-truncate">
									{ excludeType }
								</span>
							</span>

							<span className="wm-pointer-events-none wm-absolute wm-inset-y-0 wm-right-0 wm-flex wm-items-center wm-pr-2">
								<HiChevronDown
									className="wm-h-5 wm-w-5 wm-text-gray-400"
									aria-hidden="true"
								/>
							</span>
						</Listbox.Button>

						<Transition
							show={ open }
							as={ Fragment }
							leave="wm-transition wm-ease-in wm-duration-100"
							leaveFrom="wm-opacity-100"
							leaveTo="wm-opacity-0"
						>
							<Listbox.Options className="wm-absolute wm-z-10 wm-mt-1 wm-max-h-60 wm-w-full wm-overflow-auto wm-rounded-md wm-bg-white wm-py-1 wm-text-base wm-drop-shadow-md wm-ring-1 wm-ring-transparent wm-ring-opacity-5 focus:wm-outline-none sm:wm-text-sm">
								{ product.map( ( person ) => (
									<Listbox.Option
										key={ person.type }
										className={ ( { active } ) =>
											classNames(
												active
													? 'wm-bg-accent wm-text-white'
													: 'wm-text-gray-900',
												'wm-relative wm-cursor-default wm-select-none wm-py-2 wm-pl-3 wm-pr-9'
											)
										}
										value={ person.type }
									>
										{ ( { selected, active } ) => (
											<>
												<div className="wm-flex">
													<span
														className={ classNames(
															selected
																? 'wm-font-semibold'
																: 'wm-font-normal',
															'wm-truncate'
														) }
													>
														{ person.type }
													</span>
												</div>

												{ selected ? (
													<span
														className={ classNames(
															active
																? 'wm-text-white'
																: 'wm-text-accent',
															'wm-absolute wm-inset-y-0 wm-right-0 wm-flex wm-items-center wm-pr-4'
														) }
													>
														<HiCheck
															className="wm-h-5 wm-w-5"
															aria-hidden="true"
														/>
													</span>
												) : null }
											</>
										) }
									</Listbox.Option>
								) ) }
							</Listbox.Options>
						</Transition>
					</div>
				</>
			) }
		</Listbox>
	);
}
