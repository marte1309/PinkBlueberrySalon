# Guide for Creating New Pages in Pink Blueberry

This document provides detailed instructions on how to create new pages in the Pink Blueberry project, following the existing architecture and design patterns.

## Application Structure

The Pink Blueberry project follows an architecture based on Atomic Design principles, with the following structure:

```
webapp/
├── src/
│   ├── components/
│   │   ├── atoms/        # Basic components (buttons, inputs, etc.)
│   │   ├── molecules/    # Combinations of atoms (cards, forms, etc.)
│   │   ├── organisms/    # Complex combinations (navigation, sections, etc.)
│   │   ├── templates/    # Complete templates for pages
│   │   └── ui/           # Reusable UI components (shadcn/ui)
│   ├── pages/            # Pages that are routed in the application
│   ├── store/            # Global Redux state
│   │   └── slices/       # Redux slices for different functionalities
│   ├── hooks/            # Custom hooks
│   ├── lib/              # Utilities and helper functions
│   ├── services/         # Services for API communication
│   ├── assets/           # Static resources
│   └── App.tsx           # Main component with route configuration
```

## Process for Creating a New Page

Follow these steps to create a new page in the Pink Blueberry project:

### 1. Create the Template Component

First, create a directory for the new page in the `components/templates/` folder:

```bash
mkdir -p src/components/templates/NewPage
```

Inside this directory, create two files:

#### 1.1. Main Component File (NewPage.tsx)

```tsx
import React from 'react';
import { Navigation } from '@/components/organisms/Navigation/Navigation';
import { Footer } from '@/components/organisms/Footer/Footer';
import { Button } from '@/components/atoms/Button/Button';
import { Badge } from '@/components/ui/badge';
// Import other necessary components

export const NewPage: React.FC = () => {
  // Component logic (states, effects, etc.)

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main>
        {/* Page sections */}
        <section className="py-16 md:py-24 bg-gradient-subtle">
          <div className="container mx-auto px-4">
            {/* Section content */}
          </div>
        </section>
        
        {/* More sections as needed */}
      </main>

      <Footer />
    </div>
  );
};
```

#### 1.2. Export File (index.ts)

```ts
export * from './NewPage';
```

### 2. Update the Templates Index File

Add the export of your new page in `components/templates/index.ts`:

```ts
// Atomic Design - Templates Export
export { HomePage } from './HomePage/HomePage';
export { ServicesPage } from './ServicesPage/ServicesPage';
export { NewPage } from './NewPage/NewPage';
// Other exports...
```

### 3. Create the Page File

Create a file in the `pages/` folder that will use the template component:

```bash
touch src/pages/NewPage.tsx
```

File content:

```tsx
import { NewPage } from '@/components/templates/NewPage';

const NewPagePage = () => {
  return <NewPage />;
};

export default NewPagePage;
```

### 4. Add the Route in App.tsx

Open `src/App.tsx` and add the route for your new page:

```tsx
import NewPage from "./pages/NewPage";

// Inside the Routes component
<Routes>
  <Route path="/" element={<Index />} />
  <Route path="/services" element={<Services />} />
  <Route path="/new-page" element={<NewPage />} />
  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
  <Route path="*" element={<NotFound />} />
</Routes>
```

### 5. Update Navigation (Optional)

If you want to add a link to the new page in the navigation menu, update the `navigationItems` array in `components/organisms/Navigation/Navigation.tsx`:

```tsx
const navigationItems = [
  { name: 'Services', href: '/services', icon: Sparkles },
  { name: 'Products', href: '/products', icon: ShoppingBag },
  { name: 'New Page', href: '/new-page', icon: IconComponent },
  { name: 'Book Now', href: '/booking', icon: Calendar },
  { name: 'Contact', href: '/contact', icon: Phone },
];
```

## Style and Design Guide

To maintain consistency with the Pink Blueberry design, follow these guidelines:

### Colors and Gradients

Use the predefined CSS variables:

