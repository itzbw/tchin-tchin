import { useEffect, useState } from "react";
import { DEFAULT_SEARCH_TERM, SEARCH_CONFIG } from "../utils/constants";
import { useDebounce } from "./useDebounce";

export const useSearch = () => {
	const [searchInput, setSearchInput] = useState("");
	const [searchTerm, setSearchTerm] = useState(DEFAULT_SEARCH_TERM);
	const [showSuggestions, setShowSuggestions] = useState(false);

	const debouncedInput = useDebounce(searchInput, SEARCH_CONFIG.DEBOUNCE_DELAY);

	useEffect(() => {
		if (debouncedInput.length >= SEARCH_CONFIG.MIN_SUGGESTION_LENGTH) {
			setShowSuggestions(true);
		} else {
			setShowSuggestions(false);
		}
	}, [debouncedInput]);

	const handleSearch = () => {
		setSearchTerm(searchInput || DEFAULT_SEARCH_TERM);
		setShowSuggestions(false);
	};

	const handleClear = () => {
		setSearchInput("");
		setSearchTerm(DEFAULT_SEARCH_TERM);
		setShowSuggestions(false);
	};

	const handleSuggestionSelect = (suggestion: string) => {
		setSearchInput(suggestion);
		setSearchTerm(suggestion);
		setShowSuggestions(false);
	};

	const hideSuggestions = () => {
		setShowSuggestions(false);
	};

	return {
		searchInput,
		setSearchInput,
		searchTerm,
		showSuggestions,
		setShowSuggestions,
		debouncedInput,
		handleSearch,
		handleClear,
		handleSuggestionSelect,
		hideSuggestions,
	};
};
