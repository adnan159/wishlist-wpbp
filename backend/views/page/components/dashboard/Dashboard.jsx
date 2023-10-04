import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectWishlist } from '../../redux/reducers/wishlistSlice';
import Button from '../common/Button';
import ImageUpload from '../common/ImageUpload';
import Tab from '../common/Tab';
import Tabs from '../common/Tabs';
import GlobalSettings from './global-settings/GlobalSettings';
import PopupSettings from './global-settings/PopupSettings';
import ProductListing from './product-listing/ProductListing';

export default function Dashboard() {
	const [ active, setActive ] = useState( 0 );
	const wishlistSettings = useSelector( selectWishlist );

	const handleChange = ( newActive ) => setActive( newActive );
	return (
		<>
			<Tabs active={ active } onChange={ handleChange }>
				<Tab title="Global settings">
					<GlobalSettings />
					<PopupSettings />
					<div className="wawl-flex wawl-gap-4 wawl-justify-end wawl-mt-16 wawl-mb-10">
						<Button
							onClick={ () => {
								window.open();
							} }
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
				<Tab title="Product listing page">
					<ProductListing />
				</Tab>
				<Tab title="Single product page">
					<h1>Single product page</h1>
					<ImageUpload />
				</Tab>
				<Tab title="My wishlist page">
					<h1>My wishlist page</h1>
				</Tab>
			</Tabs>
		</>
	);
}
