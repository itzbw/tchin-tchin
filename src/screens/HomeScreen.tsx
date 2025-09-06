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
import { useSearch } from "../hooks/useSearch";
import { useSearchCocktailsQuery } from "../store/api/cocktailApi";
import { colors } from "../styles/colors";
import type { Cocktail } from "../types/cocktail";
import type { RootStackParamList } from "../types/navigation";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const HomeScreen: React.FC = () => {
	const navigation = useNavigation<NavigationProp>();
	const { searchInput, setSearchInput, searchTerm, handleSearch, handleClear } =
		useSearch();
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
			<CocktailCard cocktail={item} onPress={handleCocktailPress} />
		),
		[handleCocktailPress],
	);

	const keyExtractor = useCallback((item: Cocktail) => item.idDrink, []);

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
		paddingHorizontal: 16,
		paddingTop: 16,
		paddingBottom: 8,
	},
	loadingContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
	},
	loadingText: {
		marginTop: 12,
		fontSize: 16,
		color: colors.textSecondary,
	},
	errorContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
	},
	errorTitle: {
		fontSize: 20,
		fontWeight: "bold",
		color: colors.error,
		textAlign: "center",
		marginBottom: 8,
	},
	errorSubtext: {
		fontSize: 16,
		color: colors.textSecondary,
		textAlign: "center",
	},
	listContent: {
		paddingHorizontal: 16,
		paddingBottom: 20,
	},
	emptyContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 40,
		marginTop: 60,
	},
	emptyTitle: {
		fontSize: 20,
		fontWeight: "bold",
		color: colors.text,
		textAlign: "center",
		marginBottom: 8,
	},
	emptySubtext: {
		fontSize: 16,
		color: colors.textSecondary,
		textAlign: "center",
	},
});
