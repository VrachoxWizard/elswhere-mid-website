# Pixel-Perfect "Elsewhere" Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a pixel-perfect, identical, fully responsive, and interactive landing page matching the UI in `Ui-reference.webp` ("elsewhere." Swiss Alpine getaway landing page), with 1:1 visual fidelity and rich interactions.

**Architecture:** Vanilla HTML5, modern CSS3 with custom properties and responsive media queries, and lightweight modern ES6 JavaScript. High-resolution clean background art extracted and inpainted with OpenCV/SciPy, custom SVG icons, Google Fonts webfonts, halftone overlay, and headless Chrome automated screenshot verification against `Ui-reference.webp`.

**Tech Stack:** HTML5, CSS3, ES6 JavaScript, Python (OpenCV/PIL for image assets and SSIM visual comparison), Google Chrome Headless for automated visual verification.

**Spec:** Replicate `Ui-reference.webp` in the root folder with 1:1 pixel accuracy, identical typography, colors, layout, and iconography, plus interactive states and responsive behavior.

## Global Constraints
- Exact visual replication of `Ui-reference.webp` down to letter-spacing, font weights, padding, colors, and layout.
- Clean semantic HTML without unnecessary framework bloat.
- Modern CSS using OKLCH and Hex tokens, responsive flexbox/grid layout, and smooth transitions.
- Interactive features: Slide carousel (01/04 to 04/04), Hamburger menu drawer, Modal for "Plan Your Escape", Smooth scroll on "Scroll to Wander", and a toggle between "Mockup View" (1600x1200 matching `Ui-reference.webp`) and "Full-Screen View".
- Automated visual comparison using Python and headless Chrome to verify pixel accuracy.

## Review Focus
- Typography match: Serif display for "elsewhere." and "Get Lost. Feel Found." with exact serif styling, optical size, and weight.
- Button geometry: Pill shape `border-radius: 9999px`, padding, exact color `#FEEFD9`, typography, and arrow alignment.
- Background art fidelity: Halftone texture, mountain ridge sharpness, blue sky gradient, and absence of text artifacts behind DOM elements.
- Bottom HUD alignment: Location pin, coordinates, vertical divider, collection label, scroll prompt, slide indicator `01 / 04`, and navigation chevrons.
- Cross-resolution responsiveness: Flawless layout at 1600x1200, 1440x900, 1280x800, 768px tablet, and 375px mobile.

---

### Task 1: Background Asset Inpainting & SVG Icon Creation

**Files:**
- Create: `assets/images/background-clean.webp`
- Create: `assets/images/background-clean.png`
- Create: `assets/icons/pin.svg`
- Create: `assets/icons/arrow-up-right.svg`
- Create: `assets/icons/arrow-right.svg`
- Create: `assets/icons/arrow-down.svg`
- Create: `assets/icons/chevron-left.svg`
- Create: `assets/icons/chevron-right.svg`
- Create: `assets/icons/menu.svg`
- Create: `scripts/prepare_assets.py`

**Interfaces:**
- Produces: Clean background images without text, ready for DOM overlay, and crisp SVGs for all UI icons.

- [ ] **Step 1: Write asset preparation script `scripts/prepare_assets.py`**
  Generate high-precision mask of text elements in `ui_inner.png`, inpaint sky and bottom gradient using OpenCV Navier-Stokes and texture-preserving blending, and save clean background at full resolution.
- [ ] **Step 2: Run script to generate clean background assets**
  Run: `python scripts/prepare_assets.py`
  Verify: `assets/images/background-clean.png` and `assets/images/background-clean.webp` are generated cleanly with no text artifacts.
- [ ] **Step 3: Create SVG icons in `assets/icons/`**
  Write precise vector SVGs for pin, arrows, chevrons, and menu.
- [ ] **Step 4: Verify generated image assets visually**
  Inspect cropped sections of the clean background image to confirm seamless sky texture and mountain ridge integrity.

---

### Task 2: Typography Selection, Font Tuning & Design Tokens

**Files:**
- Create: `css/tokens.css`
- Create: `scripts/test_fonts.py`

**Interfaces:**
- Produces: CSS custom properties for colors, typography, spacing, shadows, and font imports.

- [ ] **Step 1: Write font comparison script `scripts/test_fonts.py`**
  Render text "Get Lost. Feel Found." and "elsewhere." with Google Fonts candidates (Fraunces, Playfair Display, Instrument Serif, DM Serif Display) and compare glyph contours against `hero_letters_zoom.png`.
- [ ] **Step 2: Run font comparison script and select optimal font**
  Run: `python scripts/test_fonts.py`
  Lock font choice and weights.
- [ ] **Step 3: Create `css/tokens.css`**
  Define complete design token system: colors (`--color-cream: #FEEFD9`, `--color-ivory: #FFF6EA`, `--color-sky-blue: #0A2F99`, `--color-dark-navy: #0C101A`, `--color-divider: rgba(255, 255, 255, 0.35)`), font families, font sizes, weights, transitions.

