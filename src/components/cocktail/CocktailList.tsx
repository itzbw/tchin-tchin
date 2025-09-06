import type React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import type { Cocktail } from "../../types/cocktail";
import { CocktailCard } from "./CocktailCard";

interface CocktailListProps {
	cocktails: Cocktail[];
	onCocktailPress: (id: string) => void;
	ListEmptyComponent?: React.ComponentType;
}

export const CocktailList: React.FC<CocktailListProps> = ({
	cocktails,
	onCocktailPress,
	ListEmptyComponent,
}) => {
	const renderCocktail = ({ item }: { item: Cocktail }) => (
		<CocktailCard cocktail={item} onPress={onCocktailPress} />
	);

	const keyExtractor = (item: Cocktail) => item.idDrink;

	return (
		<View style={styles.container}>
			<FlatList
				data={cocktails}
				keyExtractor={keyExtractor}
				renderItem={renderCocktail}
				contentContainerStyle={styles.listContent}
				showsVerticalScrollIndicator={false}
				ListEmptyComponent={ListEmptyComponent}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	listContent: {
		paddingHorizontal: 16,
		paddingBottom: 20,
	},
});
