import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Img from '../../../asset/img/image.png';
import { updateWishlistSetting } from '../../redux/reducers/wishlistSlice';
import Button from './Button';

export default function IconImage( { iconName } ) {
	const [ icons, setIcons ] = useState( {} );
	const dispatch = useDispatch();

	const onImageChange = ( event ) => {
		if ( event.target.files && event.target.files[ 0 ] ) {
			setIcons( URL.createObjectURL( event.target.files[ 0 ] ) );
		}
	};

	useEffect( () => {
		handleUpdateSettings();
	}, [ icons ] );

	const handleRemoveClick = () => {
		setIcons( [] );
	};

	const handleUpdateSettings = () => {
		dispatch(
			updateWishlistSetting( {
				[ iconName ]: icons,
			} )
		);
		setIcons( icons );
	};

	return (
		<div>
			<div className="wawl-flex wawl-mx-auto wawl-items-center">
				<div className=" wawl-border wawl-border-gray-300 wawl-h-full wawl-rounded-md wawl-block wawl-mx-auto">
					{ icons.length > 0 ? (
						<div>
							<img
								className="wawl-mx-auto wawl-object-fit wawl-h-32 wawl-w-32 wawl-px-4 wawl-py-2 "
								src={ icons }
								alt={ '' }
							/>
						</div>
					) : (
						<img
							className="wawl-mx-auto wawl-object-cover wawl-h-32 wawl-w-auto"
							src={ Img }
							alt="Default"
						/>
					) }
				</div>
				<div className="wawl-pl-4 wawl-grid wawl-gap-4">
					{ icons.length === 1 ? (
						<Button
							onClick={ () => {
								console.log( icons );
							} }
							buttonStyle="button-primary"
							iconPosition="after"
							addBgColor={ false }
							style={ {
								backgroundColor: 'color',
							} }
							classNames="!wawl-border-gray-300 wawl-text-gray-400"
							icon=""
						>
							Add Image
						</Button>
					) : (
						<label className="wawl-px-5 wawl-py-3 wawl-text-sm wawl-rounded-[0.1375rem] wawl-leading-4 wawl-items-center wawl-border wawl-border-gray-300 wawl-text-gray-500">
							<input
								className="wawl-hidden wawl-w-11"
								type="file"
								name="images"
								onChange={ onImageChange }
								multiple
								accept="image/png,image/jpeg,image/webp"
							/>
							Add Image
						</label>
					) }
					<Button
						onClick={ handleRemoveClick }
						buttonStyle="button-primary"
						iconPosition="after"
						addBgColor={ false }
						classNames="!wawl-border-gray-300 wawl-text-gray-500"
						icon=""
					>
						Remove
					</Button>
				</div>
			</div>
		</div>
	);
}
