// wishlistSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Define the initial state based on the provided JSON data
const initialState = {
	listing_settings_enable: 'true',
	listing_button_position: 'On image top left',
	listing_button_type: 'icon',
	listing_icon: 'heart',
	listing_theme_default: 'true',
	listing_icon_style: {
		icon_size: '10px',
		icon_color: '#958303',
		icon_hover_color: '#4359078',
	},
	listing_button_color: {
		background_color: '#000000',
		background_hover_color: '#458943',
		border_color: '#456544',
		border_hover_color: '',
	},
	listing_button_size: {
		border_width: '10px',
		border_height: '10px',
		border_radius: '10px',
		margin: '10px',
	},
};

const productListingSlice = createSlice( {
	name: 'productListing',
	initialState,
	reducers: {
		updateProductListing( state, action ) {
			// Merge the action payload with the current state to update specific properties
			return {
				...state,
				...action.payload,
			};
		},
	},
} );
export const selectProductListing = ( state ) => state.productListing;

// Export the reducer and actions
export const { updateProductListing } = productListingSlice.actions;
export default productListingSlice.reducer;
