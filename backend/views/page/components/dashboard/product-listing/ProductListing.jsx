import Page from '../../pages/Page';
import PageLeft from '../../pages/PageLeft';
import PageRight from '../../pages/PageRight';
import ProductListingLeft from './ProductListingLeft';

export default function ProductListing() {
	return (
		<>
			<Page
				classes="wm-mt-8 wm-py-8 wm-px-6 wm-border wm-border-gray-200 wm-shadow-lg wm-rounded-lg"
				title="Product Listing Page"
			>
				<PageLeft>
					<ProductListingLeft />
				</PageLeft>
				<PageRight>{ /* <Preview /> */ }</PageRight>
			</Page>
		</>
	);
}
