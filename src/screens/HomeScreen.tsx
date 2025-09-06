import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type React from "react";
import { useCallback } from "react";
import {
	ActivityIndicator,
	FlatList,
	StyleSheet,
	Text,
	View,
} from "react-native";
import { CocktailCard } from "../components/cocktail/CocktailCard";
import { SearchBar } from "../components/search/SearchBar";
import { useFavorites } from "../hooks/useFavorite";
import { useSearch } from "../hooks/useSearch";
import type { RootStackParamList } from "../navigation/AppNavigator";
import { useSearchCocktailsQuery } from "../store/api/cocktailApi";
import { colors } from "../styles/colors";
import { spacing } from "../styles/spacing";
import { typography } from "../styles/typography";
import type { Cocktail } from "../types/cocktail";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const HomeScreen: React.FC = () => {
	const navigation = useNavigation<NavigationProp>();
	const { searchInput, setSearchInput, searchTerm, handleSearch, handleClear } =
		useSearch();
	const { isFavorite, toggleFavorite } = useFavorites();
	const { data, error, isLoading } = useSearchCocktailsQuery(searchTerm);

	const cocktails = data?.drinks || [];

	const handleCocktailPress = useCallback(
		(cocktailId: string) => {
			navigation.navigate("CocktailDetail", { cocktailId });
		},
		[navigation],
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

	const EmptyComponent = () => (
		<View style={styles.emptyContainer}>
			<Ionicons
				name="wine"
				size={64}
				color={colors.textSecondary}
				style={styles.emptyIcon}
			/>
			<Text style={styles.emptyTitle}>No cocktails found</Text>
			<Text style={styles.emptySubtext}>Try searching for something else</Text>
		</View>
	);

	if (error) {
		return (
			<View style={styles.errorContainer}>
				<Ionicons
					name="alert-circle"
					size={48}
					color={colors.error}
					style={styles.errorIcon}
				/>
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
					placeholder="Search cocktails..."
				/>
			</View>

			{isLoading ? (
				<View style={styles.loadingContainer}>
					<ActivityIndicator size="large" color={colors.primary} />
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
				/>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.background,
	},
	searchContainer: {
		paddingHorizontal: spacing.lg,
		paddingTop: spacing.lg,
		paddingBottom: spacing.sm,
	},
	loadingContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: spacing.xl,
	},
	loadingText: {
		marginTop: spacing.lg,
		fontSize: typography.sizes.base,
		color: colors.textSecondary,
	},
	errorContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: spacing.xl,
	},
	errorIcon: {
		marginBottom: spacing.lg,
	},
	errorTitle: {
		fontSize: typography.sizes.xl,
		fontWeight: typography.weights.bold,
		color: colors.error,
		textAlign: "center",
		marginBottom: spacing.sm,
	},
	errorSubtext: {
		fontSize: typography.sizes.base,
		color: colors.textSecondary,
		textAlign: "center",
	},
	listContent: {
		paddingHorizontal: spacing.lg,
		paddingBottom: spacing.xl,
	},
	emptyContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: spacing.xxxxl,
		paddingVertical: spacing.xxxxl,
		marginTop: 60,
	},
	emptyIcon: {
		marginBottom: spacing.lg,
	},
	emptyTitle: {
		fontSize: typography.sizes.xl,
		fontWeight: typography.weights.bold,
		color: colors.text,
		textAlign: "center",
		marginBottom: spacing.sm,
	},
	emptySubtext: {
		fontSize: typography.sizes.base,
		color: colors.textSecondary,
		textAlign: "center",
		lineHeight: typography.sizes.base * typography.lineHeights.relaxed,
	},
});
