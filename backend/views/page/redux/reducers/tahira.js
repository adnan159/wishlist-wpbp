// wishlistSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Define the initial state based on the provided JSON data
const initialState = {
	name: 'kola',
};

const wishlistSlice1 = createSlice({
	name: 'tahira',
	initialState,
	reducers: {
		updateWishlistSetting1(state, action) {
			// Merge the action payload with the current state to update specific properties
			return {
				...state,
				...action.payload,
			};
		},
	},
});
export const selectTahira = (state) => state.tahira;

// Export the reducer and actions
export const { updateWishlistSetting1 } = wishlistSlice1.actions;
export default wishlistSlice1.reducer;
