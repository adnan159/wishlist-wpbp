import { useSelector } from 'react-redux';
import Dashboard from './components/dashboard/Dashboard';
import { selectWishlist } from './redux/reducers/wishlistSlice';

const App = () => {
	const wishlistSettings = useSelector( selectWishlist );

	return (
		<>
			<div className="wawl-border wawl-border-[#E2E2E2] wawl-bg-white wawl-p-14">
				<div>
					<h3 className="wawl-font-bold wawl-text-xl">
						Wishlist Settings
					</h3>
				</div>
				<Dashboard />
			</div>
		</>
	);
};

export default App;
