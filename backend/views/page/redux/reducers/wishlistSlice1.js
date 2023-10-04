// wishlistSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Define the initial state based on the provided JSON data
const initialState = {
	enable_wishlist_for: 'all_users',
	default_wishlist_name: 'New list',
	exclude_type: 'product',
	exclude_items: [ 1, 2, 3 ],
	item_count: true,
	guest_user_wishlist_days: 90,
	enable_for_variation: true,
	enable_for_myaccount: false,
	multi_wishlist_settings: true,
	cart_page_wishlist: true,
	popup_enable: true,
	popup_title: 'Popup title',
	popup_button_text: 'Button Text',
	popup_feature_image_enable: true,
	popup_icon_image: 'http://www.gmail.com',
	theme_default_button_style: true,
	popup_button_color: {
		background_color: '#458947',
		background_hover_color: '#00484',
		border_color: '#69594',
		border_hover_color: '1fdasf0px',
	},
	popup_button_size: {
		border_width: '1px',
		border_height: '1px',
		border_radios: '10px',
		popup_button_margin: '10px',
	},
	popup_notification_text: 'hello',
	popup_notification_icon: 'http://test/gmail.com',
	popup_notification_button_text: 'hello',
};

const wishlistSlice1 = createSlice( {
	name: 'wishlist1',
	initialState,
	reducers: {
		updateWishlistSetting1( state, action ) {
			// Merge the action payload with the current state to update specific properties
			return {
				...state,
				...action.payload,
			};
		},
	},
} );
export const selectWishlist1 = ( state ) => state.wishlist1;

// Export the reducer and actions
export const { updateWishlistSetting1 } = wishlistSlice1.actions;
export default wishlistSlice1.reducer;
