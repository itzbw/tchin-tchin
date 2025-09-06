export interface Cocktail {
	idDrink: string;
	strDrink: string;
	strDrinkThumb: string;
	strCategory: string;
	strAlcoholic: string;
	strGlass: string;
	strInstructions: string;
	strIngredient1?: string;
	strIngredient2?: string;
	strIngredient3?: string;
	strIngredient4?: string;
	strIngredient5?: string;
	strMeasure1?: string;
	strMeasure2?: string;
	strMeasure3?: string;
	strMeasure4?: string;
	strMeasure5?: string;
	[key: string]: string | undefined;
}

export interface CocktailsResponse {
	drinks: Cocktail[] | null;
}

export interface Ingredient {
	ingredient: string;
	measure: string;
}
