import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../styles/colors";
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
		borderRadius: 12,
		padding: 16,
		marginVertical: 6,
		alignItems: "center",
		// Simple shadow
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
	},
	image: {
		width: 60,
		height: 60,
		borderRadius: 8,
		marginRight: 16,
	},
	info: {
		flex: 1,
	},
	name: {
		fontSize: 18,
		fontWeight: "bold",
		color: colors.text,
		marginBottom: 4,
	},
	category: {
		fontSize: 14,
		color: colors.primary,
		marginBottom: 2,
		fontWeight: "500",
	},
	type: {
		fontSize: 14,
		color: colors.textSecondary,
	},
	favoriteButton: {
		padding: 8,
	},
});
