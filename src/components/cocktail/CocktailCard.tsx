import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../styles/colors";
import { layout, spacing } from "../../styles/spacing";
import { typography } from "../../styles/typography";
import type { Cocktail } from "../../types/cocktail";

interface CocktailCardProps {
	cocktail: Cocktail;
	onPress: (id: string) => void;
	showFavoriteButton?: boolean;
	isFavorite?: boolean;
	onFavoriteToggle?: (cocktail: Cocktail) => void;
}

export const CocktailCard: React.FC<CocktailCardProps> = React.memo(
	({
		cocktail,
		onPress,
		showFavoriteButton = false,
		isFavorite = false,
		onFavoriteToggle,
	}) => {
		return (
			<TouchableOpacity
				style={styles.container}
				onPress={() => onPress(cocktail.idDrink)}
				activeOpacity={0.7}
			>
				<Image
					source={{ uri: cocktail.strDrinkThumb }}
					style={styles.image}
					resizeMode="cover"
				/>
				<View style={styles.info}>
					<Text style={styles.name} numberOfLines={2}>
						{cocktail.strDrink}
					</Text>
					<Text style={styles.category}>{cocktail.strCategory}</Text>
					<Text style={styles.type}>{cocktail.strAlcoholic}</Text>
				</View>
				{showFavoriteButton ? (
					<TouchableOpacity
						style={styles.favoriteButton}
						onPress={() => onFavoriteToggle?.(cocktail)}
						hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
					>
						<Ionicons
							name={isFavorite ? "heart" : "heart-outline"}
							size={24}
							color={isFavorite ? colors.secondary : colors.textSecondary}
						/>
					</TouchableOpacity>
				) : (
					<Ionicons
						name="chevron-forward"
						size={24}
						color={colors.textSecondary}
					/>
				)}
			</TouchableOpacity>
		);
	},
);

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		backgroundColor: colors.white,
		borderRadius: layout.borderRadius.lg,
		padding: spacing.lg,
		marginVertical: spacing.sm,
		alignItems: "center",
		...layout.shadow.md,
	},
	image: {
		width: 60,
		height: 60,
		borderRadius: layout.borderRadius.md,
		marginRight: spacing.lg,
	},
	info: {
		flex: 1,
	},
	name: {
		fontSize: typography.sizes.lg,
		fontWeight: typography.weights.bold,
		color: colors.text,
		marginBottom: spacing.xs,
	},
	category: {
		fontSize: typography.sizes.sm,
		color: colors.primary,
		marginBottom: 3,
		fontWeight: typography.weights.medium,
	},
	type: {
		fontSize: typography.sizes.sm,
		color: colors.textSecondary,
	},
	favoriteButton: {
		padding: spacing.sm,
	},
});
