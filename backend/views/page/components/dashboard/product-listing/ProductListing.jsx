import Page from '../../pages/Page';
import PageLeft from '../../pages/PageLeft';
import PageRight from '../../pages/PageRight';
import ProductListingLeft from './ProductListingLeft';

export default function ProductListing() {
	return (
		<>
			<Page
				classes="wawl-mt-8 wawl-py-8 wawl-px-6 wawl-border wawl-border-gray-200 wawl-shadow-lg wawl-rounded-lg"
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
