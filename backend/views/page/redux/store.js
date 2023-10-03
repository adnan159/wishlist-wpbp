import { configureStore } from '@reduxjs/toolkit';
import productListingReducer from './reducers/productListingSlice';
import wishlistReducer from './reducers/wishlistSlice';

export const store = configureStore( {
	reducer: {
		wishlist: wishlistReducer,
		productListing: productListingReducer,
	},
} );
