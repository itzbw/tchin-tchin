import type React from "react";
import { StyleSheet, Text, View } from "react-native";

export const FavoritesScreen: React.FC = () => {
	return (
		<View style={styles.container}>
			<Text>Favorites Screen - Coming Soon</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});
