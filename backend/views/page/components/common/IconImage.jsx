import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Img from '../../../asset/img/image.png';
import {
	selectWishlist,
	updateWishlistSetting,
} from '../../redux/reducers/wishlistSlice';
import Button from './Button';

export default function IconImage( { iconName } ) {
	const globalSettings = useSelector( selectWishlist );
	const [ icons, setIcons ] = useState( globalSettings[ iconName ] || Img );

	const dispatch = useDispatch();

	const onImageChange = ( event ) => {
		if ( event.target.files && event.target.files[ 0 ] ) {
			setIcons( URL.createObjectURL( event.target.files[ 0 ] ) );

			var formData = new FormData();
			let file = event.target.files[ 0 ];
			formData.append( 'file', file );
			formData.append( 'title', file.name );
			fetch(
				'/wp-json/wp/v2/media/',
				{
					body: formData,
					method: 'POST',
					headers: {
						'X-WP-Nonce': ww_admin_view_object.rest_nonce,
					},
				}
			)
				.then( ( response ) => {
					return response.json();
				} )
				.then( ( result ) => {
					dispatch(
						updateWishlistSetting( {
							[ iconName ]: result.source_url,
						} )
					);
				} );
		}
	};

	useEffect( () => {
		handleUpdateSettings();
	}, [ icons ] );

	const handleRemoveClick = () => {
		setIcons( '' ); // Set icons to an empty string to remove the image
	};

	const handleUpdateSettings = () => {
		dispatch(
			updateWishlistSetting( {
				[ iconName ]: icons,
			} )
		);
	};

	return (
		<div>
			<div className="wawl-flex wawl-mx-auto wawl-items-center">
				<div className="wawl-border wawl-border-gray-300 wawl-rounded-md wawl-block wawl-mx-auto wawl-object-fit wawl-h-32 wawl-w-36">
					{ icons ? (
						<div>
							<img
								className="wawl-mx-auto wawl-object-fit wawl-h-32  wawl-w-36 wawl-px-4 wawl-py-2"
								src={ icons }
								alt=""
							/>
						</div>
					) : (
						<img
							className="wawl-mx-auto wawl-object-cover wawl-h-32 wawl-w-auto"
							src={ globalSettings[ iconName ] }
							alt="Default"
						/>
					) }
				</div>
				<div className="wawl-pl-4 wawl-grid wawl-gap-4">
					{ ! icons ? (
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
					{ icons && (
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
					) }
				</div>
			</div>
		</div>
	);
}
