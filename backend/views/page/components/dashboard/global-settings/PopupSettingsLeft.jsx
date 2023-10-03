import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectWishlist } from '../../../redux/reducers/wishlistSlice';
import IconImage from '../../common/IconImage';
import Input from '../../common/Input';
import InputColorPicker from '../../common/InputColorPicker';
import PopupBtnCustomStyle from '../../common/PopupBtnCustomStyle';
import Toggle from '../../common/Toggle';
import Page from '../../pages/Page';

export default function PopupSettingsLeft() {
	const [ selectedImages, setSelectedImages ] = useState( {} );
	const wishlistSettings = useSelector( selectWishlist );

	const handleImageChange = ( selected ) => {
		// Handle image change logic here
	};

	const isIconImageEnabled = wishlistSettings.popup_feature_image_enable;
	const themeDefaultButtonStyle = wishlistSettings.theme_default_button_style;

	const globalWishlistSettingsItems = {
		popup_enable: {
			label: 'Enable/Disable',
			component: (
				<Toggle
					active={ wishlistSettings.settingName }
					settingName="popup_enable"
				/>
			),
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
					name="popup_title"
					type={ 'text' }
					id={ 'wishlist' }
					required={ true }
					value={ wishlistSettings.name }
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
						name="popup_button_text"
						type={ 'text' }
						id={ 'wishlist' }
						required={ true }
						value={ wishlistSettings.name }
					/>
				</>
			),
			info: '',
		},
		popup_feature_image_enable: {
			label: 'Use Product Featured Image For Pop Up',
			component: (
				<Toggle
					active={ wishlistSettings.settingName }
					settingName="popup_feature_image_enable"
				/>
			),
			info: '',
		},
		...( isIconImageEnabled && {
			popup_icon_image: {
				label: 'Icon Image',
				component: <IconImage iconName="popup_icon_image" />,
			},
		} ),
		theme_default_button_style: {
			label: 'Theme Default Button Style',
			component: (
				<>
					<Toggle
						active={ wishlistSettings.settingName }
						settingName="theme_default_button_style"
					/>
				</>
			),
			info: '',
		},
		...( themeDefaultButtonStyle && {
			popup_button_color: {
				label: 'Popup button color',
				component: <InputColorPicker />,
				info: '',
			},
			popup_button_size: {
				label: 'Popup button Size',
				component: <PopupBtnCustomStyle />,
				info: '',
			},
		} ),

		succesfully_added_wishlist: {
			title: 'After successfully added to wishlist popup',
		},
		popup_notification_text: {
			label: 'Title Text',
			component: (
				<Input
					classNames={ '' }
					size={ ' wawl-w-72 wawl-h-12' }
					placeholder={ 'Successfully added to wishlist' }
					name="popup_notification_text"
					type={ 'text' }
					id={ 'wishlist' }
					required={ true }
					value={ wishlistSettings.name }
				/>
			),
			info: 'Enable wishlist icon on the cart page beside the delete button',
		},
		popup_notification_icon: {
			label: 'Icon Image',
			component: <IconImage iconName="popup_notification_icon" />,
		},
		popup_notification_button_text: {
			label: 'Button text',
			component: (
				<Input
					classNames={ '' }
					size={ 'wawl-w-40 wawl-h-12' }
					placeholder={ 'View wishlist' }
					name="popup_notification_button_text"
					type={ 'text' }
					id={ 'wishlist' }
					required={ true }
					value={ wishlistSettings.name }
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
				{ /* <Button
          onClick={handleSaveClick}
          buttonStyle={'button-primary'}
          iconPosition={'after'}
          addBgColor={true}
          classNames={''}
          icon={''}
        >
          {'Save'}
        </Button> */ }
			</Page>
		</>
	);
}
