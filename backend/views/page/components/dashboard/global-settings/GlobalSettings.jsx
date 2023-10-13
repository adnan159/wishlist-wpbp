import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	getWishlistSettings,
	selectWishlist,
	updateWishlistSetting,
} from '../../../redux/reducers/wishlistSlice';
import Input from '../../common/Input';
import RadioButton from '../../common/RadioButton';
import SearchSelect from '../../common/SearchSelect';
import Select from '../../common/Select';
import ToggleButton from '../../common/ToggleButton';

import axios from 'axios';

export default function GlobalSettings() {
	const dispatch = useDispatch();
	const [ toggleValue, setToggleValue ] = useState( false );
	const [ selectedProducts, setSelectedProducts ] = useState( [] );
	const [ selectedCategory, setSelectedCacetory ] = useState( [] );

	const globalSettings = useSelector( selectWishlist );
	const [ enableWishlistFor, setEnableWishlistFor ] = useState(
		globalSettings.enable_wishlist_for
	);
	const url = ww_admin_view_object.base_rest_url + '/global-settings';

	useEffect( () => {
		const headers = {
			'Content-Type': 'application/json',
			'X-WP-Nonce': ww_admin_view_object.rest_nonce,
		};

		axios.get( url, { headers } ).then( ( response ) => {
			dispatch( getWishlistSettings( response.data.data ) );
		} );
	}, [] );

	const handleInputChange = ( e ) => {
		const newValue = e.target.value;
		dispatch(
			updateWishlistSetting( {
				[ e.target.name ]: newValue,
			} )
		);
	};

	const handleRadioChange = ( inputValue ) => {
		setEnableWishlistFor( inputValue );
		dispatch(
			updateWishlistSetting( {
				enable_wishlist_for: inputValue,
			} )
		);
	};

	// Callback function to handle the value from ToggleButton
	const handleToggle = ( value, settingName ) => {
		setToggleValue( value ); // Update the toggleValue with the new value
		dispatch(
			updateWishlistSetting( {
				[ settingName ]: value,
			} )
		);
	};

	const handleProductSelect = ( selectedValues ) => {
		setSelectedProducts( selectedValues );
		console.log( 'selectedValues', selectedValues );
		if ( globalSettings.exclude_type === 'product' ) {
			dispatch(
				updateWishlistSetting( {
					...globalSettings,
					exclude_products: selectedValues.map( ( option ) => ( {
						id: option.value,
						product_name: option.label,
					} ) ),
				} )
			);
		}
	};
	const handleCategorySelect = ( selectedValues ) => {
		setSelectedCacetory( selectedValues );
		console.log( 'selectedValues', selectedValues );
		if ( globalSettings.exclude_type === 'category' ) {
			dispatch(
				updateWishlistSetting( {
					...globalSettings,
					exclude_categories: selectedValues.map( ( option ) => ( {
						id: option.value,
						category_name: option.label,
					} ) ),
				} )
			);
		}
	};

	console.log( 'exclude_type', globalSettings.exclude_type );
	console.log( 'exclude_Products', globalSettings.exclude_products );
	const globalWishlistSettingsItems = {
		enable_wishlist_for: {
			label: 'Enable wishlist for',
			component: (
				<>
					<RadioButton
						id={ 'all_users' }
						name="option"
						value={ 'all_users' }
						label="All user"
						isChecked={
							globalSettings.enable_wishlist_for === 'all_users'
						}
						onChange={ handleRadioChange }
					/>
					<RadioButton
						id={ 'login_user' }
						name="option"
						value={ 'login_user' }
						label="Login user"
						isChecked={
							globalSettings.enable_wishlist_for === 'login_user'
						}
						onChange={ handleRadioChange }
					/>
				</>
			),
			info: '',
		},
		default_wishlist_name: {
			label: 'Default wishlist name',
			component: (
				<Input
					className={
						'ctx-block ctx-w-72 sm:ctx-w-[15.5rem] xl:ctx-w-72'
					}
					placeholder={ 'Choose a Wishlist' }
					name="default_wishlist_name"
					type={ 'text' }
					required={ true }
					value={ globalSettings.default_wishlist_name }
					onChange={ handleInputChange }
				/>
			),
			info: '',
		},
		exclude_type: {
			label: 'Exclude product/category',
			component: (
				<>
					<Select />
					{ globalSettings.exclude_type === 'product' ? (
						<SearchSelect
							onChange={ handleProductSelect }
							value={ selectedProducts }
						/>
					) : (
						<SearchSelect
							onChange={ handleCategorySelect }
							value={ selectedCategory }
						/>
					) }
				</>
			),
			info: '',
		},
		item_count: {
			label: 'Show status for each product',
			component: (
				<ToggleButton
					onToggle={ ( value ) =>
						handleToggle( value, 'item_count' )
					}
					isOn={ globalSettings.item_count }
				/>
			),
			info: 'How many times product was added to a wishlist',
		},
		guest_user_wishlist_days: {
			label: 'Guest user Wishlist will be deleted after',
			component: (
				<Input
					className={
						'ctx-block ctx-w-72 sm:ctx-w-[15.5rem] xl:ctx-w-72'
					}
					size={ 'wawl-w-40 wawl-h-12' }
					placeholder={ 'Enter Days' }
					name="guest_user_wishlist_days"
					type={ 'text' }
					id={ 'wishlist' }
					required={ true }
					value={ globalSettings.guest_user_wishlist_days }
					onChange={ handleInputChange }
				/>
			),
		},
		enable_for_variation: {
			label: 'Enable Wishlist for variations product',
			component: (
				<ToggleButton
					onToggle={ ( value ) =>
						handleToggle( value, 'enable_for_variation' )
					}
					isOn={ globalSettings.enable_for_variation }
				/>
			),
			info: '',
		},
		enable_for_myaccount: {
			label: 'Enable wishlist in my account',
			component: (
				<ToggleButton
					onToggle={ ( value ) =>
						handleToggle( value, 'enable_for_myaccount' )
					}
					isOn={ globalSettings.enable_for_myaccount }
				/>
			),
			info: '',
		},
		multi_wishlist_settings: {
			label: 'Multi wishlist settings',
			component: (
				<ToggleButton
					onToggle={ ( value ) =>
						handleToggle( value, 'multi_wishlist_settings' )
					}
					isOn={ globalSettings.multi_wishlist_settings }
				/>
			),
			info: '',
		},
		cart_page_wishlist: {
			label: 'Cart page wishlist',
			component: (
				<ToggleButton
					onToggle={ ( value ) =>
						handleToggle( value, 'cart_page_wishlist' )
					}
					isOn={ globalSettings.cart_page_wishlist }
				/>
			),
			info: 'Enable wishlist icon on cart page beside delete button',
		},
	};

	const [ list, setList ] = useState( '' );

	const radioChangeHandler = ( e ) => {
		setList( e.target.value );
	};
	console.log( list );
	return (
		<div className="wawl-mt-8 wawl-py-8 wawl-px-16 wawl-border wawl-border-gray-200 wawl-shadow-lg wawl-rounded-lg">
			<div className=" wawl-pb-6 ">
				<h2 className="wawl-text-[25px] wawl-font-semibold ctx-gray-800">
					Global Settings
				</h2>
			</div>
			{ Object.keys( globalWishlistSettingsItems ).map( ( itemKey ) => (
				<div key={ itemKey }>
					<div className="wawl-flex wawl-flex-row wawl-justify-start wawl-mt-12">
						<div className="wawl-basis-1/4">
							<h3 className="wawl-text-base wawl-font-medium">
								{ globalWishlistSettingsItems[ itemKey ].label }
							</h3>
							<p className="wawl-mt-3 wawl-text-gray-400 wawl-text-xs">
								{ globalWishlistSettingsItems[ itemKey ].info }
							</p>
						</div>
						<div className="wawl-basis-3/4 wawl-flex wawl-gap-8 wawl-justify-start">
							{ globalWishlistSettingsItems[ itemKey ].component }
						</div>
					</div>
				</div>
			) ) }

			{ /* { globalSettings.map( ( item, index ) => (
				<div
					className="wawl-flex wawl-flex-row wawl-justify-start  wawl-mt-12 "
					key={ index }
				>
					<div className=" wawl-basis-1/4">
						<h3 className="wawl-text-base wawl-font-medium">
							{ item.label }
						</h3>
					</div>
					<div className="  wawl-basis-3/4 wawl-flex wawl-gap-8 wawl-justify-start ">
						{ item.type.includes( 'radio' ) && (
							<RadioButton
								items={ globalSettingsRadio }
								{ ...item }
							/>
						) }
						{ item.type.includes( 'input' ) && (
							<Input
								type="text"
								name="wishlist"
								id="wishlist"
								required={ true }
								placeholder="Wishlist"
								{ ...item }
							/>
						) }
						{ item.type.includes( 'toggle' ) && (
							<Toggle { ...item } />
						) }
						{ item.type.includes( 'select' ) && (
							<Select { ...item } />
						) }
						{ item.type.includes( 'search' ) && (
							<Search
								type="search"
								name="search"
								classes="sm:ctx-w-full"
								placeholder="Search"
								{ ...item }
							/>
						) }
					</div>
				</div>
			) ) } */ }
		</div>
	);
}
