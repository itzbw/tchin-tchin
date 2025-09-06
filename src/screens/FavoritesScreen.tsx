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
import { CocktailCard } from "../components/cocktail/CocktailCard";
import { useFavorites } from "../hooks/useFavorite";
import type { RootStackParamList } from "../navigation/AppNavigator";
import { colors } from "../styles/colors";
import type { Cocktail } from "../types/cocktail";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const FavoritesScreen: React.FC = () => {
	const navigation = useNavigation<NavigationProp>();
	const { favorites, isFavorite, toggleFavorite } = useFavorites();

	const handleCocktailPress = useCallback(
		(cocktailId: string) => {
			navigation.navigate("CocktailDetail", { cocktailId });
		},
		[navigation],
	);

	const renderFavoriteItem = useCallback(
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

	if (favorites.length === 0) {
		return (
			<View style={styles.emptyContainer}>
				<Text style={styles.emptyTitle}>No Favorites Yet</Text>
				<Text style={styles.emptySubtitle}>
					Start exploring cocktails and add your favorites here!
				</Text>
				<TouchableOpacity
					style={styles.exploreButton}
					onPress={() => navigation.navigate("Main")}
				>
					<Text style={styles.exploreButtonText}>Explore Cocktails</Text>
				</TouchableOpacity>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.headerText}>
					{favorites.length} Favorite{favorites.length !== 1 ? "s" : ""}
				</Text>
			</View>

			<FlatList
				data={favorites}
				keyExtractor={keyExtractor}
				renderItem={renderFavoriteItem}
				contentContainerStyle={styles.listContent}
				showsVerticalScrollIndicator={false}
				// Basic performance optimizations
				initialNumToRender={6}
				maxToRenderPerBatch={6}
				windowSize={5}
				removeClippedSubviews={true}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.background,
	},
	header: {
		backgroundColor: colors.white,
		paddingHorizontal: 20,
		paddingVertical: 16,
		borderBottomWidth: 1,
		borderBottomColor: colors.border,
	},
	headerText: {
		fontSize: 18,
		fontWeight: "600",
		color: colors.text,
	},
	listContent: {
		paddingHorizontal: 16,
		paddingTop: 16,
	},
	emptyContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 40,
		backgroundColor: colors.background,
	},
	emptyTitle: {
		fontSize: 24,
		fontWeight: "bold",
		color: colors.text,
		textAlign: "center",
		marginBottom: 12,
	},
	emptySubtitle: {
		fontSize: 16,
		color: colors.textSecondary,
		textAlign: "center",
		lineHeight: 24,
		marginBottom: 32,
	},
	exploreButton: {
		backgroundColor: colors.primary,
		paddingHorizontal: 24,
		paddingVertical: 12,
		borderRadius: 25,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
	},
	exploreButtonText: {
		color: colors.white,
		fontSize: 16,
		fontWeight: "600",
	},
});
