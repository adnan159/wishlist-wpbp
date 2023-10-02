import DisclosureWList from '../../common/DisclosureWList';
import Page from '../../pages/Page';
import PageLeft from '../../pages/PageLeft';
import PageRight from '../../pages/PageRight';
import PopupSettingsLeft from './PopupSettingsLeft';
import Preview from './Preview';

export default function PopupSettings() {
	return (
		<>
			<Page classes="wawl-mt-8 wawl-py-8 wawl-px-16 wawl-border wawl-border-gray-200 wawl-shadow-lg wawl-rounded-lg">
				<div className=" wawl-col-span-12">
					<DisclosureWList
						title={ 'Popup Settings' }
						children={
							<>
								<Page>
									<PageLeft>
										<PopupSettingsLeft />
									</PageLeft>
									<PageRight>
										<Preview />
									</PageRight>
								</Page>
							</>
						}
					/>
				</div>
			</Page>
		</>
	);
}
