import type React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../styles/colors";

export const FavoritesScreen: React.FC = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>Favorites - Coming Soon!</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: colors.background,
	},
	text: {
		fontSize: 18,
		color: colors.text,
	},
});
