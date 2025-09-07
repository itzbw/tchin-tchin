import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type React from "react";
import { useCallback } from "react";
import {
	ActivityIndicator,
	FlatList,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { CocktailCard } from "../components/cocktail/CocktailCard";
import { SearchBar } from "../components/search/SearchBar";
import { useTheme } from "../context/ThemeContext";
import { useFavorites } from "../hooks/useFavorite";
import { useSearch } from "../hooks/useSearch";
import type { RootStackParamList } from "../navigation/AppNavigator";
import {
	useGetSearchSuggestionsQuery,
	useSearchCocktailsQuery,
} from "../store/api/cocktailApi";
import type { Theme } from "../styles/themes";
import type { Cocktail } from "../types/cocktail";
import { responsiveSpacing, responsiveTypography } from "../utils/responsive";

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

	const EmptyComponent = () => (
		<View style={styles.emptyContainer}>
			<Text style={styles.emptyTitle}>No cocktails found</Text>
			<Text style={styles.emptySubtext}>Try searching for something else</Text>
		</View>
	);

	if (error) {
		return (
			<View style={styles.errorContainer}>
				<Text style={styles.errorTitle}>Failed to load cocktails</Text>
				<Text style={styles.errorSubtext}>Please check your connection</Text>
			</View>
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
				<View style={styles.loadingContainer}>
					<ActivityIndicator size="large" color={theme.colors.primary} />
					<Text style={styles.loadingText}>Loading cocktails...</Text>
				</View>
			) : (
				<FlatList
					data={cocktails}
					keyExtractor={keyExtractor}
					renderItem={renderCocktailItem}
					contentContainerStyle={styles.listContent}
					showsVerticalScrollIndicator={false}
					ListEmptyComponent={EmptyComponent}
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
		loadingContainer: {
			flex: 1,
			justifyContent: "center",
			alignItems: "center",
			padding: responsiveSpacing.xl,
		},
		loadingText: {
			marginTop: responsiveSpacing.md,
			fontSize: responsiveTypography.base,
			color: theme.colors.textSecondary,
		},
		errorContainer: {
			flex: 1,
			justifyContent: "center",
			alignItems: "center",
			padding: responsiveSpacing.xl,
		},
		errorTitle: {
			fontSize: responsiveTypography.xl,
			fontWeight: "bold",
			color: theme.colors.error,
			textAlign: "center",
			marginBottom: responsiveSpacing.sm,
		},
		errorSubtext: {
			fontSize: responsiveTypography.base,
			color: theme.colors.textSecondary,
			textAlign: "center",
		},
		listContent: {
			paddingHorizontal: responsiveSpacing.lg,
			paddingBottom: responsiveSpacing.xl,
		},
		emptyContainer: {
			flex: 1,
			justifyContent: "center",
			alignItems: "center",
			paddingHorizontal: responsiveSpacing.xxxl,
			paddingVertical: responsiveSpacing.xxxl,
			marginTop: 60,
		},
		emptyTitle: {
			fontSize: responsiveTypography.xl,
			fontWeight: "bold",
			color: theme.colors.text,
			textAlign: "center",
			marginBottom: responsiveSpacing.sm,
		},
		emptySubtext: {
			fontSize: responsiveTypography.base,
			color: theme.colors.textSecondary,
			textAlign: "center",
			lineHeight: 24,
		},
	});
