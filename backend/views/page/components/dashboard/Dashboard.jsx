import { useState } from 'react';
import ImageUpload from '../common/ImageUpload';
import ImgPrev from '../common/ImgPrev';
import Tab from '../common/Tab';
import Tabs from '../common/Tabs';
import GlobalSettings from './global-settings/GlobalSettings';
import PopupSettings from './global-settings/PopupSettings';

export default function Dashboard() {
	const [ active, setActive ] = useState( 0 );

	const handleChange = ( newActive ) => setActive( newActive );
	return (
		<>
			<Tabs active={ active } onChange={ handleChange }>
				<Tab title="Global settings">
					<GlobalSettings />
					<PopupSettings />
				</Tab>
				<Tab title="Product listing page">
					<h1>Product listing page</h1>

					<ImgPrev />
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
