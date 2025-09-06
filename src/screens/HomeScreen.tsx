import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { CocktailList } from "../components/cocktail/CocktailList";
import { SearchBar } from "../components/search/SearchBar";
import { useSearch } from "../hooks/useSearch";
import type { RootStackParamList } from "../navigation/AppNavigator";
import { useSearchCocktailsQuery } from "../store/api/cocktailApi";
import { colors } from "../styles/colors";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const HomeScreen: React.FC = () => {
	const navigation = useNavigation<NavigationProp>();
	const { searchInput, setSearchInput, searchTerm, handleSearch, handleClear } =
		useSearch();
	const { data, error, isLoading } = useSearchCocktailsQuery(searchTerm);

	const cocktails = data?.drinks || [];

	const handleCocktailPress = (cocktailId: string) => {
		navigation.navigate("CocktailDetail", { cocktailId });
	};

	const EmptyComponent = () => (
		<View style={styles.emptyContainer}>
			<Text style={styles.emptyText}>No cocktails found</Text>
			<Text style={styles.emptySubtext}>Try searching for something else</Text>
		</View>
	);

	if (error) {
		return (
			<View style={styles.errorContainer}>
				<Text style={styles.errorText}>Failed to load cocktails</Text>
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
				/>
			</View>

			{isLoading ? (
				<View style={styles.loadingContainer}>
					<ActivityIndicator size="large" color={colors.primary} />
					<Text style={styles.loadingText}>Loading cocktails...</Text>
				</View>
			) : (
				<CocktailList
					cocktails={cocktails}
					onCocktailPress={handleCocktailPress}
					ListEmptyComponent={EmptyComponent}
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
		margin: 16,
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
	errorText: {
		fontSize: 18,
		fontWeight: "bold",
		color: colors.error,
		textAlign: "center",
		marginBottom: 8,
	},
	errorSubtext: {
		fontSize: 14,
		color: colors.textSecondary,
		textAlign: "center",
	},
	emptyContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 40,
	},
	emptyText: {
		fontSize: 18,
		fontWeight: "bold",
		color: colors.text,
		textAlign: "center",
		marginBottom: 8,
	},
	emptySubtext: {
		fontSize: 14,
		color: colors.textSecondary,
		textAlign: "center",
	},
});
