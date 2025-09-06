import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	addToFavorites,
	removeFromFavorites,
} from "../store/slices/favoritesSlice";
import type { RootState } from "../store/store";
import type { Cocktail } from "../types/cocktail";

export const useFavorites = () => {
	const dispatch = useDispatch();
	const favorites = useSelector(
		(state: RootState) => state.favorites.favorites,
	);

	const isFavorite = useCallback(
		(cocktailId: string) => favorites.some((fav) => fav.idDrink === cocktailId),
		[favorites],
	);

	const toggleFavorite = useCallback(
		(cocktail: Cocktail) => {
			const isCurrentlyFavorite = isFavorite(cocktail.idDrink);

			if (isCurrentlyFavorite) {
				dispatch(removeFromFavorites(cocktail.idDrink));
			} else {
				dispatch(addToFavorites(cocktail));
			}
		},
		[dispatch, isFavorite],
	);

	return {
		favorites,
		isFavorite,
		toggleFavorite,
	};
};
