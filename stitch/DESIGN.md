---
name: Köz & Maye Studio System
colors:
  surface: '#fbf9f4'
  surface-dim: '#dbdad5'
  surface-bright: '#fbf9f4'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3ee'
  surface-container: '#f0eee9'
  surface-container-high: '#eae8e3'
  surface-container-highest: '#e4e2dd'
  on-surface: '#1b1c19'
  on-surface-variant: '#444748'
  inverse-surface: '#30312e'
  inverse-on-surface: '#f2f1ec'
  outline: '#747878'
  outline-variant: '#c4c7c7'
  surface-tint: '#5f5e5e'
  primary: '#111111'
  on-primary: '#ffffff'
  primary-container: '#262626'
  on-primary-container: '#8e8d8c'
  inverse-primary: '#c8c6c5'
  secondary: '#974725'
  on-secondary: '#ffffff'
  secondary-container: '#fe9970'
  on-secondary-container: '#772f0e'
  tertiary: '#1c0f03'
  on-tertiary: '#ffffff'
  tertiary-container: '#332313'
  on-tertiary-container: '#a18973'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e4e2e1'
  primary-fixed-dim: '#c8c6c5'
  on-primary-fixed: '#1b1c1c'
  on-primary-fixed-variant: '#474746'
  secondary-fixed: '#ffdbce'
  secondary-fixed-dim: '#ffb598'
  on-secondary-fixed: '#370e00'
  on-secondary-fixed-variant: '#78310f'
  tertiary-fixed: '#faddc4'
  tertiary-fixed-dim: '#ddc2a9'
  on-tertiary-fixed: '#271809'
  on-tertiary-fixed-variant: '#564331'
  background: '#fbf9f4'
  on-background: '#1b1c19'
  surface-variant: '#e4e2dd'
typography:
  display-lg:
    fontFamily: Libre Caslon Text
    fontSize: 48px
    fontWeight: '400'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Libre Caslon Text
    fontSize: 36px
    fontWeight: '400'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Libre Caslon Text
    fontSize: 32px
    fontWeight: '400'
    lineHeight: '1.3'
  headline-sm:
    fontFamily: Libre Caslon Text
    fontSize: 24px
    fontWeight: '400'
    lineHeight: '1.4'
  title-lg:
    fontFamily: Hanken Grotesk
    fontSize: 20px
    fontWeight: '600'
    lineHeight: '1.5'
    letterSpacing: 0.02em
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: Hanken Grotesk
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: 0.1em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
  stack-sm: 8px
  stack-md: 24px
  stack-lg: 48px
---

## Brand & Style

This design system embodies the "Warm craft meets contemporary precision" philosophy. It targets a discerning audience that values artisanal quality and architectural clarity in culinary presentation. 

The visual direction is a fusion of **Minimalism** and **Tactile/Skeuomorphic** elements. While the layouts are mathematically precise and grid-driven, the surfaces evoke physical materials—paper, stone, and milled wood. The emotional response should be one of quiet confidence, warmth, and high-end hospitality. The UI avoids all digital-native "playfulness" in favor of a grounded, professional, and editorial aesthetic.

## Colors

The palette is rooted in organic, earth-derived tones that reflect the heat of the oven and the precision of the kitchen.

- **Primary (Deep Charcoal - #262626):** Used for primary typography and structural boundaries. It provides the "precision" in the design.
- **Secondary (Terracotta - #D97B54):** An accent reserved for calls to action, highlights, and subtle brand moments. It represents the "Köz" (embers).
- **Tertiary (Warm Oat - #BFA58E):** Used for secondary UI elements, borders on light surfaces, and muted backgrounds.
- **Neutral (Cream - #F9F7F2):** The primary canvas color. It is softer and more "culinary" than a pure technical white.

Avoid using pure blacks or vibrant blues. Functional colors (success/error) should be desaturated to maintain the sophisticated atmosphere.

## Typography

The typography strategy relies on a sharp contrast between the artisanal heritage of **Libre Caslon Text** and the modern efficiency of **Hanken Grotesk**.

- **Headlines:** Use Libre Caslon Text. It should feel editorial and slightly oversized to emphasize the studio’s craft.
- **UI/Body:** Use Hanken Grotesk. Its contemporary proportions ensure high readability for menus and technical descriptions.
- **Emphasis:** Small-caps or wide-tracked labels should be used for categories and metadata to create a systematic, professional feel.

## Layout & Spacing

The layout utilizes a **Fixed Grid** on desktop (1280px max-width) and a **Fluid Grid** on mobile. 

- **Desktop:** 12-column grid with 24px gutters. Content should feel centered and intentional, using generous "white" (Cream) space to frame products.
- **Mobile:** 4-column grid with 20px margins. 
- **Rhythm:** Use a 4px baseline shift. Vertical rhythm is critical for the "high-density but calm" look; maintain consistent 24px or 48px gaps between logical sections. Avoid cramped components; let the layout breathe like a well-designed menu.

## Elevation & Depth

Depth is conveyed through **Tonal Layers** and **Ambient Shadows** rather than stark physical height.

- **Surface Strategy:** The base is Cream (#F9F7F2). Elevated elements (cards, modals) use a pure white background to subtly pop against the cream base.
- **Shadows:** Use extremely soft, long-range shadows with a hint of terracotta tint in the umbra: `0px 10px 30px rgba(38, 38, 38, 0.04)`.
- **Outlines:** Use low-contrast borders (1px solid #BFA58E at 30% opacity) for cards and inputs to define boundaries without adding visual noise.
- **Textures:** A subtle noise overlay (2-3% opacity) can be applied to large background areas to simulate high-quality paper stock.

## Shapes

The shape language is architectural and precise. 

- **Corners:** Use **Soft (0.25rem)** roundedness for standard UI components like inputs and buttons. This provides just enough warmth to avoid "Brutalist" coldness while remaining much more professional than "Pill" shapes.
- **Cards:** Product and menu cards can use larger 0.5rem (rounded-lg) corners to differentiate them as "objects" within the grid.
- **Icons:** Use thin-stroke (1.5px or 2px) geometric icons. Avoid filled or "bubbly" icon styles.

## Components

- **Buttons:** Rectangular with a slight 4px radius. Primary buttons are Deep Charcoal with Cream text. Secondary buttons use Terracotta text on a transparent background with a Terracotta bottom-border only (2px), creating a bespoke, stationary-like feel.
- **Product Cards:** No heavy drop shadows. Instead, use a subtle 1px Oat border and a pure white background. Product photography should be high-contrast and professionally lit.
- **Refined Form Fields:** Inputs should be "bottom-border only" or have very thin Oat outlines. Labels use `label-caps` typography positioned above the field. Focus state is a subtle color shift to Terracotta on the bottom border.
- **Chips/Tags:** Small-caps text inside a 1px Oat-bordered box with square corners. Used for dietary markers (GF, Vegan, etc.).
- **Lists:** Use elegant horizontal dividers (1px solid Oat) with generous vertical padding (16px-24px) for menu items. Price should be aligned right in a medium-weight Hanken Grotesk.
- **Navigation:** Top-tier navigation uses wide-tracked `label-caps`. Hover states should be a simple underline or a slight opacity shift, never a background "pill" highlight.