import type React from "react";
import {
	ActivityIndicator,
	FlatList,
	StyleSheet,
	Text,
	View,
} from "react-native";
import { SearchBar } from "../components/search/SearchBar";
import { useSearch } from "../hooks/useSearch";
import { useSearchCocktailsQuery } from "../store/api/cocktailApi";
import { colors } from "../styles/colors";
import type { Cocktail } from "../types/cocktail";

export const HomeScreen: React.FC = () => {
	const { searchInput, setSearchInput, searchTerm, handleSearch, handleClear } =
		useSearch();
	const { data, error, isLoading } = useSearchCocktailsQuery(searchTerm);

	const cocktails = data?.drinks || [];

	const renderCocktail = ({ item }: { item: Cocktail }) => (
		<View style={styles.cocktailItem}>
			<Text style={styles.cocktailName}>{item.strDrink}</Text>
			<Text style={styles.cocktailCategory}>{item.strCategory}</Text>
		</View>
	);

	if (error) {
		return (
			<View style={styles.centerContainer}>
				<Text style={styles.errorText}>Failed to load cocktails</Text>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<SearchBar
				value={searchInput}
				onChangeText={setSearchInput}
				onSubmitEditing={handleSearch}
				onClear={handleClear}
			/>

			{isLoading ? (
				<View style={styles.centerContainer}>
					<ActivityIndicator size="large" color={colors.primary} />
					<Text style={styles.loadingText}>Loading cocktails...</Text>
				</View>
			) : (
				<FlatList
					data={cocktails}
					keyExtractor={(item) => item.idDrink}
					renderItem={renderCocktail}
					contentContainerStyle={styles.listContent}
					ListEmptyComponent={() => (
						<View style={styles.centerContainer}>
							<Text style={styles.emptyText}>No cocktails found</Text>
						</View>
					)}
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
	centerContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
	},
	listContent: {
		paddingHorizontal: 16,
		paddingBottom: 20,
	},
	cocktailItem: {
		backgroundColor: colors.white,
		padding: 16,
		marginVertical: 4,
		borderRadius: 8,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.1,
		shadowRadius: 2,
		elevation: 2,
	},
	cocktailName: {
		fontSize: 18,
		fontWeight: "bold",
		color: colors.text,
		marginBottom: 4,
	},
	cocktailCategory: {
		fontSize: 14,
		color: colors.textSecondary,
	},
	loadingText: {
		marginTop: 12,
		fontSize: 16,
		color: colors.textSecondary,
	},
	errorText: {
		fontSize: 16,
		color: colors.error,
		textAlign: "center",
	},
	emptyText: {
		fontSize: 16,
		color: colors.textSecondary,
		textAlign: "center",
	},
});
