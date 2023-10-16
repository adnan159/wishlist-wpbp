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
				'http://localhost:8888/ascode-develop/wp-json/wp/v2/media/',
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
			<div className="wm-flex wm-mx-auto wm-items-center">
				<div className="wm-border wm-border-gray-300 wm-rounded-md wm-block wm-mx-auto wm-object-fit wm-h-32 wm-w-36">
					{ icons ? (
						<div>
							<img
								className="wm-mx-auto wm-object-fit wm-h-32  wm-w-36 wm-px-4 wm-py-2"
								src={ icons }
								alt=""
							/>
						</div>
					) : (
						<img
							className="wm-mx-auto wm-object-cover wm-h-32 wm-w-auto"
							src={ globalSettings[ iconName ] }
							alt="Default"
						/>
					) }
				</div>
				<div className="wm-pl-4 wm-grid wm-gap-4">
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
							classNames="!wm-border-gray-300 wm-text-gray-400"
							icon=""
						>
							Add Image
						</Button>
					) : (
						<label className="wm-px-5 wm-py-3 wm-text-sm wm-rounded-[0.1375rem] wm-leading-4 wm-items-center wm-border wm-border-gray-300 wm-text-gray-500">
							<input
								className="wm-hidden wm-w-11"
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
							classNames="!wm-border-gray-300 wm-text-gray-500"
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
