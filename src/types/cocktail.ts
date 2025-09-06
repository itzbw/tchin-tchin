export interface Cocktail {
	idDrink: string;
	strDrink: string;
	strDrinkThumb: string;
	strCategory: string;
	strAlcoholic: string;
	strGlass: string;
	strInstructions: string;
	[key: `strIngredient${number}`]: string | undefined;
	[key: `strMeasure${number}`]: string | undefined;
}

export interface CocktailsResponse {
	drinks: Cocktail[] | null;
}

export interface Ingredient {
	ingredient: string;
	measure: string;
}
