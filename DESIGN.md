---
name: Kinship Commerce
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#444651'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#757682'
  outline-variant: '#c5c5d3'
  surface-tint: '#4059aa'
  primary: '#00236f'
  on-primary: '#ffffff'
  primary-container: '#1e3a8a'
  on-primary-container: '#90a8ff'
  inverse-primary: '#b6c4ff'
  secondary: '#9d4300'
  on-secondary: '#ffffff'
  secondary-container: '#fd761a'
  on-secondary-container: '#5c2400'
  tertiary: '#00312c'
  on-tertiary: '#ffffff'
  tertiary-container: '#004942'
  on-tertiary-container: '#4ebdb0'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dce1ff'
  primary-fixed-dim: '#b6c4ff'
  on-primary-fixed: '#00164e'
  on-primary-fixed-variant: '#264191'
  secondary-fixed: '#ffdbca'
  secondary-fixed-dim: '#ffb690'
  on-secondary-fixed: '#341100'
  on-secondary-fixed-variant: '#783200'
  tertiary-fixed: '#89f5e7'
  tertiary-fixed-dim: '#6bd8cb'
  on-tertiary-fixed: '#00201d'
  on-tertiary-fixed-variant: '#005049'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 30px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  gutter: 16px
  margin-mobile: 20px
  margin-desktop: 40px
  stack-sm: 4px
  stack-md: 12px
  stack-lg: 24px
---

## Brand & Style

The design system is built on the pillars of **Reliability** and **Vibrancy**. It targets a demographic that values seamless e-commerce experiences underpinned by a sense of community and trust. The visual language balances a professional, corporate structure with approachable, warm elements to evoke the feeling of shopping with a trusted friend.

The chosen style is **Corporate / Modern** with a focus on high-quality finish and clarity. It avoids excessive decorative elements, opting instead for meaningful color accents and generous whitespace to guide the user's journey. The aesthetic is clean, ensuring that product imagery remains the hero while the UI provides a stable, trustworthy framework.

## Colors

The palette is anchored by a **Deep Blue** primary color, chosen to communicate stability, security, and institutional trust—essential for an e-commerce platform handling transactions. This is contrasted by a **Sunset Orange** accent, which injects energy, warmth, and a friendly "human" touch into the interface. 

A **Soft Teal** is utilized for tertiary actions and supportive elements, maintaining a calm but vibrant secondary tone. The background uses a **Soft Gray** to reduce eye strain and provide a sophisticated canvas for content. Text is rendered in **Dark Slate** to ensure high legibility and a modern, high-contrast feel without the harshness of pure black.

## Typography

This design system utilizes **Inter** across all levels to maintain a systematic and utilitarian feel that performs exceptionally well on mobile screens. The typographic hierarchy is designed for rapid scanning, with bold headlines that use slight negative letter-spacing to appear more cohesive and modern.

For mobile-specific views, large headlines scale down to ensure they do not dominate the viewport, maintaining a balanced ratio between text and imagery. Body copy is set with generous line height to enhance readability during long browsing sessions.

## Layout & Spacing

The design system employs a **Fluid Grid** model based on an 8px rhythmic scale. On mobile devices, a 4-column grid is used with 16px gutters and 20px side margins to ensure content doesn't feel cramped. As the viewport scales to tablet and desktop, the grid expands to 8 and 12 columns respectively.

Spacing between related elements (like a product title and its price) follows the `stack-sm` or `stack-md` tokens, while distinct sections of the app are separated by `stack-lg` to provide clear visual breathing room.

## Elevation & Depth

Visual hierarchy is established through **Ambient Shadows** and **Tonal Layers**. Surfaces are categorized by their "lift" from the background:

1.  **Level 0 (Base):** The Soft Gray background (#F8FAFC).
2.  **Level 1 (Cards/Containers):** Pure white surfaces with a very soft, diffused shadow (10% opacity of the Primary Deep Blue) to create a subtle sense of floating.
3.  **Level 2 (Modals/Overlays):** Elevated surfaces with a more pronounced shadow and a 1px low-contrast border in a slightly darker gray to define edges against white backgrounds.

This approach creates a tactile feel without the heaviness of traditional skeuomorphism, keeping the interface light and airy.

## Shapes

The shape language is consistently **Rounded**, utilizing a base radius of 8px (0.5rem). This specific radius is large enough to feel friendly and approachable but sharp enough to maintain a professional, modern e-commerce aesthetic. 

- **Standard Elements (Buttons, Inputs):** 8px corner radius.
- **Large Elements (Cards, Featured Banners):** 16px (1rem) corner radius.
- **Dynamic Elements (Chips, Tags):** Full pill-shape for maximum distinction from functional buttons.

## Components

### Buttons
- **Primary:** Deep Blue background with White text. Bold weight. High-contrast.
- **Secondary:** Sunset Orange background for "Add to Cart" or "Buy Now" to drive conversion through warmth and energy.
- **Ghost:** Transparent background with Primary color border and text for low-priority actions.

### Input Fields
Inputs use a white background with a subtle 1px border. On focus, the border transitions to Primary Deep Blue with a soft outer glow. Error states utilize the Status Red for both the border and supportive helper text.

### Cards
Product cards are the core component. They feature a 16px radius, a white background, and a subtle shadow. Content is padded by 16px internally, with the product image taking the full width of the top section.

### Chips & Tags
Used for categories or filters. These are pill-shaped with a light tint of the Primary color (e.g., 10% opacity) and Deep Blue text.

### Progress & Status
Success messages (orders placed) utilize the Soft Teal and Success Green. Error messages (payment failed) utilize the Status Red with a soft red background tint to ensure the message is unmistakable but not overly aggressive.