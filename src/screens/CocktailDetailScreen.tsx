import { Ionicons } from "@expo/vector-icons";
import { type RouteProp, useRoute } from "@react-navigation/native";
import type React from "react";
import {
	ActivityIndicator,
	Image,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { useTheme } from "../context/ThemeContext";
import { useFavorites } from "../hooks/useFavorite";
import type { RootStackParamList } from "../navigation/AppNavigator";
import { useGetCocktailByIdQuery } from "../store/api/cocktailApi";
import type { Theme } from "../styles/themes";
import type { Ingredient } from "../types/cocktail";

type CocktailDetailRouteProp = RouteProp<RootStackParamList, "CocktailDetail">;

export const CocktailDetailScreen: React.FC = () => {
	const route = useRoute<CocktailDetailRouteProp>();
	const { cocktailId } = route.params;
	const { theme } = useTheme();
	const { isFavorite, toggleFavorite } = useFavorites();
	const { data, error, isLoading } = useGetCocktailByIdQuery(cocktailId);

	const styles = getStyles(theme);
	const cocktail = data?.drinks?.[0];
	const isCurrentlyFavorite = cocktail ? isFavorite(cocktail.idDrink) : false;

	const extractIngredients = (): Ingredient[] => {
		if (!cocktail) return [];

		const ingredients: Ingredient[] = [];
		for (let i = 1; i <= 15; i++) {
			const ingredient = cocktail[`strIngredient${i}`];
			const measure = cocktail[`strMeasure${i}`];

			if (ingredient?.trim()) {
				ingredients.push({
					ingredient: ingredient.trim(),
					measure: measure?.trim() || "",
				});
			}
		}
		return ingredients;
	};

	const ingredients = extractIngredients();

	const handleFavoriteToggle = () => {
		if (cocktail) {
			toggleFavorite(cocktail);
		}
	};

	if (isLoading) {
		return (
			<View style={styles.centerContainer}>
				<ActivityIndicator size="large" color={theme.colors.primary} />
				<Text style={styles.loadingText}>Loading cocktail details...</Text>
			</View>
		);
	}

	if (error || !cocktail) {
		return (
			<View style={styles.centerContainer}>
				<Text style={styles.errorText}>Failed to load cocktail details</Text>
			</View>
		);
	}

	return (
		<ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
			<View style={styles.imageContainer}>
				<Image
					source={{ uri: cocktail.strDrinkThumb }}
					style={styles.cocktailImage}
				/>
				<TouchableOpacity
					style={[
						styles.favoriteButton,
						isCurrentlyFavorite && styles.favoriteButtonActive,
					]}
					onPress={handleFavoriteToggle}
				>
					<Ionicons
						name={isCurrentlyFavorite ? "heart" : "heart-outline"}
						size={28}
						color={
							isCurrentlyFavorite ? theme.colors.white : theme.colors.primary
						}
					/>
				</TouchableOpacity>
			</View>

			<View style={styles.contentContainer}>
				<Text style={styles.cocktailName}>{cocktail.strDrink}</Text>

				<View style={styles.tagsContainer}>
					<View style={styles.tag}>
						<Text style={styles.tagText}>{cocktail.strCategory}</Text>
					</View>
					<View style={styles.tag}>
						<Text style={styles.tagText}>{cocktail.strAlcoholic}</Text>
					</View>
					{cocktail.strGlass && (
						<View style={styles.tag}>
							<Text style={styles.tagText}>{cocktail.strGlass}</Text>
						</View>
					)}
				</View>

				{ingredients.length > 0 && (
					<View style={styles.section}>
						<Text style={styles.sectionTitle}>Ingredients</Text>
						{ingredients.map((item, index) => (
							<View key={index} style={styles.ingredientItem}>
								<Text style={styles.ingredientText}>
									{item.measure ? `${item.measure} ` : ""}
									<Text style={styles.ingredientName}>{item.ingredient}</Text>
								</Text>
							</View>
						))}
					</View>
				)}

				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Instructions</Text>
					<Text style={styles.instructionsText}>
						{cocktail.strInstructions}
					</Text>
				</View>
			</View>
		</ScrollView>
	);
};

const getStyles = (theme: Theme) =>
	StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: theme.colors.background,
		},
		centerContainer: {
			flex: 1,
			justifyContent: "center",
			alignItems: "center",
			padding: 20,
		},
		imageContainer: {
			position: "relative",
			alignItems: "center",
			paddingVertical: 24,
			backgroundColor: theme.colors.surface,
		},
		cocktailImage: {
			width: 150,
			height: 150,
			borderRadius: 75,
			borderWidth: 4,
			borderColor: theme.colors.primary,
		},
		favoriteButton: {
			position: "absolute",
			top: 30,
			right: 20,
			width: 56,
			height: 56,
			borderRadius: 28,
			backgroundColor: theme.colors.surface,
			justifyContent: "center",
			alignItems: "center",
			shadowColor: "#000",
			shadowOffset: { width: 0, height: 2 },
			shadowOpacity: 0.2,
			shadowRadius: 6,
			elevation: 5,
		},
		favoriteButtonActive: {
			backgroundColor: theme.colors.primary,
		},
		contentContainer: {
			padding: 20,
		},
		cocktailName: {
			fontSize: 28,
			fontWeight: "bold",
			color: theme.colors.text,
			textAlign: "center",
			marginBottom: 16,
		},
		tagsContainer: {
			flexDirection: "row",
			flexWrap: "wrap",
			justifyContent: "center",
			marginBottom: 24,
		},
		tag: {
			backgroundColor: theme.colors.primary,
			paddingHorizontal: 12,
			paddingVertical: 8,
			borderRadius: 16,
			margin: 4,
		},
		tagText: {
			color: theme.colors.white,
			fontSize: 14,
			fontWeight: "500",
		},
		section: {
			marginBottom: 24,
		},
		sectionTitle: {
			fontSize: 20,
			fontWeight: "bold",
			color: theme.colors.text,
			marginBottom: 12,
		},
		ingredientItem: {
			backgroundColor: theme.colors.surface,
			padding: 12,
			borderRadius: 8,
			marginBottom: 8,
			shadowColor: "#000",
			shadowOffset: { width: 0, height: 1 },
			shadowOpacity: 0.1,
			shadowRadius: 2,
			elevation: 2,
		},
		ingredientText: {
			fontSize: 16,
			color: theme.colors.textSecondary,
		},
		ingredientName: {
			fontWeight: "600",
			color: theme.colors.text,
		},
		instructionsText: {
			fontSize: 16,
			lineHeight: 24,
			color: theme.colors.text,
			backgroundColor: theme.colors.surface,
			padding: 16,
			borderRadius: 12,
			shadowColor: "#000",
			shadowOffset: { width: 0, height: 1 },
			shadowOpacity: 0.1,
			shadowRadius: 2,
			elevation: 2,
		},
		loadingText: {
			marginTop: 12,
			fontSize: 16,
			color: theme.colors.textSecondary,
		},
		errorText: {
			fontSize: 16,
			color: theme.colors.error,
			textAlign: "center",
		},
	});
