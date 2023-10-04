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
						handleToggle( value, 'cart_page_wishlist' )
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
						handleToggle( value, 'cart_page_wishlist' )
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
							handleToggle( value, 'cart_page_wishlist' )
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
