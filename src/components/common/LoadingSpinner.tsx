import type React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { responsiveSpacing, responsiveTypography } from "../../utils";

interface LoadingSpinnerProps {
	text?: string;
	size?: "small" | "large";
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
	text = "Loading...",
	size = "large",
}) => {
	const { theme } = useTheme();

	return (
		<View style={styles.container}>
			<ActivityIndicator size={size} color={theme.colors.primary} />
			<Text style={[styles.text, { color: theme.colors.textSecondary }]}>
				{text}
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: responsiveSpacing.xl,
	},
	text: {
		marginTop: responsiveSpacing.md,
		fontSize: responsiveTypography.base,
	},
});
