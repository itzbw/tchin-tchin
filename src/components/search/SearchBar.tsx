import { Ionicons } from "@expo/vector-icons";
import type React from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { colors } from "../../styles/colors";
import { layout, spacing } from "../../styles/spacing";
import { typography } from "../../styles/typography";

interface SearchBarProps {
	value: string;
	onChangeText: (text: string) => void;
	onSubmitEditing: () => void;
	onClear: () => void;
	placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
	value,
	onChangeText,
	onSubmitEditing,
	onClear,
	placeholder = "Search cocktails...",
}) => {
	return (
		<View style={styles.container}>
			<Ionicons
				name="search"
				size={20}
				color={colors.textSecondary}
				style={styles.searchIcon}
			/>
			<TextInput
				style={styles.input}
				placeholder={placeholder}
				placeholderTextColor={colors.textSecondary}
				value={value}
				onChangeText={onChangeText}
				onSubmitEditing={onSubmitEditing}
				returnKeyType="search"
				autoCapitalize="none"
				autoCorrect={false}
			/>
			{value.length > 0 && (
				<TouchableOpacity onPress={onClear} style={styles.clearButton}>
					<Ionicons
						name="close-circle"
						size={20}
						color={colors.textSecondary}
					/>
				</TouchableOpacity>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: colors.white,
		borderRadius: layout.borderRadius.full,
		paddingHorizontal: spacing.lg,
		paddingVertical: spacing.md,
		...layout.shadow.md,
	},
	searchIcon: {
		marginRight: spacing.sm,
	},
	input: {
		flex: 1,
		fontSize: typography.sizes.base,
		color: colors.text,
		fontWeight: typography.weights.normal,
	},
	clearButton: {
		marginLeft: spacing.sm,
		padding: 4,
	},
});
