import type React from "react";
import { createContext, useContext, useState } from "react";
import type { Theme } from "../styles/themes";
import { darkTheme, lightTheme } from "../styles/themes";

interface ThemeContextType {
	theme: Theme;
	isDarkMode: boolean;
	toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
	theme: lightTheme,
	isDarkMode: false,
	toggleTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [isDarkMode, setIsDarkMode] = useState(false);

	const toggleTheme = () => {
		setIsDarkMode((prev) => !prev);
	};

	const theme = isDarkMode ? darkTheme : lightTheme;

	return (
		<ThemeContext.Provider value={{ theme, isDarkMode, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};

export const useTheme = () => {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}
	return context;
};
