import { Ionicons } from "@expo/vector-icons";
import type React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { layout, spacing } from "../../styles/spacing";
import type { Theme } from "../../styles/themes";
import { typography } from "../../styles/typography";
import { responsiveSize } from "../../utils/responsive";

interface EmptyStateProps {
	icon: keyof typeof Ionicons.glyphMap;
	title: string;
	subtitle: string;
	actionText?: string;
	onActionPress?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
	icon,
	title,
	subtitle,
	actionText,
	onActionPress,
}) => {
	const { theme } = useTheme();
	const styles = getStyles(theme);

	return (
		<View style={styles.container}>
			<Ionicons
				name={icon}
				size={responsiveSize(64, 80)}
				color={theme.colors.border}
			/>
			<Text style={styles.title}>{title}</Text>
			<Text style={styles.subtitle}>{subtitle}</Text>
			{actionText && onActionPress && (
				<TouchableOpacity style={styles.actionButton} onPress={onActionPress}>
					<Ionicons
						name="search"
						size={responsiveSize(20, 24)}
						color={theme.colors.white}
					/>
					<Text style={styles.actionText}>{actionText}</Text>
				</TouchableOpacity>
			)}
		</View>
	);
};

const getStyles = (theme: Theme) =>
	StyleSheet.create({
		container: {
			flex: 1,
			justifyContent: "center",
			alignItems: "center",
			paddingHorizontal: spacing.xxxxl,
			paddingVertical: spacing.xxxxl,
		},
		title: {
			fontSize: typography.sizes.xxl,
			fontWeight: typography.weights.bold,
			color: theme.colors.text,
			marginTop: spacing.xl,
			marginBottom: spacing.md,
			textAlign: "center",
		},
		subtitle: {
			fontSize: typography.sizes.base,
			color: theme.colors.textSecondary,
			textAlign: "center",
			lineHeight: typography.sizes.base * typography.lineHeights.relaxed,
			marginBottom: spacing.xxxl,
		},
		actionButton: {
			flexDirection: "row",
			alignItems: "center",
			backgroundColor: theme.colors.primary,
			paddingHorizontal: spacing.xxl,
			paddingVertical: spacing.md,
			borderRadius: layout.borderRadius.full,
			...layout.shadow.sm,
		},
		actionText: {
			color: theme.colors.white,
			fontSize: typography.sizes.base,
			fontWeight: typography.weights.semibold,
			marginLeft: spacing.sm,
		},
	});
