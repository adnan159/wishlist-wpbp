import { createRoot } from 'react-dom/client';
import App from '../../backend/views/page/App';
import './styles/admin.scss';

const admin = document.getElementById( 'ww-admin' );

const root = createRoot( admin );
root.render( <App /> );

/**
 * A void function.
 *
 * @param {jQuery} $ The jQuery object to be used in the function body
 */
( ( $ ) => {
	'use strict';
	$( () => {} );
	// Place your administration-specific JavaScript here
} )( jQuery );