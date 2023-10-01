import { useSelector } from 'react-redux';
import Button from './components/common/Button';
import Dashboard from './components/dashboard/Dashboard';
import { selectTahira } from './redux/reducers/tahira';

const App = () => {
	const wishlistSettings = useSelector(selectTahira);

	return (
		<>
			<div className="wawl-border wawl-border-[#E2E2E2] wawl-bg-white wawl-p-14">
				<div>
					<h3 className="wawl-font-bold wawl-text-xl">
						Wishlist Settings
					</h3>
				</div>
				<Dashboard />
				<div className="wawl-flex wawl-gap-4 wawl-justify-end wawl-mt-16 wawl-mb-10">
					<Button
						onClick={() => {
							window.open();
						}}
						buttonStyle={'buttonPrimary'}
						iconPosition={'after'}
						addBgColor={false}
						classNames={''}
						icon={''}
					>
						{'Reset'}
					</Button>
					<Button
						onClick={() => {
							console.log('hello world', wishlistSettings);
						}}
						buttonStyle={'button-primary'}
						iconPosition={'after'}
						addBgColor={true}
						classNames={''}
						icon={''}
					>
						{'Save'}
					</Button>
				</div>
			</div>
		</>
	);
};

export default App;
