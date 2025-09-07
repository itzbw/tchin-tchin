import type React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { responsiveSpacing, responsiveTypography } from "../../utils";

interface ErrorMessageProps {
	title: string;
	subtitle?: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
	title,
	subtitle,
}) => {
	const { theme } = useTheme();

	return (
		<View style={styles.container}>
			<Text style={[styles.title, { color: theme.colors.error }]}>{title}</Text>
			{subtitle && (
				<Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
					{subtitle}
				</Text>
			)}
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
	title: {
		fontSize: responsiveTypography.xl,
		fontWeight: "bold",
		textAlign: "center",
		marginBottom: responsiveSpacing.sm,
	},
	subtitle: {
		fontSize: responsiveTypography.base,
		textAlign: "center",
	},
});
