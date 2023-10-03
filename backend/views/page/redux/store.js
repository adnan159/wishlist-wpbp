import { configureStore } from '@reduxjs/toolkit';
import wishlistReducer from './reducers/wishlistSlice';
import wishlistReducer1 from './reducers/wishlistSlice1';

export const store = configureStore( {
	reducer: {
		wishlist: wishlistReducer,
		tahira: wishlistReducer1,
	},
} );
