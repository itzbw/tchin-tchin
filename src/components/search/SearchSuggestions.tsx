import type React from "react";
import {
	FlatList,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { useTheme } from "../../context/ThemeContext";
import type { Theme } from "../../styles/themes";
import type { Cocktail } from "../../types/cocktail";

interface SearchSuggestionsProps {
	suggestions: Cocktail[];
	onSuggestionPress: (suggestion: string) => void;
	isVisible: boolean;
}

export const SearchSuggestions: React.FC<SearchSuggestionsProps> = ({
	suggestions,
	onSuggestionPress,
	isVisible,
}) => {
	const { theme } = useTheme();
	const styles = getStyles(theme);

	console.log("SearchSuggestions render:", {
		isVisible,
		suggestionsCount: suggestions.length,
	});

	if (!isVisible || suggestions.length === 0) {
		return null;
	}

	const handleSuggestionPress = (suggestion: string) => {
		console.log("Suggestion pressed:", suggestion);
		onSuggestionPress(suggestion);
	};

	const renderSuggestion = ({ item }: { item: Cocktail }) => (
		<TouchableOpacity
			style={styles.suggestionItem}
			onPress={() => handleSuggestionPress(item.strDrink)}
			activeOpacity={0.7}
			delayPressIn={0}
			delayPressOut={0}
		>
			<Text style={styles.suggestionText} numberOfLines={1}>
				{item.strDrink}
			</Text>
			<Text style={styles.suggestionCategory} numberOfLines={1}>
				{item.strCategory}
			</Text>
		</TouchableOpacity>
	);

	return (
		<View style={styles.container}>
			<FlatList
				data={suggestions}
				keyExtractor={(item) => item.idDrink}
				renderItem={renderSuggestion}
				scrollEnabled={false}
				ItemSeparatorComponent={() => <View style={styles.separator} />}
				keyboardShouldPersistTaps="handled"
			/>
		</View>
	);
};

const getStyles = (theme: Theme) =>
	StyleSheet.create({
		container: {
			backgroundColor: theme.colors.surface,
			borderRadius: 12,
			marginTop: 4,
			shadowColor: "#000",
			shadowOffset: { width: 0, height: 2 },
			shadowOpacity: 0.1,
			shadowRadius: 4,
			elevation: 3,
			maxHeight: 150,
		},
		suggestionItem: {
			padding: 12,
			paddingHorizontal: 16,
		},
		suggestionText: {
			fontSize: 16,
			fontWeight: "500",
			color: theme.colors.text,
			marginBottom: 2,
		},
		suggestionCategory: {
			fontSize: 14,
			color: theme.colors.textSecondary,
		},
		separator: {
			height: 1,
			backgroundColor: theme.colors.border,
			marginHorizontal: 16,
		},
	});
