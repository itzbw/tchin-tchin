import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import type React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ThemeToggle } from "../components/common/ThemeToggle";
import { useTheme } from "../context/ThemeContext";
import { FavoritesScreen } from "../screens/FavoritesScreen";
import { HomeScreen } from "../screens/HomeScreen";
import type { Theme } from "../styles/themes";
import type { TabParamList } from "../types/navigation";

const Tab = createBottomTabNavigator<TabParamList>();

export const TabNavigator: React.FC = () => {
	const { theme } = useTheme();
	const styles = getStyles(theme);

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

					return (
						<View style={styles.iconContainer}>
							<Ionicons name={iconName} size={size} color={color} />
							<Text style={[styles.iconLabel, { color }]}>{route.name}</Text>
						</View>
					);
				},
				tabBarShowLabel: false,
				tabBarActiveTintColor: theme.colors.primary,
				tabBarInactiveTintColor: theme.colors.textSecondary,
				tabBarStyle: styles.tabBar,
				headerStyle: styles.header,
				headerTintColor: theme.colors.text,
				headerTitleAlign: "center",
				headerRight: () => (
					<View style={styles.headerRight}>
						<ThemeToggle />
					</View>
				),
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

const getStyles = (theme: Theme) =>
	StyleSheet.create({
		tabBar: {
			backgroundColor: theme.colors.surface,
			borderTopColor: theme.colors.border,
		},
		header: {
			backgroundColor: theme.colors.surface,
		},
		headerRight: {
			marginRight: 16,
		},
		iconContainer: {
			flexDirection: "row",
			alignItems: "center",
		},
		iconLabel: {
			marginLeft: 8,
			fontSize: 14,
			fontWeight: "500",
		},
	});
