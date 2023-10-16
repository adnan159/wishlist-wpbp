import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectWishlist,
	updateWishlistSetting,
} from '../../../redux/reducers/wishlistSlice';
import { borderStyle, colorValue } from '../../../utility/data';
import IconImage from '../../common/IconImage';
import Input from '../../common/Input';
import InputColorPicker from '../../common/InputColorPicker';
import PopupBtnCustomStyle from '../../common/PopupBtnCustomStyle';
import ToggleButton from '../../common/ToggleButton';
import Page from '../../pages/Page';

export default function PopupSettingsLeft() {
	const [ selectedImages, setSelectedImages ] = useState( {} );
	const [ toggleValue, setToggleValue ] = useState( false );

	const globalSettings = useSelector( selectWishlist );
	const dispatch = useDispatch();

	const handleColorChange = ( e ) => {
		dispatch(
			updateWishlistSetting( {
				popup_button_color: {
					...globalSettings.popup_button_color,
					[ e.target.name ]: e.target.value,
				},
				popup_button_size: {
					...globalSettings.popup_button_size,
					[ e.target.name ]: e.target.value,
				},
			} )
		);
	};
	const handleInputChange = ( e ) => {
		const newValue = e.target.value;
		dispatch(
			updateWishlistSetting( {
				[ e.target.name ]: newValue,
			} )
		);
	};
	const handleToggle = ( value, settingName ) => {
		setToggleValue( value ); // Update the toggleValue with the new value
		dispatch(
			updateWishlistSetting( {
				[ settingName ]: value,
			} )
		);
	};

	const isIconImageEnabled = globalSettings.popup_feature_image_enable;
	const themeDefaultButtonStyle = globalSettings.theme_default_button_style;

	const globalWishlistSettingsItems = {
		popup_enable: {
			label: 'Enable/Disable',
			component: (
				<ToggleButton
					onToggle={ ( value ) =>
						handleToggle( value, 'popup_enable' )
					}
					isOn={ globalSettings.popup_enable }
				/>
			),
			info: '',
		},
		popup_title: {
			label: 'Popup Title',
			component: (
				<Input
					className={
						'ctx-block ctx-w-72 sm:ctx-w-[15.5rem] xl:ctx-w-72'
					}
					placeholder={ 'Choose a Wishlist' }
					name="popup_title"
					type={ 'text' }
					required={ true }
					value={ globalSettings.popup_title }
					onChange={ handleInputChange }
				/>
			),
			info: '',
		},
		popup_button_text: {
			label: 'Popup button text',
			component: (
				<>
					<Input
						className={
							'ctx-block ctx-w-72 sm:ctx-w-[15.5rem] xl:ctx-w-72'
						}
						placeholder={ 'Choose a Wishlist' }
						name="popup_button_text"
						type={ 'text' }
						required={ true }
						value={ globalSettings.popup_button_text }
						onChange={ handleInputChange }
					/>
				</>
			),
			info: '',
		},
		popup_feature_image_enable: {
			label: 'Use Product Featured Image For Pop Up',
			component: (
				<ToggleButton
					onToggle={ ( value ) =>
						handleToggle( value, 'popup_feature_image_enable' )
					}
					isOn={ globalSettings.popup_feature_image_enable }
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
					<ToggleButton
						onToggle={ ( value ) =>
							handleToggle( value, 'theme_default_button_style' )
						}
						isOn={ globalSettings.theme_default_button_style }
					/>
				</>
			),
			info: '',
		},
		...( themeDefaultButtonStyle && {
			popup_button_color: {
				label: 'Popup button color',
				component: (
					<InputColorPicker
						onChange={ handleColorChange }
						items={ colorValue }
						values={ globalSettings.popup_button_color }
					/>
				),
				info: '',
			},
			popup_button_size: {
				label: 'Popup button Size',
				component: (
					<PopupBtnCustomStyle
						onChange={ handleColorChange }
						items={ borderStyle }
						values={ globalSettings.popup_button_size }
					/>
				),
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
					className={
						'ctx-block ctx-w-72 sm:ctx-w-[15.5rem] xl:ctx-w-72'
					}
					placeholder={ 'Choose a Wishlist' }
					name="popup_notification_text"
					type={ 'text' }
					required={ true }
					value={ globalSettings.popup_notification_text }
					onChange={ handleInputChange }
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
					className={
						'ctx-block ctx-w-72 sm:ctx-w-[15.5rem] xl:ctx-w-72'
					}
					placeholder={ 'Choose a Wishlist' }
					name="popup_notification_button_text"
					type={ 'text' }
					required={ true }
					value={ globalSettings.popup_notification_button_text }
					onChange={ handleInputChange }
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
			<Page classes="wm-mt-14">
				<div className=" wm-col-span-12">
					<div className="wm-py-8 wm-px-16 wm-border wm-border-gray-200  wm-rounded-lg">
						{ Object.keys( globalWishlistSettingsItems ).map(
							( itemKey ) => (
								<div key={ itemKey }>
									{ globalWishlistSettingsItems[ itemKey ]
										.title && (
										<div className="wm-w-full">
											<h2 className="wm-text-xl wm-font-semibold wm-mt-20 -wm-mb-8">
												{
													globalWishlistSettingsItems[
														itemKey
													].title
												}
											</h2>
										</div>
									) }

									<div className="wm-flex wm-justify-between wm-my-8">
										<div className="wm-basis-2/5">
											<h3 className="wm-text-base wm-font-medium">
												{
													globalWishlistSettingsItems[
														itemKey
													].label
												}
											</h3>
											<p className="wm-mt-3 wm-text-gray-400 wm-text-xs">
												{
													globalWishlistSettingsItems[
														itemKey
													].info
												}
											</p>
										</div>
										<div className="wm-basis wm-basis-3/5 wm-flex wm-gap-8 wm-justify-start">
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
