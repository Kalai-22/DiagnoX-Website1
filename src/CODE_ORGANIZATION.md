# Code Organization Summary

## Overview
This document provides an overview of the DiagnoX landing page codebase structure for future developers.

## Project Structure

### Main Application (`/App.tsx`)
The entry point containing all major sections:
- **HeroSection**: Animated gradient background, floating product, parallax effects
- **FeaturesSection**: Bento grid layout with interactive cards
- **AboutUsSection**: Two-part section with workflow steps and benefit cards
- **WaitlistSection**: Contact form, social links, and footer
- **AppContent**: Main container managing dialog states
- **App**: Root component with ThemeProvider

### Component Files

#### `/components/NavBar.tsx`
- Fixed navigation bar with smooth scroll
- Theme toggle (dark/light mode)
- Responsive hamburger menu for mobile/tablet
- Active section highlighting
- Join Waitlist button with dynamic states

#### `/components/BentoCards.tsx`
- Grid layout for feature cards (desktop)
- Accordion-style stacked cards (mobile)
- Hover/click interactions with pulsing gradients
- Responsive scaling across all breakpoints

#### `/components/BenefitTabMobile.tsx`
- Tab-based interface for benefits (mobile/tablet)
- Icon navigation with animations
- Accordion content area
- Smooth transitions between tabs

#### `/components/AnimatedHeroText.tsx`
- Letter-by-letter animation for hero titles
- Gradient text effects for dark mode

#### `/components/BenefitCard.tsx`
- Individual benefit cards for desktop
- Hover effects with gradient overlays

#### `/components/ThemeProvider.tsx`
- Context provider for theme management
- LocalStorage persistence

### Utility Files

#### `/config/fonts.ts`
- Centralized font configurations
- Typography constants

#### `/styles/globals.css`
- Global styles and CSS variables
- Typography defaults
- Tailwind v4.0 configuration

## Responsive Breakpoints

```
Mobile:       300-600px
Small Tab:    601-1079px  
Big Tab:      1080-1280px
Desktop:      >1280px
```

## Key Features

### Animations
- Framer Motion for all animations
- Particle effects on hero and contact sections
- Sequential glowing animation for workflow steps (10.2s cycle)
- Smooth scroll behavior
- Hover micro-interactions

### Theme Support
- Dark mode (default)
- Light mode
- Persistent user preference
- Smooth transitions

### Responsive Design
- Mathematical scaling ratios for hero section
- Fluid typography
- Adaptive layouts (grid → accordion → stacked)
- Touch-friendly interactions on mobile

## Important Notes for Developers

### Do NOT Modify
- All sizing values are carefully calculated
- Animation timings are precisely tuned
- Scale factors maintain visual consistency
- Color gradients are theme-optimized

### Safe to Modify
- Content text (titles, descriptions)
- Social media links
- Form submission endpoint
- FAQ content
- Images/assets

### Common Tasks

#### Changing Colors
Look for color values in component files. Search for:
- `rgba()` values for gradients
- `#hex` values for solid colors
- Theme-based color switches (e.g., `theme === 'dark' ? ... : ...`)

#### Adding New Sections
1. Create component in `/components/`
2. Import in `/App.tsx`
3. Add to `AppContent` render
4. Update NavBar links if needed

#### Modifying Content
- Hero text: `HeroSection` component
- Features: `mobileStackedCards` array in `BentoGrid`
- Benefits: `benefits` array in `AboutUsSection`
- Social links: `socialLinks` arrays

## Performance Considerations

- Images use `figma:asset` scheme for optimization
- Animations use GPU-accelerated properties
- Particle count reduces on mobile for performance
- Lazy viewport detection for animations

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Brave Browser
- Mobile Safari (iOS)
- Chrome Mobile (Android)

## Dependencies

Key libraries:
- `motion/react` (Framer Motion) - Animations
- `lucide-react` - Icons
- React hooks for state management
- Tailwind CSS v4.0 for styling

## Contact

For questions about the codebase, refer to inline comments or the original Figma design file.