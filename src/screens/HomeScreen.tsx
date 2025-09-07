import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type React from "react";
import { useCallback } from "react";
import {
	FlatList,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import {
	CocktailCard,
	EmptyState,
	ErrorMessage,
	LoadingSpinner,
	SearchBar,
} from "../components";
import { useTheme } from "../context/ThemeContext";
import { useFavorites, useSearch } from "../hooks";
import {
	useGetSearchSuggestionsQuery,
	useSearchCocktailsQuery,
} from "../store";
import type { Theme } from "../styles/themes";
import type { Cocktail, RootStackParamList } from "../types";
import { responsiveSpacing, responsiveTypography } from "../utils";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const HomeScreen: React.FC = () => {
	const navigation = useNavigation<NavigationProp>();
	const { theme } = useTheme();

	const {
		searchInput,
		setSearchInput,
		searchTerm,
		debouncedInput,
		showSuggestions,
		handleSearch,
		handleClear,
		hideSuggestions,
	} = useSearch();
	const { isFavorite, toggleFavorite } = useFavorites();

	const { data, error, isLoading } = useSearchCocktailsQuery(searchTerm);

	const { data: suggestionsData } = useGetSearchSuggestionsQuery(
		debouncedInput,
		{
			skip: debouncedInput.length < 3 || !showSuggestions,
		},
	);

	const styles = getStyles(theme);
	const cocktails = data?.drinks || [];
	const suggestions = suggestionsData?.drinks || [];

	const handleCocktailPress = useCallback(
		(cocktailId: string) => {
			navigation.navigate("CocktailDetail", { cocktailId });
		},
		[navigation],
	);

	const handleSuggestionPress = useCallback(
		(cocktail: Cocktail) => {
			console.log("Navigating to cocktail:", cocktail.strDrink);
			hideSuggestions();
			navigation.navigate("CocktailDetail", { cocktailId: cocktail.idDrink });
		},
		[navigation, hideSuggestions],
	);

	const renderCocktailItem = useCallback(
		({ item }: { item: Cocktail }) => (
			<CocktailCard
				cocktail={item}
				onPress={handleCocktailPress}
				showFavoriteButton={true}
				isFavorite={isFavorite(item.idDrink)}
				onFavoriteToggle={toggleFavorite}
			/>
		),
		[handleCocktailPress, isFavorite, toggleFavorite],
	);

	const keyExtractor = useCallback((item: Cocktail) => item.idDrink, []);

	const renderSuggestion = useCallback(
		(cocktail: Cocktail, index: number) => (
			<TouchableOpacity
				key={cocktail.idDrink}
				style={[
					styles.suggestionItem,
					index === suggestions.length - 1 && styles.lastSuggestionItem,
				]}
				onPress={() => handleSuggestionPress(cocktail)}
				activeOpacity={0.7}
			>
				<Text style={styles.suggestionName} numberOfLines={1}>
					{cocktail.strDrink}
				</Text>
				<Text style={styles.suggestionCategory} numberOfLines={1}>
					{cocktail.strCategory}
				</Text>
			</TouchableOpacity>
		),
		[handleSuggestionPress, styles, suggestions.length],
	);

	if (error) {
		return (
			<ErrorMessage
				title="Failed to load cocktails"
				subtitle="Please check your connection"
			/>
		);
	}

	return (
		<View style={styles.container}>
			<View style={styles.searchContainer}>
				<SearchBar
					value={searchInput}
					onChangeText={setSearchInput}
					onSubmitEditing={handleSearch}
					onClear={handleClear}
					onBlur={hideSuggestions}
					placeholder="Search cocktails..."
				/>

				{/* Suggestions dropdown */}
				{showSuggestions && suggestions.length > 0 && (
					<View style={styles.suggestionsContainer}>
						{suggestions.map((suggestion, index) =>
							renderSuggestion(suggestion, index),
						)}
					</View>
				)}
			</View>

			{isLoading ? (
				<LoadingSpinner text="Loading cocktails..." />
			) : (
				<FlatList
					data={cocktails}
					keyExtractor={keyExtractor}
					renderItem={renderCocktailItem}
					contentContainerStyle={styles.listContent}
					showsVerticalScrollIndicator={false}
					ListEmptyComponent={() => (
						<EmptyState
							icon="search"
							title="No cocktails found"
							subtitle="Try searching for something else"
						/>
					)}
					initialNumToRender={6}
					maxToRenderPerBatch={6}
					windowSize={5}
					removeClippedSubviews={true}
					keyboardShouldPersistTaps="handled"
				/>
			)}
		</View>
	);
};

const getStyles = (theme: Theme) =>
	StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: theme.colors.background,
		},
		searchContainer: {
			paddingHorizontal: responsiveSpacing.lg,
			paddingTop: responsiveSpacing.lg,
			paddingBottom: responsiveSpacing.sm,
			zIndex: 1,
		},
		suggestionsContainer: {
			backgroundColor: theme.colors.surface,
			borderRadius: 12,
			marginTop: 4,
			shadowColor: "#000",
			shadowOffset: { width: 0, height: 2 },
			shadowOpacity: 0.1,
			shadowRadius: 4,
			elevation: 3,
			overflow: "hidden",
		},
		suggestionItem: {
			paddingHorizontal: responsiveSpacing.lg,
			paddingVertical: responsiveSpacing.md,
			borderBottomWidth: 1,
			borderBottomColor: theme.colors.border,
		},
		lastSuggestionItem: {
			borderBottomWidth: 0,
		},
		suggestionName: {
			fontSize: responsiveTypography.base,
			fontWeight: "500",
			color: theme.colors.text,
			marginBottom: 2,
		},
		suggestionCategory: {
			fontSize: responsiveTypography.sm,
			color: theme.colors.textSecondary,
		},
		listContent: {
			paddingHorizontal: responsiveSpacing.lg,
			paddingBottom: responsiveSpacing.xl,
		},
	});
