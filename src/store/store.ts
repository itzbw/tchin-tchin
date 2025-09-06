import { configureStore } from "@reduxjs/toolkit";
import { cocktailApi } from "./api/cocktailApi";
import favoritesReducer from "./slices/favoritesSlice";

export const store = configureStore({
	reducer: {
		[cocktailApi.reducerPath]: cocktailApi.reducer,
		favorites: favoritesReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(cocktailApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
