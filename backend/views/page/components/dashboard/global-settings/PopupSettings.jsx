import { useState } from 'react';
import { DataProvider } from '../../DataContext';
import DisclosureWList from '../../common/DisclosureWList';
import Input from '../../common/Input';
import RadioButton from '../../common/RadioButton';
import Search from '../../common/Search';
import Select from '../../common/Select';
import Toggle from '../../common/Toggle';
import Page from '../../pages/Page';
import PageLeft from '../../pages/PageLeft';
import PageRight from '../../pages/PageRight';
import PopupSettingsLeft from './PopupSettingsLeft';
import Preview from './Preview';

export default function PopupSettings() {
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
					classNamees={
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
						classNamees="sm:ctx-w-full"
						placeholder={ 'Search' }
					/>
				</>
			),
			// options: [ 'Option 1', 'Option 2', 'Option 3' ],
			info: '',
		},
		show_status: {
			label: 'Show status for each product',
			component: <Toggle active={ false } />,
			// options: [ 'Option 1', 'Option 2', 'Option 3' ],
			info: 'How many times product was added to a wishlist',
		},
		guest_user: {
			label: 'Guest user Wishlist will be deleted after',
			component: (
				<Input
					classNamees={ '' }
					size={ 'wawl-w-40 wawl-h-12' }
					placeholder={ 'Enter Days' }
					name={ 'enable_wishlist_variations_product' }
					type={ 'text' }
					id={ 'wishlist' }
					required={ true }
				/>
			),
		},
		enable_wishlist_variations_product: {
			label: 'Enable Wishlist for variations product',
			component: <Toggle />,
			// options: [ 'Option 1', 'Option 2', 'Option 3' ],
			info: '',
		},
		enable_wishlist_my_account: {
			label: 'Enable wishlist in my account',
			component: <Toggle />,
			// options: [ 'Option 1', 'Option 2', 'Option 3' ],
			info: '',
		},
		multi_wishlist_settings: {
			label: 'Multi wishlist settings',
			component: <Toggle />,
			// options: [ 'Option 1', 'Option 2', 'Option 3' ],
			info: '',
		},
		cart_page_wishlist: {
			label: 'Cart page wishlist',
			component: <Toggle />,
			// options: [ 'Option 1', 'Option 2', 'Option 3' ],
			info: 'Enable wishlist icon on cart page beside delete button',
		},
	};

	const [ list, setList ] = useState( '' );

	const radioChangeHandler = ( e ) => {
		setList( e.target.value );
	};
	console.log( list );
	const [ buttonBackgroundColor, setButtonBackgroundColor ] = useState( '' );

	const handleColorChange = ( name, value ) => {
		// Update the background color state based on the input name
		if ( name === 'bgColor' ) {
			setButtonBackgroundColor( value );
		}
		console.log( value );
	};
	console.log( 'first color', buttonBackgroundColor );
	return (
		<>
			<Page classes="wawl-mt-8 wawl-py-8 wawl-px-16 wawl-border wawl-border-gray-200 wawl-shadow-lg wawl-rounded-lg">
				<div className=" wawl-col-span-12">
					<DisclosureWList
						title={ 'Popup Settings' }
						children={
							<>
								<Page>
									<DataProvider>
										<PageLeft>
											<PopupSettingsLeft
												onColorChange={
													handleColorChange
												}
											/>
										</PageLeft>
										<PageRight>
											<Preview
												buttonBackgroundColor={
													buttonBackgroundColor
												}
											/>
										</PageRight>
									</DataProvider>
								</Page>
							</>
						}
					/>
				</div>
			</Page>
		</>
	);
}
