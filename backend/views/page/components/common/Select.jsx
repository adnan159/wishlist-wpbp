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
	size = 'wawl-h-12 wawl-w-72',
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
					<div className="wawl-relative">
						<Listbox.Button
							className={ [
								'wawl-block wawl-rounded-md wawl-border-0 wawl-py-1.5 !wawl-px-4 wawl-text-gray-400 wawl-ring-0 wawl-ring-transparent   wawl-ring-inset placeholder:!wawl-text-gray-400 focus:!wawl-ring-0 focus:!wawl-ring-inset focus:!wawl-border-none sm:wawl-text-sm sm:wawl-leading-6 wawl-shadow-primary',
								classes,
								size,
							].join( ' ' ) }
						>
							<span className="wawl-inline-flex wawl-w-full wawl-truncate">
								<span className="wawl-truncate">
									{ excludeType }
								</span>
							</span>

							<span className="wawl-pointer-events-none wawl-absolute wawl-inset-y-0 wawl-right-0 wawl-flex wawl-items-center wawl-pr-2">
								<HiChevronDown
									className="wawl-h-5 wawl-w-5 wawl-text-gray-400"
									aria-hidden="true"
								/>
							</span>
						</Listbox.Button>

						<Transition
							show={ open }
							as={ Fragment }
							leave="wawl-transition wawl-ease-in wawl-duration-100"
							leaveFrom="wawl-opacity-100"
							leaveTo="wawl-opacity-0"
						>
							<Listbox.Options className="wawl-absolute wawl-z-10 wawl-mt-1 wawl-max-h-60 wawl-w-full wawl-overflow-auto wawl-rounded-md wawl-bg-white wawl-py-1 wawl-text-base wawl-drop-shadow-md wawl-ring-1 wawl-ring-transparent wawl-ring-opacity-5 focus:wawl-outline-none sm:wawl-text-sm">
								{ product.map( ( person ) => (
									<Listbox.Option
										key={ person.type }
										className={ ( { active } ) =>
											classNames(
												active
													? 'wawl-bg-accent wawl-text-white'
													: 'wawl-text-gray-900',
												'wawl-relative wawl-cursor-default wawl-select-none wawl-py-2 wawl-pl-3 wawl-pr-9'
											)
										}
										value={ person.type }
									>
										{ ( { selected, active } ) => (
											<>
												<div className="wawl-flex">
													<span
														className={ classNames(
															selected
																? 'wawl-font-semibold'
																: 'wawl-font-normal',
															'wawl-truncate'
														) }
													>
														{ person.type }
													</span>
												</div>

												{ selected ? (
													<span
														className={ classNames(
															active
																? 'wawl-text-white'
																: 'wawl-text-accent',
															'wawl-absolute wawl-inset-y-0 wawl-right-0 wawl-flex wawl-items-center wawl-pr-4'
														) }
													>
														<HiCheck
															className="wawl-h-5 wawl-w-5"
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
