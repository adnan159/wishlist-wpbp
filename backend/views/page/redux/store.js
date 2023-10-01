import { configureStore } from '@reduxjs/toolkit';
import wishlistReducer1 from './reducers/tahira';
import wishlistReducer from './reducers/wishlistSlice';

export const store = configureStore({
	reducer: {
		wishlist: wishlistReducer,
		tahira: wishlistReducer1,
	},
});
