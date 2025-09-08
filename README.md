# Tchin-Tchin 🍸

> A React Native mobile application for discovering and managing favorite cocktails, built with Expo

## 📋 Project Overview

**Tchin-Tchin** is a mobile application that allows users to discover and manage their favorite cocktails. 
</br>
The app uses the public API [TheCocktailDB](https://www.thecocktaildb.com/api.php) to provide a comprehensive cocktail database with search, details, and favorites management.

### ✅ Requirements Compliance

**Core Requirements:**
- ✅ **React Native + TypeScript + Expo**: Built with Expo
- ✅ **React Redux**: State management with Redux
- ✅ **Tab Navigator**: 2 navigation Tabs
- ✅ **FlatList**: List with `removeClippedSubviews` and pagination
- ✅ **Detail Page**: Navigation to cocktail details
- ✅ **Favorites System**: Add/remove favorites functionality

**Bonus Features Implemented:**
- ✅ **Advanced Search**: Real-time suggestions aftre typing 3+ characters
- ✅ **Light/Dark Theme**: Theme Switching with toggle
- ✅ **Responsive Architecture**: Tablet/mobile adaptation

## 🏗️ Technical Architecture

### Project Structure

```
src/
├── components/           # Reusable components
│   ├── cocktail/        # CocktailCard, CocktailList
│   ├── common/          # EmptyState, LoadingSpinner, ThemeToggle
│   └── search/          # SearchBar, SearchSuggestions
├── context/             # React Context providers
│   └── ThemeContext.tsx # Global theme management
├── hooks/               # Custom hooks
│   ├── useDebounce.ts   # Generic debouncing
│   ├── useFavorite.ts   # Favorites management
│   └── useSearch.ts     # Search logic
├── navigation/          # Navigation configuration
│   ├── AppNavigator.tsx # Main Stack Navigator
│   └── TabNavigator.tsx # Bottom Tab Navigator
├── screens/             # Application screens
│   ├── HomeScreen.tsx   # Home page with search
│   ├── FavoritesScreen.tsx # Favorites page
│   └── CocktailDetailScreen.tsx # Cocktail details
├── store/               # Redux Store
│   ├── api/
│   │   └── cocktailApi.ts # RTK Query API
│   ├── slices/
│   │   └── favoritesSlice.ts # Redux favorites slice
│   └── store.ts         # Store configuration
├── styles/              # Design system
│   ├── themes.ts        # Light/dark themes
│   ├── typography.ts    # Typography system
│   └── spacing.ts       # Spacing and shadows
├── types/               # TypeScript definitions
│   ├── cocktail.ts      # Cocktail API types
│   └── navigation.ts    # Navigation types
└── utils/               # Utilities
    ├── constants.ts     # Global constants
    └── responsive.ts    # Responsive helpers
```

### Technical Choices Explained

#### 1. **Redux Toolkit + RTK Query**
- **Why**: Modern state management with automatic caching and less boilerplate
- **Benefits**: Request deduplication, intelligent cache, automatic typing
- **Implementation**: `cocktailApi` with optimized endpoints

#### 2. **React Navigation**
- **Why**: Native performant navigation with complete TypeScript support
- **Architecture**:`AppNavigator` + `TabNavigator`

#### 3. **Context API for Themes**
- **Why**: Lightweight solution for global UI state
- **Implementation**: `ThemeContext` with `lightTheme` and `darkTheme`

#### 4. **Custom Hooks**
- **Reusability**: `useSearch`, `useFavorites`, `useDebounce`

#### 5. **Responsive System**
- **Mobile-first**: Adaptive design via `responsive.ts`
- **Breakpoints**: Tablet (> 768px) and large tablet (> 1024px)

## 🚀 Installation & Setup

### Prerequisites
```bash
Node.js >= 18
npm
Expo CLI
```

### Installation
```bash
# Clone the repository
git clone
cd tchin-tchin

# Install dependencies
npm install

# Start the application
npm start
```

### Testing on Device
1. **Expo Go**: Scan QR code with Expo Go app
3. **Web**: npx expo start --web

## 🎨 Detailed Features

### Home Page 
- **Smart search**: Real-time suggestions after 3+ charcters input
- **Optimized FlatList**: `removeClippedSubviews`, pagination, `windowSize`
- **Managed states**: Loading, error, empty with dedicated components
- **Performance**: Memoization with `React.memo` and `useCallback`

### Favorites Page 
- **Redux persistence**: Favorites saved in store
- **Custom empty state**: Shows there are no cocktails and to explore at "Home"
- **Dynamic counter**: Display number of favorites

### Detail Page 
- **Smart parsing**: Automatic extraction of ingredients/measures
- **Responsive**: Mobile/tablet adaptation

### Search System
- **Debouncing**: `useDebounce` to optimize API requests
- **Suggestions**: Max 3 suggestions

### Favorites Management
- **Redux Toolkit**: Actions `addToFavorites`, `removeFromFavorites`
- **Performance**: Optimized verification with `useCallback`

## 🎯 Performance Optimizations

### FlatList
```typescript
initialNumToRender={6}
maxToRenderPerBatch={6}
windowSize={5}
removeClippedSubviews={true}
```

### Memoization
```typescript
// Memoized components
export const CocktailCard = React.memo(...)

// Optimized callbacks
const handleCocktailPress = useCallback((id: string) => {
  navigation.navigate("CocktailDetail", { cocktailId: id });
}, [navigation]);
```

### API Caching
```typescript
// RTK Query - Automatic cache
export const cocktailApi = createApi({
  // Automatic request deduplication
})
```

## 🌈 Theme System

### Available Themes
- **Light**: Cream with Brown
- **Dark**: Dark with Pink

### Implementation
```typescript
// Theme toggle via ThemeToggle
const { isDarkMode, toggleTheme } = useTheme();

// Dynamic styles
const styles = getStyles(theme);
```

### Consistent Colors

## 📱 Responsive Design

### Breakpoints
```typescript
export const isTablet = width >= 768;
export const isLargeTablet = width >= 1024;
```

### Adaptive Scaling
```typescript
export const responsiveSize = (mobile, tablet?, largeTablet?) => {
  // Automatic calculation: mobile * 1.25 (tablet) * 1.5 (large)
}
```

## 🔧 Configuration & Customization

### Environment Variables
```typescript
// src/utils/constants.ts
export const SEARCH_CONFIG = {
  DEBOUNCE_DELAY: 300,
  MIN_SUGGESTION_LENGTH: 3,
  MAX_SUGGESTIONS: 3,
} as const;
```


## 🏆 Key Technologies

- React Native
- Expo
- TypeScript 
- Redux Toolkit 
- React Navigation
- React Hooks

---

## 🏆 Conclusion

The application can easily evolve towards more complex functionalities.
