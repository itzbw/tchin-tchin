import { type RouteProp, useRoute } from "@react-navigation/native";
import type React from "react";
import {
	ActivityIndicator,
	Image,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import { useGetCocktailByIdQuery } from "../store/api/cocktailApi";
import { colors } from "../styles/colors";
import type { Ingredient } from "../types/cocktail";
import type { RootStackParamList } from "../types/navigation";

type CocktailDetailRouteProp = RouteProp<RootStackParamList, "CocktailDetail">;

export const CocktailDetailScreen: React.FC = () => {
	const route = useRoute<CocktailDetailRouteProp>();
	const { cocktailId } = route.params;
	const { data, error, isLoading } = useGetCocktailByIdQuery(cocktailId);

	const cocktail = data?.drinks?.[0];

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

	if (isLoading) {
		return (
			<View style={styles.centerContainer}>
				<ActivityIndicator size="large" color={colors.primary} />
				<Text style={styles.loadingText}>Loading cocktail details...</Text>
			</View>
		);
	}

	if (error || !cocktail) {
		return (
			<View style={styles.centerContainer}>
				<Text style={styles.errorText}>Failed to load cocktail details</Text>
				<Text style={styles.errorSubtext}>Please try again</Text>
			</View>
		);
	}

	return (
		<ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
			<View style={styles.imageContainer}>
				<Image
					source={{ uri: cocktail.strDrinkThumb }}
					style={styles.cocktailImage}
					resizeMode="cover"
				/>
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
	imageContainer: {
		alignItems: "center",
		paddingVertical: 24,
		backgroundColor: colors.white,
	},
	cocktailImage: {
		width: 150,
		height: 150,
		borderRadius: 75,
		borderWidth: 4,
		borderColor: colors.primary,
	},
	contentContainer: {
		padding: 20,
	},
	cocktailName: {
		fontSize: 28,
		fontWeight: "bold",
		color: colors.text,
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
		backgroundColor: colors.primary,
		paddingHorizontal: 12,
		paddingVertical: 8,
		borderRadius: 16,
		margin: 4,
	},
	tagText: {
		color: colors.white,
		fontSize: 14,
		fontWeight: "500",
	},
	section: {
		marginBottom: 24,
	},
	sectionTitle: {
		fontSize: 20,
		fontWeight: "bold",
		color: colors.text,
		marginBottom: 12,
	},
	ingredientItem: {
		backgroundColor: colors.white,
		padding: 12,
		borderRadius: 8,
		marginBottom: 8,
		// Simple shadow
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.1,
		shadowRadius: 2,
		elevation: 2,
	},
	ingredientText: {
		fontSize: 16,
		color: colors.textSecondary,
	},
	ingredientName: {
		fontWeight: "600",
		color: colors.text,
	},
	instructionsText: {
		fontSize: 16,
		lineHeight: 24,
		color: colors.text,
		backgroundColor: colors.white,
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
		color: colors.textSecondary,
	},
	errorText: {
		fontSize: 18,
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
});
