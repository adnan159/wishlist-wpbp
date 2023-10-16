import DisclosureWList from '../../common/DisclosureWList';
import Page from '../../pages/Page';
import PageLeft from '../../pages/PageLeft';
import PageRight from '../../pages/PageRight';
import PopupSettingsLeft from './PopupSettingsLeft';
import Preview from './Preview';

export default function PopupSettings() {
	return (
		<>
			<Page classes="wm-mt-8 wm-py-8 wm-px-16 wm-border wm-border-gray-200 wm-shadow-lg wm-rounded-lg">
				<div className=" wm-col-span-12">
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
