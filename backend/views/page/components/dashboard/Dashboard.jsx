import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	getWishlistSettings,
	selectWishlist,
} from '../../redux/reducers/wishlistSlice';
import Button from '../common/Button';
import Tab from '../common/Tab';
import Tabs from '../common/Tabs';
import GlobalSettings from './global-settings/GlobalSettings';
import PopupSettings from './global-settings/PopupSettings';
import ProductListing from './product-listing/ProductListing';

export default function Dashboard() {
	const [ active, setActive ] = useState( 0 );
	const wishlistSettings = useSelector( selectWishlist );

	const dispatch = useDispatch();

	const [ prevSettings, setPrevSettings ] = useState( [] );

	const url = ww_admin_view_object.base_rest_url + '/global-settings';

	useEffect( () => {
		const headers = {
			'Content-Type': 'application/json',
			'X-WP-Nonce': ww_admin_view_object.rest_nonce,
		};

		axios.get( url, { headers } ).then( ( response ) => {
			setPrevSettings( response.data.data );
		} );
	}, [] );

	const handleReset = ( e ) => {
		e.preventDefault();
		dispatch( getWishlistSettings( prevSettings ) );
	};

	const handleChange = ( newActive ) => setActive( newActive );
	return (
		<>
			<Tabs active={ active } onChange={ handleChange }>
				<Tab title="Dashboard">
					<h1>My wishlist page</h1>
				</Tab>
				<Tab title="Settings">
					<GlobalSettings />
					<div className="wm-flex wm-gap-4 wm-justify-end wm-mt-16 wm-mb-10">
						<Button
							onClick={ handleReset }
							buttonStyle={ 'buttonPrimary' }
							iconPosition={ 'after' }
							addBgColor={ false }
							classNames={ '' }
							icon={ '' }
						>
							{ 'Reset' }
						</Button>
						<Button
							onClick={ () => {
								console.log( 'hello world', wishlistSettings );
							} }
							buttonStyle={ 'button-primary' }
							iconPosition={ 'after' }
							addBgColor={ true }
							classNames={ '' }
							icon={ '' }
						>
							{ 'Save' }
						</Button>
					</div>
				</Tab>
				<Tab title="Pop Up">
					<PopupSettings />
					<div className="wm-flex wm-gap-4 wm-justify-end wm-mt-16 wm-mb-10">
						<Button
							onClick={ handleReset }
							buttonStyle={ 'buttonPrimary' }
							iconPosition={ 'after' }
							addBgColor={ false }
							classNames={ '' }
							icon={ '' }
						>
							{ 'Reset' }
						</Button>
						<Button
							onClick={ () => {
								console.log( 'hello world', wishlistSettings );
							} }
							buttonStyle={ 'button-primary' }
							iconPosition={ 'after' }
							addBgColor={ true }
							classNames={ '' }
							icon={ '' }
						>
							{ 'Save' }
						</Button>
					</div>
				</Tab>
				<Tab title="Shop">
					<ProductListing />
				</Tab>

				<Tab title="Product">
					<h1>My wishlist page</h1>
				</Tab>
			</Tabs>
		</>
	);
}
