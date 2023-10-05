import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectWishlist } from '../../../redux/reducers/wishlistSlice';
import Button from '../../common/Button';
import Select from '../../common/Select';
import Page from '../../pages/Page';

export default function Preview( { onColorChange } ) {
	const wishlistSettings = useSelector( selectWishlist );
	const [ buttonStyle, setButtonStyle ] = useState( wishlistSettings );

	useEffect( () => {
		setButtonStyle( wishlistSettings );
	}, [ wishlistSettings, buttonStyle ] );
	const [ isHovered, setIsHovered ] = useState( false );

	const handleMouseEnter = () => {
		setIsHovered( true );
	};

	const handleMouseLeave = () => {
		setIsHovered( false );
	};
	return (
		<>
			<Page classes="">
				<div className=" wawl-col-span-12 ">
					<div className=" wawl-pb-8 ">
						<h2 className="wawl-text-base wawl-font-semibold ctx-gray-800">
							Preview
						</h2>
					</div>

					<div className="wawl-py-8 wawl-px-8 wawl-border wawl-border-gray-200  wawl-rounded-lg wawl-mx-auto">
						<div className=" wawl-mx-auto wawl-bg-white wawl-border-4 wawl-text-center wawl-py-6">
							<div className="wawl-border wawl-border-gray-300 wawl-w-36 wawl-py-2 wawl-mb-3 wawl-px-4 wawl-block wawl-mx-auto">								{ buttonStyle.popup_icon_image === '' ? (
									<img
										className="wawl-mx-auto"
										src="data:image/png;base64,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"
									/>
								) : (
									<img
										className="wawl-mx-auto"
										src={ buttonStyle.popup_icon_image }
									/>
								) }
							</div>
							<span className=" wawl-text-base">
								Chose a wishlist
							</span>
							<div className="wawl-my-4 wawl-px-6 ">
								<Select
									classes=""
									size="wawl-h-12 wawl-w-full wawl-my-6"
								/>
								<Button
									onClick={ () => {
										window.open();
									} }
									style={ {
										backgroundColor: isHovered
											? buttonStyle.popup_button_color
													.background_hover_color ||
											  ''
											: buttonStyle.popup_button_color
													.background_color || '',
										borderColor: isHovered
											? buttonStyle.popup_button_color
													.border_hover_color || ''
											: buttonStyle.popup_button_color
													.border_color || '',

										borderWidth: `${ buttonStyle.popup_button_size.border_width }px`,
										borderRadius: `${ buttonStyle.popup_button_size.border_radius }px`,
										borderHeight: `${ buttonStyle.popup_button_size.border_height }px`,
										margin: `${ buttonStyle.popup_button_size.popup_button_margin }px`,
									} }
									onMouseEnter={ handleMouseEnter }
									onMouseLeave={ handleMouseLeave }
									buttonStyle={ 'button-default' }
									iconPosition={ 'after' }
									addBgColor={ true }
									classNames={ 'wawl-w-full wawl-bg-default' }
									icon={ '' }
									// onColorChange={ handleColorChange }
								>
									{ 'Add to wishlist' }
								</Button>
							</div>
						</div>
					</div>
				</div>
			</Page>
		</>
	);
}
