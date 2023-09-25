import { useState } from 'react';
import IconImage from '../../common/IconImage';
import Input from '../../common/Input';
import InputColorPicker from '../../common/InputColorPicker';
import PopupBtnCustomStyle from '../../common/PopupBtnCustomStyle';
import Toggle from '../../common/Toggle';
import Page from '../../pages/Page';
export default function PopupSettingsLeft( {
	onColorChange,
	buttonBackgroundColor,
} ) {
	const [ buttonBackgroundColor, setButtonBackgroundColor ] =
		useState( '#ffffff' );

	const handleColorChange = ( name, value ) => {
		// Update the background color state based on the input name
		if ( name === 'bgColor' ) {
			setButtonBackgroundColor( value );
		}
		console.log( value );
	};

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
		enable_disable_popup: {
			label: 'Enable/Disable',
			component: <Toggle active={ true } />,
			info: '',
		},
		popup_title: {
			label: 'Popup Title',
			component: (
				<Input
					classNamees={
						'ctx-block ctx-w-72 sm:ctx-w-[15.5rem] xl:ctx-w-72'
					}
					placeholder={ 'Choose a Wishlist' }
					name={ 'popup_title' }
					type={ 'text' }
					id={ 'wishlist' }
					required={ true }
				/>
			),
			info: '',
		},
		popup_button_text: {
			label: 'Popup button text',
			component: (
				<>
					<Input
						classNamees={
							'ctx-block ctx-w-72 sm:ctx-w-[15.5rem] xl:ctx-w-72'
						}
						placeholder={ 'Add to Wishlist' }
						name={ 'popup_button_text' }
						type={ 'text' }
						id={ 'wishlist' }
						required={ true }
					/>
				</>
			),
			// options: [ 'Option 1', 'Option 2', 'Option 3' ],
			info: '',
		},
		popup_featured_image: {
			label: 'Use Product Featured Image For Pop Up',
			component: <Toggle active={ true } />,
			// options: [ 'Option 1', 'Option 2', 'Option 3' ],
			info: '',
		},
		icon_image: {
			label: 'Icon Image',
			component: <IconImage />,
		},
		default_button_style: {
			label: 'Theme Default Button Style',
			component: <Toggle />,
			// options: [ 'Option 1', 'Option 2', 'Option 3' ],
			info: '',
		},
		popup_button_color: {
			label: 'Popup button color',
			component: <InputColorPicker onColorChange={ handleColorChange } />,
			// options: [ 'Option 1', 'Option 2', 'Option 3' ],
			info: '',
		},
		popup_button_size: {
			label: 'Popup button Size',
			component: <PopupBtnCustomStyle />,
			// options: [ 'Option 1', 'Option 2', 'Option 3' ],
			info: '',
		},
		succesfully_added_wishlist: {
			title: 'After successfully added to wishlist popup',
		},
		title_text: {
			label: 'Title Text',
			component: (
				<Input
					classNames={ '' }
					size={ ' wawl-w-72 wawl-h-12' }
					placeholder={ 'Successfully added to wishlist' }
					name={ 'title_text' }
					type={ 'text' }
					id={ 'wishlist' }
					required={ true }
				/>
			),
			// options: [ 'Option 1', 'Option 2', 'Option 3' ],
			info: 'Enable wishlist icon on cart page beside delete button',
		},
		icon_image_after: {
			label: 'Icon Image',
			component: <IconImage />,
		},
		button_text: {
			label: 'Icon Image',
			component: (
				<Input
					classNames={ '' }
					size={ 'wawl-w-40 wawl-h-12' }
					placeholder={ 'View wishlist' }
					name={ 'button_text' }
					type={ 'text' }
					id={ 'wishlist' }
					required={ true }
				/>
			),
		},
	};

	const [ list, setList ] = useState( '' );

	const radioChangeHandler = ( e ) => {
		setList( e.target.value );
	};
	console.log( list );
	return (
		<>
			<Page classes="wawl-mt-14">
				<div className=" wawl-col-span-12">
					<div className="wawl-py-8 wawl-px-16 wawl-border wawl-border-gray-200  wawl-rounded-lg">
						{ Object.keys( globalWishlistSettingsItems ).map(
							( itemKey ) => (
								<div key={ itemKey }>
									{ globalWishlistSettingsItems[ itemKey ]
										.title && (
										<div className="wawl-w-full">
											<h2 className="wawl-text-xl wawl-font-semibold wawl-mt-20 -wawl-mb-8">
												{
													globalWishlistSettingsItems[
														itemKey
													].title
												}
											</h2>
										</div>
									) }

									<div className="wawl-flex wawl-justify-between wawl-my-8">
										<div className="wawl-basis-2/5">
											<h3 className="wawl-text-base wawl-font-medium">
												{
													globalWishlistSettingsItems[
														itemKey
													].label
												}
											</h3>
											<p className="wawl-mt-3 wawl-text-gray-400 wawl-text-xs">
												{
													globalWishlistSettingsItems[
														itemKey
													].info
												}
											</p>
										</div>
										<div className="wawl-basis wawl-basis-3/5 wawl-flex wawl-gap-8 wawl-justify-start">
											{
												globalWishlistSettingsItems[
													itemKey
												].component
											}
										</div>
									</div>
								</div>
							)
						) }
					</div>
				</div>
			</Page>
		</>
	);
}
