export const SIZES = {
	icon: {
		sm: 16,
		md: 20,
		lg: 24,
		xl: 28,
	},
	image: {
		card: 60,
		detail: 150,
	},
} as const;

export const SEARCH_CONFIG = {
	DEBOUNCE_DELAY: 300,
	MIN_SUGGESTION_LENGTH: 3,
	MAX_SUGGESTIONS: 3,
	SUGGESTION_BLUR_DELAY: 150,
	NAVIGATE_ON_SUGGESTION_CLICK: true,
} as const;

export const DEFAULT_SEARCH_TERM = "margarita";