---

### Task 3: HTML Markup & Structure

**Files:**
- Create: `index.html`

**Interfaces:**
- Consumes: `css/tokens.css`, `assets/icons/*.svg`
- Produces: Complete semantic DOM structure for the landing page.

- [ ] **Step 1: Structure `index.html`**
  Write complete semantic HTML with:
  - Mockup wrapper (`.mockup-container`) supporting both mockup frame view and full-viewport view.
  - Header: logo `.logo`, navigation links `.nav-links`, CTA button `.btn-escape`, circular hamburger menu `.btn-menu`.
  - Hero: eyebrow `.hero-eyebrow`, headline `.hero-title`, subtitle `.hero-subtitle`, CTA group `.hero-actions` with `.btn-primary` and `.btn-secondary`.
  - Bottom HUD: location widget `.hud-location`, collection info `.hud-collection`, scroll indicator `.hud-scroll`, pagination and controls `.hud-controls`.
  - Interactive off-canvas menu drawer `.nav-drawer` and modal `.escape-modal`.
  - Extended section `.wander-section` for smooth scroll exploration.
- [ ] **Step 2: Validate HTML structure**
  Verify all IDs, classes, ARIA attributes, and semantic tags are properly in place.

---

### Task 4: Pixel-Perfect CSS Stylesheet

**Files:**
- Create: `css/styles.css`

**Interfaces:**
- Consumes: `css/tokens.css`, `assets/images/background-clean.webp`
- Produces: Full layout and styling for desktop, tablet, and mobile.

- [ ] **Step 1: Write layout and positioning rules in `css/styles.css`**
  Implement exact CSS flexbox and grid layouts, matching measurements from `ui_inner.png`:
  - Header height, padding (36px 48px), logo sizing (~34px).
  - Hero center placement, title font size (~86px), line-height (1.05), letter-spacing (-0.02em).
  - Button paddings, pill border-radius (9999px), hover effects (subtle lift, glow, underline animation).
  - Bottom HUD positioning: fixed/absolute at bottom with 40px padding, exact vertical divider height (32px), typography.
  - Halftone / film grain texture overlay.
- [ ] **Step 2: Implement Mockup Frame & Fullscreen Mode switcher styles**
  Style the outer canvas (`#FDEED6`) and inner card with subtle shadow and border radius for 1:1 replica mode, with toggle transition.
- [ ] **Step 3: Responsive styling**
  Add media queries for `@media (max-width: 1200px)`, `@media (max-width: 768px)`, and `@media (max-width: 480px)` ensuring mobile readability and touch targets.

---

### Task 5: Interactive JavaScript Features

**Files:**
- Create: `js/app.js`

**Interfaces:**
- Consumes: DOM elements in `index.html`
- Produces: Carousel slide transitions, menu drawer toggle, modal management, view toggle, and soundscape/audio toggle.

- [ ] **Step 1: Implement Carousel logic**
  Handle `<` and `>` clicks to cycle through 4 curated destinations (Switzerland, Norway, Japan, Dolomites), updating coordinates, collection name, counter (`01 / 04`), and subtle background transition.
- [ ] **Step 2: Implement Navigation Drawer & Modal**
  Toggle mobile/desktop drawer on hamburger click, handle Escape key, focus trapping, and modal dialog for "Plan Your Escape".
- [ ] **Step 3: Implement Scroll to Wander and View Toggle**
  Smooth scroll on `SCROLL TO WANDER ↓` click, and toggle between Mockup Mode (1600x1200 preview) and Fullscreen Mode.

---

### Task 6: Visual Comparison, Chrome Headless Verification & Pixel Tuning

**Files:**
- Create: `scripts/verify_pixel_perfect.py`

**Interfaces:**
- Consumes: Rendered localhost URL, `Ui-reference.webp`
- Produces: Difference heatmap, SSIM score, side-by-side comparison image.

- [ ] **Step 1: Write verification script `scripts/verify_pixel_perfect.py`**
  Start local HTTP server, take screenshot with Google Chrome Headless at 1600x1200, compute difference against `Ui-reference.webp`, and output similarity score.
- [ ] **Step 2: Run verification script and inspect difference**
  Run: `python scripts/verify_pixel_perfect.py`
  Analyze mismatch areas (font size, position offsets, colors).
- [ ] **Step 3: Fine-tune CSS until pixel-perfect match is achieved**
  Adjust coordinates, padding, letter-spacing, and font properties until difference is minimized and visual match is flawless.
- [ ] **Step 4: Final verification across viewports**
  Test at 1600x1200, 1440x900, 768px, and 375px. Verify all interactions (carousel, drawer, modal, scroll).
