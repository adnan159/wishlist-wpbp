import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectProductListing,
	updateProductListing,
} from '../../../redux/reducers/productListingSlice';
import {
	colorValue,
	iconStyles,
	listingButtonSize,
} from '../../../utility/data';
import IconStyle from '../../common/IconStyle';
import InputColorPicker from '../../common/InputColorPicker';
import PopupBtnCustomStyle from '../../common/PopupBtnCustomStyle';
import RadioButton from '../../common/RadioButton';
import Select from '../../common/Select';
import Toggle from '../../common/Toggle';
import Page from '../../pages/Page';

const globalSettingsRadio = [
	{
		id: '1',
		title: 'Icon',
		value: 'icon',
		caurrent: true,
	},
	{
		id: '2',
		title: 'Text',
		value: 'text',
		current: false,
	},
	{
		id: '2',
		title: 'Icon & Text',
		value: 'iconText',
		current: false,
	},
];

const iconStylesValue = [
	{
		label: 'Size',
		name: 'icon_size',
	},
	{
		label: 'Icon color',
		name: 'icon_color',
	},
	{
		label: 'Icon hover color',
		name: 'icon_hover_color',
	},
];

export default function ProductListingLeft() {
	const [ selectedImages, setSelectedImages ] = useState( {} );

	const productListing = useSelector( selectProductListing );
	const dispatch = useDispatch();

	const handleColorChange = ( e ) => {
		dispatch(
			updateProductListing( {
				listing_button_color: {
					...productListing.listing_button_color,
					[ e.target.name ]: e.target.value,
				},
				listing_button_size: {
					...productListing.listing_button_size,
					[ e.target.name ]: e.target.value,
				},
				listing_icon_style: {
					...productListing.listing_icon_style,
					[ e.target.name ]: e.target.value,
				},
			} )
		);
	};

	const productListingItems = {
		listing_settings_enable: {
			label: 'Enable/Disable',
			component: (
				<Toggle
					active={ productListing.settingName }
					settingName="listing_settings_enable"
				/>
			),
			info: '',
		},
		listing_button_position: {
			label: 'Button position on listing',
			component: <Select />,
			info: '',
		},
		listing_button_type: {
			label: 'Button Type',
			component: (
				<RadioButton
					items={ globalSettingsRadio }
					// onChange={ handleRadioButtonChange }
				/>
			),
			info: '',
		},
		listing_icon: {
			label: 'Choose Icon',
			component: <Select />,
			info: '',
		},
		listing_theme_default: {
			label: 'Theme Default',
			component: (
				<Toggle
					active={ productListing.settingName }
					settingName="listing_theme_default"
				/>
			),
			info: '',
		},
		listing_icon_style: {
			label: 'Icon style',
			component: (
				<IconStyle
					onChange={ handleColorChange }
					items={ iconStyles }
					values={ productListing.listing_icon_style }
				/>
			),
			info: '',
		},
		listing_button_color: {
			label: 'Button color',
			component: (
				<InputColorPicker
					onChange={ handleColorChange }
					items={ colorValue }
					values={ productListing.listing_button_color }
				/>
			),
			info: '',
		},
		listing_button_size: {
			label: 'Button size',
			component: (
				<PopupBtnCustomStyle
					onChange={ handleColorChange }
					items={ listingButtonSize }
					values={ productListing.listing_button_size }
				/>
			),
			info: '',
		},
	};

	const [ list, setList ] = useState( '' );

	const radioChangeHandler = ( e ) => {
		setList( e.target.value );
	};

	return (
		<>
			<Page classes="">
				<div className="wawl-col-span-12">
					<div className="wawl-py-8 wawl-px-6 wawl-border wawl-border-gray-200 wawl-rounded-lg">
						{ Object.keys( productListingItems ).map(
							( itemKey ) => (
								<div key={ itemKey }>
									{ productListingItems[ itemKey ].title && (
										<div className="wawl-w-full">
											<h2 className="wawl-text-xl wawl-font-semibold wawl-mt-20 -wawl-mb-8">
												{
													productListingItems[
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
													productListingItems[
														itemKey
													].label
												}
											</h3>
											<p className="wawl-mt-3 wawl-text-gray-400 wawl-text-xs">
												{
													productListingItems[
														itemKey
													].info
												}
											</p>
										</div>
										<div className="wawl-basis wawl-basis-3/5 wawl-flex wawl-gap-8 wawl-justify-start">
											{
												productListingItems[ itemKey ]
													.component
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
