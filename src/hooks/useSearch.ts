import { useState } from "react";

export const useSearch = () => {
	const [searchInput, setSearchInput] = useState("");
	const [searchTerm, setSearchTerm] = useState("margarita");

	const handleSearch = () => {
		setSearchTerm(searchInput || "margarita");
	};

	const handleClear = () => {
		setSearchInput("");
		setSearchTerm("margarita");
	};

	return {
		searchInput,
		setSearchInput,
		searchTerm,
		handleSearch,
		handleClear,
	};
};
