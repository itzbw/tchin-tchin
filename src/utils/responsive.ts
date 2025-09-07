import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const isTablet = width >= 768;
export const isLargeTablet = width >= 1024;
export const screenWidth = width;
export const screenHeight = height;

export const responsiveSize = (
	mobileSize: number,
	tabletSize?: number,
	largeTabletSize?: number,
) => {
	const tablet = tabletSize || Math.round(mobileSize * 1.25);
	const largeTablet = largeTabletSize || Math.round(mobileSize * 1.5);

	if (isLargeTablet) {
		return largeTablet;
	} else if (isTablet) {
		return tablet;
	} else {
		return mobileSize;
	}
};

export const responsiveSpacing = {
	xs: responsiveSize(4, 6, 8),
	sm: responsiveSize(8, 10, 12),
	md: responsiveSize(12, 16, 20),
	lg: responsiveSize(16, 20, 24),
	xl: responsiveSize(20, 24, 28),
	xxl: responsiveSize(24, 28, 32),
	xxxl: responsiveSize(36, 42, 48),
};

export const responsiveTypography = {
	xs: responsiveSize(12, 14, 16),
	sm: responsiveSize(14, 16, 18),
	base: responsiveSize(16, 18, 20),
	lg: responsiveSize(18, 20, 22),
	xl: responsiveSize(20, 22, 24),
	xxl: responsiveSize(24, 26, 28),
	xxxl: responsiveSize(28, 30, 32),
};
