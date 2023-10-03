import { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { selectWishlist, getWishlistSettings } from '../../../redux/reducers/wishlistSlice';
import Input from '../../common/Input';
import RadioButton from '../../common/RadioButton';
import Search from '../../common/Search';
import Select from '../../common/Select';
import Toggle from '../../common/Toggle';

import axios from 'axios';

export default function GlobalSettings() {
	const wishlistSettings = useSelector( selectWishlist );

	const url = ww_admin_view_object.base_rest_url + "/global-settings";

	const dispatch = useDispatch();

	useEffect(() => {

		const headers = {
			'Content-Type': 'application/json',
			'X-WP-Nonce': ww_admin_view_object.rest_nonce
		};

		axios.get(url, { headers } )
			.then(response => {
				dispatch(getWishlistSettings(response.data.data));
			})
	}, []);




	const globalSettingsRadio = [
		{
			id: '1',
			title: 'All Users',
			value: 'allUsers',
			caurrent: true,
		},
		{
			id: '2',
			title: 'Login user',
			value: 'loginUser',
			current: false,
		},
	];
	const globalWishlistSettingsItems = {
		enable_wishlist: {
			label: 'Enable wishlist for',
			component: <RadioButton items={ globalSettingsRadio } />,
			info: '',
		},
		default_wishlist: {
			label: 'Default wishlist name',
			component: (
				<Input
					classes={
						'ctx-block ctx-w-72 sm:ctx-w-[15.5rem] xl:ctx-w-72'
					}
					placeholder={ 'Wishlist' }
					name={ 'default_wishlist' }
					type={ 'text' }
					id={ 'wishlist' }
					required={ true }
				/>
			),
			info: '',
		},
		exclude_category_product: {
			label: 'Exclude product/category',
			component: (
				<>
					<Select />
					<Search
						type={ 'search' }
						name={ 'exclude_category_product' }
						classes="sm:ctx-w-full"
						placeholder={ 'Search' }
					/>
				</>
			),
			// options: [ 'Option 1', 'Option 2', 'Option 3' ],
			info: '',
		},
		item_count: {
			label: 'Show status for each product',
			component: (
				<Toggle
					active={ wishlistSettings.item_count }
					settingName="item_count"
				/>
			),
			// options: [ 'Option 1', 'Option 2', 'Option 3' ],
			info: 'How many times product was added to a wishlist',
		},
		guest_user: {
			label: 'Guest user Wishlist will be deleted after',
			component: (
				<Input
					classes={ '' }
					size={ 'wawl-w-40 wawl-h-12' }
					placeholder={ 'Enter Days' }
					name={ 'enable_wishlist_variations_product' }
					type={ 'text' }
					id={ 'wishlist' }
					required={ true }
				/>
			),
		},
		enable_for_variation: {
			label: 'Enable Wishlist for variations product',
			component: (
				<Toggle
					active={ wishlistSettings.enable_for_variation }
					settingName="enable_for_variation"
				/>
			),
			// options: [ 'Option 1', 'Option 2', 'Option 3' ],
			info: '',
		},
		enable_for_myaccount: {
			label: 'Enable wishlist in my account',
			component: (
				<Toggle
					active={ wishlistSettings.enable_for_myaccount }
					settingName="enable_for_myaccount"
				/>
			),
			// options: [ 'Option 1', 'Option 2', 'Option 3' ],
			info: '',
		},
		multi_wishlist_settings: {
			label: 'Multi wishlist settings',
			component: (
				<Toggle
					active={ wishlistSettings.multi_wishlist_settings }
					settingName="multi_wishlist_settings"
				/>
			),
			// options: [ 'Option 1', 'Option 2', 'Option 3' ],
			info: '',
		},
		cart_page_wishlist: {
			label: 'Cart page wishlist',
			component: (
				<Toggle
					active={ wishlistSettings.cart_page_wishlist }
					settingName="cart_page_wishlist"
				/>
			),
			// options: [ 'Option 1', 'Option 2', 'Option 3' ],
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
