import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import type { Theme } from "../../styles/themes";
import type { Cocktail } from "../../types/cocktail";
import {
	responsiveSize,
	responsiveSpacing,
	responsiveTypography,
} from "../../utils/responsive";

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
		const { theme } = useTheme();
		const styles = getStyles(theme);

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
							size={responsiveSize(24, 28)}
							color={
								isFavorite ? theme.colors.secondary : theme.colors.textSecondary
							}
						/>
					</TouchableOpacity>
				) : (
					<Ionicons
						name="chevron-forward"
						size={responsiveSize(24, 28)}
						color={theme.colors.textSecondary}
					/>
				)}
			</TouchableOpacity>
		);
	},
);

const getStyles = (theme: Theme) =>
	StyleSheet.create({
		container: {
			flexDirection: "row",
			backgroundColor: theme.colors.surface,
			borderRadius: responsiveSize(12, 16),
			padding: responsiveSpacing.lg,
			marginVertical: responsiveSpacing.sm,
			alignItems: "center",
			shadowColor: "#000",
			shadowOffset: { width: 0, height: 2 },
			shadowOpacity: 0.1,
			shadowRadius: 4,
			elevation: 3,
		},
		image: {
			width: responsiveSize(60, 80),
			height: responsiveSize(60, 80),
			borderRadius: responsiveSize(8, 12),
			marginRight: responsiveSpacing.lg,
		},
		info: {
			flex: 1,
		},
		name: {
			fontSize: responsiveTypography.lg,
			fontWeight: "bold",
			color: theme.colors.text,
			marginBottom: responsiveSpacing.xs,
		},
		category: {
			fontSize: responsiveTypography.sm,
			color: theme.colors.primary,
			marginBottom: 2,
			fontWeight: "500",
		},
		type: {
			fontSize: responsiveTypography.sm,
			color: theme.colors.textSecondary,
		},
		favoriteButton: {
			padding: responsiveSpacing.sm,
		},
	});
