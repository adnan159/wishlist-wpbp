import { useSelector } from 'react-redux';
import Dashboard from './components/dashboard/Dashboard';
import { selectWishlist } from './redux/reducers/wishlistSlice';

const App = () => {
	const wishlistSettings = useSelector( selectWishlist );

	return (
		<>
			<div className="wm-border wm-border-[#E2E2E2] wm-bg-white wm-p-14">
				<div>
					<h3 className="wm-font-bold wm-text-xl">
						Wishlist Settings
					</h3>
				</div>
				<Dashboard />
			</div>
		</>
	);
};

export default App;
