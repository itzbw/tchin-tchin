import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Cocktail } from "../../types/cocktail";

interface FavoritesState {
	favorites: Cocktail[];
}

const initialState: FavoritesState = {
	favorites: [],
};

const favoritesSlice = createSlice({
	name: "favorites",
	initialState,
	reducers: {
		addToFavorites: (state, action: PayloadAction<Cocktail>) => {
			const exists = state.favorites.find(
				(item) => item.idDrink === action.payload.idDrink,
			);
			if (!exists) {
				state.favorites.push(action.payload);
			}
		},
		removeFromFavorites: (state, action: PayloadAction<string>) => {
			state.favorites = state.favorites.filter(
				(item) => item.idDrink !== action.payload,
			);
		},
	},
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
