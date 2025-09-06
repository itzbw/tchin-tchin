import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type React from "react";
import { CocktailDetailScreen } from "../screens/CocktailDetailScreen";
import { TabNavigator } from "./TabNavigator";

export type RootStackParamList = {
	Main: undefined;
	CocktailDetail: { cocktailId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="Main"
				component={TabNavigator}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="CocktailDetail"
				component={CocktailDetailScreen}
				options={{
					title: "Cocktail Details",
					headerTitleAlign: "center",
				}}
			/>
		</Stack.Navigator>
	);
};
