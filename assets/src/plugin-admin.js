import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from '../../backend/views/page/App';
import { store } from '../../backend/views/page/redux/store';
import './styles/admin.scss';

const admin = document.getElementById('ww-admin');

const root = createRoot(admin);
root.render(
	<Provider store={store}>
		<App />
	</Provider>
);

/**
 * A void function.
 *
 * @param {jQuery} $ The jQuery object to be used in the function body
 */
(($) => {
	'use strict';
	$(() => {});
	// Place your administration-specific JavaScript here
})(jQuery);
