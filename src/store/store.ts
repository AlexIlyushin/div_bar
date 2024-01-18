import { configureStore } from '@reduxjs/toolkit';
import ratingReducer from '../features/StarRating/slice/StarRatingSlice';

export const store = configureStore({
    reducer: {
        rating: ratingReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
