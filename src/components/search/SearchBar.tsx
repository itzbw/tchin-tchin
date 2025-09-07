import { Ionicons } from "@expo/vector-icons";
import type React from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import type { Theme } from "../../styles/themes";

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
	const { theme } = useTheme();
	const styles = getStyles(theme);

	return (
		<View style={styles.container}>
			<Ionicons
				name="search"
				size={20}
				color={theme.colors.textSecondary}
				style={styles.searchIcon}
			/>
			<TextInput
				style={styles.input}
				placeholder={placeholder}
				placeholderTextColor={theme.colors.textSecondary}
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
						color={theme.colors.textSecondary}
					/>
				</TouchableOpacity>
			)}
		</View>
	);
};

const getStyles = (theme: Theme) =>
	StyleSheet.create({
		container: {
			flexDirection: "row",
			alignItems: "center",
			backgroundColor: theme.colors.surface,
			borderRadius: 25,
			paddingHorizontal: 16,
			paddingVertical: 12,
			shadowColor: "#000",
			shadowOffset: { width: 0, height: 2 },
			shadowOpacity: 0.1,
			shadowRadius: 4,
			elevation: 3,
		},
		searchIcon: {
			marginRight: 8,
		},
		input: {
			flex: 1,
			fontSize: 16,
			color: theme.colors.text,
		},
		clearButton: {
			marginLeft: 8,
			padding: 4,
		},
	});
