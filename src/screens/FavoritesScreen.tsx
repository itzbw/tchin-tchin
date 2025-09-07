import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import type React from "react";
import { useCallback } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { CocktailCard } from "../components/cocktail/CocktailCard";
import { EmptyState } from "../components/common/EmptyState";
import { useTheme } from "../context/ThemeContext";
import { useFavorites } from "../hooks/useFavorite";
import { spacing } from "../styles/spacing";
import type { Theme } from "../styles/themes";
import { typography } from "../styles/typography";
import type { Cocktail } from "../types/cocktail";
import type { TabParamList } from "../types/navigation";

type NavigationProp = BottomTabNavigationProp<TabParamList>;

export const FavoritesScreen: React.FC = () => {
	const navigation = useNavigation<NavigationProp>();
	const { favorites, isFavorite, toggleFavorite } = useFavorites();
	const { theme } = useTheme();

	const styles = getStyles(theme);

	const handleCocktailPress = useCallback(
		(cocktailId: string) => {
			navigation.getParent()?.navigate("CocktailDetail", { cocktailId });
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
			<View style={styles.container}>
				<EmptyState
					icon="heart-outline"
					title="No Favorites Yet"
					subtitle="Start exploring cocktails and add your favorites here!"
					actionText="Explore Cocktails"
					onActionPress={() => navigation.navigate("Home")}
				/>
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
				initialNumToRender={10}
				maxToRenderPerBatch={10}
				windowSize={10}
				removeClippedSubviews={true}
			/>
		</View>
	);
};

const getStyles = (theme: Theme) =>
	StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: theme.colors.background,
		},
		header: {
			backgroundColor: theme.colors.surface,
			paddingHorizontal: spacing.xl,
			paddingVertical: spacing.lg,
			borderBottomWidth: 1,
			borderBottomColor: theme.colors.border,
		},
		headerText: {
			fontSize: typography.sizes.lg,
			fontWeight: typography.weights.semibold,
			color: theme.colors.text,
		},
		listContent: {
			paddingHorizontal: spacing.lg,
			paddingTop: spacing.lg,
		},
	});
