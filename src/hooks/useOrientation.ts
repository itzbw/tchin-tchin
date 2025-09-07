import { useEffect, useState } from "react";
import { Dimensions } from "react-native";

export const useOrientation = () => {
	const [dimensions, setDimensions] = useState(() => Dimensions.get("window"));

	useEffect(() => {
		const subscription = Dimensions.addEventListener("change", ({ window }) => {
			setDimensions(window);
		});

		return () => subscription?.remove();
	}, []);

	const isTablet = dimensions.width >= 768;
	const isLargeTablet = dimensions.width >= 1024;

	const getColumns = () => {
		if (isLargeTablet) return 3;
		if (isTablet) return 2;
		return 1;
	};

	const responsiveSize = (
		mobileSize: number,
		tabletSize?: number,
		largeTabletSize?: number,
	) => {
		const tablet = tabletSize || Math.round(mobileSize * 1.25);
		const largeTablet = largeTabletSize || Math.round(mobileSize * 1.5);

		if (isLargeTablet) return largeTablet;
		if (isTablet) return tablet;
		return mobileSize;
	};

	return {
		dimensions,
		isTablet,
		isLargeTablet,
		getColumns,
		responsiveSize,
	};
};
