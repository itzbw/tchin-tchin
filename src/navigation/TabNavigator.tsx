import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import type React from "react";
import { FavoritesScreen } from "../screens/FavoritesScreen";
import { HomeScreen } from "../screens/HomeScreen";
import type { TabParamList } from "../types/navigation";

const Tab = createBottomTabNavigator<TabParamList>();

export const TabNavigator: React.FC = () => {
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused, color, size }) => {
					let iconName: keyof typeof Ionicons.glyphMap;

					if (route.name === "Home") {
						iconName = focused ? "wine" : "wine-outline";
					} else {
						iconName = focused ? "heart" : "heart-outline";
					}

					return <Ionicons name={iconName} size={size} color={color} />;
				},
				tabBarActiveTintColor: "#007AFF",
				tabBarInactiveTintColor: "gray",
				headerStyle: { backgroundColor: "#f8f9fa" },
				headerTitleAlign: "center",
			})}
		>
			<Tab.Screen
				name="Home"
				component={HomeScreen}
				options={{ title: "Cocktails" }}
			/>
			<Tab.Screen
				name="Favorites"
				component={FavoritesScreen}
				options={{ title: "Favorites" }}
			/>
		</Tab.Navigator>
	);
};
