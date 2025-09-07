export const lightTheme = {
	colors: {
		primary: "#007AFF",
		secondary: "#FF6B6B",
		background: "#f8f9fa",
		surface: "#FFFFFF",
		text: "#333333",
		textSecondary: "#666666",
		border: "#e9ecef",
		white: "#FFFFFF",
		error: "#FF6B6B",
		success: "#28a745",
		warning: "#ffc107",
	},
} as const;

export const darkTheme = {
	colors: {
		primary: "#0A84FF",
		secondary: "#FF6B6B",
		background: "#000000",
		surface: "#1C1C1E",
		text: "#FFFFFF",
		textSecondary: "#8E8E93",
		border: "#38383A",
		white: "#1C1C1E",
		error: "#FF453A",
		success: "#32D74B",
		warning: "#FFD60A",
	},
} as const;

export type Theme = typeof lightTheme;
