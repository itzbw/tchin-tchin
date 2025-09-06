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
import type { RootStackParamList } from "../navigation/AppNavigator";
import { useGetCocktailByIdQuery } from "../store/api/cocktailApi";
import { colors } from "../styles/colors";

type CocktailDetailRouteProp = RouteProp<RootStackParamList, "CocktailDetail">;

export const CocktailDetailScreen: React.FC = () => {
	const route = useRoute<CocktailDetailRouteProp>();
	const { cocktailId } = route.params;
	const { data, error, isLoading } = useGetCocktailByIdQuery(cocktailId);

	const cocktail = data?.drinks?.[0];

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
			</View>
		);
	}

	return (
		<ScrollView style={styles.container}>
			<View style={styles.imageContainer}>
				<Image
					source={{ uri: cocktail.strDrinkThumb }}
					style={styles.cocktailImage}
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
				</View>

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
		paddingVertical: 20,
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
	instructionsText: {
		fontSize: 16,
		lineHeight: 24,
		color: colors.text,
		backgroundColor: colors.white,
		padding: 16,
		borderRadius: 12,
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
});
