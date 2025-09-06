export const colors = {
	primary: "#007AFF",
	secondary: "#FF6B6B",
	background: "#f8f9fa",
	white: "#FFFFFF",
	text: "#333333",
	textSecondary: "#666666",
	border: "#e9ecef",
	error: "#FF6B6B",
	success: "#28a745",
	warning: "#ffc107",
	info: "#17a2b8",
} as const;

export type Color = keyof typeof colors;
