# HomeSections Modular Components

This directory contains the modularized version of the HomeSections component, broken down into smaller, more manageable components.

## Component Structure

### Main Components
- **HomeSections.jsx** - Main container component that orchestrates all sections
- **HomeSectionsLeft.jsx** - Left side containing News, Blog, and Event sections
- **HomeSectionsRight.jsx** - Right side containing the Category Panel

### Section Components
- **Section.jsx** - Generic section component for displaying items with cards
- **NewsSection.jsx** - Specialized component for News section
- **BlogSection.jsx** - Specialized component for Blog section
- **EventSection.jsx** - Specialized component for Event section

### Utility Components
- **CategoryPanel.jsx** - Component for displaying category navigation
- **useHomeData.js** - Custom hook for data fetching and state management

### Layout Components
- **HomeSectionsLeft.jsx** - Container for left-side sections
- **HomeSectionsRight.jsx** - Container for right-side category panel

## Benefits of Modularization

1. **Maintainability** - Each component has a single responsibility
2. **Reusability** - Components can be reused in other parts of the application
3. **Testing** - Easier to write unit tests for individual components
4. **Code Organization** - Clear separation of concerns
5. **Performance** - Better code splitting and lazy loading possibilities

## Usage

```jsx
import { HomeSections } from './components/HomeSections';

// Use the main component
<HomeSections />

// Or use individual components
import { NewsSection, BlogSection, EventSection } from './components/HomeSections';
```

## File Dependencies

- **HomeSections.module.css** - Styles for all components
- **Helper.jsx** - API utility functions
- **react-loading-skeleton** - Loading skeleton components 