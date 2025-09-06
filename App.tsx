import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { AppNavigator } from "./src/navigation/AppNavigator";
import { store } from "./src/store/store";

export default function App() {
	return (
		<SafeAreaProvider>
			<Provider store={store}>
				<NavigationContainer>
					<StatusBar style="auto" />
					<AppNavigator />
				</NavigationContainer>
			</Provider>
		</SafeAreaProvider>
	);
}