```css
/* Primary colors */
text-primary (main pink)
text-secondary (main blue)
text-accent (accent gold)

/* Gradients */
bg-gradient-luxury (pink-gold gradient)
bg-gradient-watercolor (pink-blue-gold gradient with transparency)
bg-gradient-primary (pink-blue gradient)
bg-gradient-subtle (subtle background gradient)

/* Shadows */
shadow-luxury (pink shadow)
shadow-gold (gold shadow)
shadow-blue (blue shadow)
shadow-soft (soft shadow)
```

### Typography

Use the predefined text classes:

```css
.text-hero (for main titles)
.text-h1 (for level 1 headings)
.text-h2 (for level 2 headings)
.text-h3 (for level 3 headings)
.text-body (for main text)
.text-small (for small text)
.text-caption (for captions)
```

### UI Components

Use the predefined UI components in `components/ui/` and `components/atoms/`, `components/molecules/`, etc.

#### Buttons

```tsx
// Available variants
<Button variant="luxury">Luxury Button</Button>
<Button variant="watercolor">Watercolor Button</Button>
<Button variant="hero">Hero Button</Button>
<Button variant="default">Default Button</Button>

// Available sizes
<Button size="default">Normal</Button>
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra Large</Button>
<Button size="icon">Icon</Button>
```

#### Badges

```tsx
<Badge className="bg-primary/10 text-primary border-primary/20">
  <Icon className="w-4 h-4 mr-2" />
  Badge Text
</Badge>
```

### Section Patterns

Follow these patterns to create consistent sections:

#### 1. Section Header

```tsx
<div className="text-center mb-16">
  <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
    <Icon className="w-4 h-4 mr-2" />
    Badge Title
  </Badge>
  <h2 className="text-h1 font-light text-foreground mb-6">
    Regular Title 
    <span className="bg-gradient-luxury bg-clip-text text-transparent"> Highlighted</span>
  </h2>
  <p className="text-h3 text-muted-foreground max-w-2xl mx-auto">
    Section description
  </p>
</div>
```

#### 2. Card Grid

```tsx
<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
  {items.map((item) => (
    <Card
      key={item.id}
      className="group overflow-hidden bg-gradient-subtle shadow-soft hover:shadow-luxury transition-all duration-300 hover:scale-105"
    >
      {/* Card content */}
    </Card>
  ))}
</div>
```

#### 3. CTA (Call to Action)

```tsx
<section className="py-16 bg-gradient-luxury text-primary-foreground">
  <div className="container mx-auto px-4">
    <div className="text-center max-w-3xl mx-auto">
      <h2 className="text-h1 font-light mb-6">CTA Title</h2>
      <p className="text-h3 opacity-90 mb-8">
        Persuasive description
      </p>
      <Button variant="watercolor" size="xl">
        Button Text
        <Icon className="w-5 h-5 ml-2" />
      </Button>
    </div>
  </div>
</section>
```

## Redux Integration (when necessary)

If your page needs to interact with the global state:

1. Import the necessary hooks and actions:

```tsx
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { action } from '@/store/slices/yourSlice';
```

2. Use the hooks in your component:

```tsx
const Component = () => {
  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.sliceName.property);
  
  const handleAction = () => {
    dispatch(action(payload));
  };
  
  return (
    // JSX that uses data and the handleAction function
  );
};
```

## Complete Example of a New Page

For a complete example of how to implement a new page, check the implementation of the services page in:

- `/components/templates/ServicesPage/ServicesPage.tsx`
- `/pages/Services.tsx`
- Route in `App.tsx`

## Important Considerations

1. **Responsive Design**: Make sure your page is responsive using Tailwind classes like `md:`, `lg:`, etc.
2. **Accessibility**: Maintain good accessibility practices (contrast, labels, keyboard navigation).
3. **Performance**: Avoid unnecessary renders and optimize images.
4. **Consistency**: Follow the Pink Blueberry design system to maintain a coherent experience.

## Testing

After creating your new page:

1. Verify that the route works correctly
2. Test the page at different screen sizes
3. Make sure all interactions and animations work as expected

---

Document created: September 20, 2025
