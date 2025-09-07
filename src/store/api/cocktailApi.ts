import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { CocktailsResponse } from "../../types/cocktail";
import { SEARCH_CONFIG } from "../../utils/constants";

export const cocktailApi = createApi({
	reducerPath: "cocktailApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "https://www.thecocktaildb.com/api/json/v1/1/",
	}),
	endpoints: (builder) => ({
		searchCocktails: builder.query<CocktailsResponse, string>({
			query: (searchTerm) => `search.php?s=${searchTerm}`,
			transformResponse: (response: CocktailsResponse) => {
				console.log("Search API Response:", JSON.stringify(response, null, 2));
				return response;
			},
		}),
		getCocktailById: builder.query<CocktailsResponse, string>({
			query: (id) => `lookup.php?i=${id}`,
			transformResponse: (response: CocktailsResponse) => {
				console.log("Detail API Response:", JSON.stringify(response, null, 2));
				return response;
			},
		}),
		getSearchSuggestions: builder.query<CocktailsResponse, string>({
			query: (searchTerm) => `search.php?s=${searchTerm}`,
			transformResponse: (response: CocktailsResponse) => {
				if (response.drinks) {
					const limitedDrinks = response.drinks.slice(
						0,
						SEARCH_CONFIG.MAX_SUGGESTIONS,
					);
					console.log("Limited suggestions:", limitedDrinks.length, "drinks");
					return {
						...response,
						drinks: limitedDrinks,
					};
				}
				console.log("No drinks found for suggestions");
				return response;
			},
		}),
		getRandomCocktails: builder.query<CocktailsResponse, void>({
			query: () => "search.php?s=",
		}),
		getCocktailsByCategory: builder.query<CocktailsResponse, string>({
			query: (category) => `filter.php?c=${category}`,
		}),
		getCategories: builder.query<{ drinks: { strCategory: string }[] }, void>({
			query: () => "list.php?c=list",
		}),
	}),
});

export const {
	useSearchCocktailsQuery,
	useGetCocktailByIdQuery,
	useGetSearchSuggestionsQuery,
	useGetRandomCocktailsQuery,
	useGetCocktailsByCategoryQuery,
	useGetCategoriesQuery,
} = cocktailApi;
