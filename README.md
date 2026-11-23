# elsewhere. — A Different Kind of Getaway

An ultra-luxury architectural sanctuary and alpine expedition website crafted with pixel-level precision, risograph/editorial aesthetics, and distinct interactive experiences across every page.

---

## 🏔️ Pages & Architecture

1. **Home / Hero Landing (`index.html`)**
   - High-fidelity recreation of the Swiss Alpine solitude hero UI with dual display modes:
     - **Mockup Frame Mode:** Precision perspective window with risograph stipple grain, drop-shadow, and responsive scaling.
     - **Full-Bleed Fullscreen Mode:** Seamless full-viewport immersion with toggle shortcuts (`F` for fullscreen, `M` for mockup).
   - Interactive destination carousel (Switzerland, Norway, Hokkaido, Italy).
   - Off-canvas editorial destination drawer & private escape booking modal dialog.

2. **Places & Sanctuaries (`places.html`)**
   - Curated architectural directory of remote sanctuaries across the Swiss Alps, Norwegian Fjords, Hokkaido, and Dolomites.
   - Live category filter system (Alpine, Fjords, Volcanic, Dolomites).

3. **Journeys & Traverses (`journeys.html`)**
   - **Expedition Dossier & Route Waypoint Timeline** layout.
   - Interactive route switcher (*The Haute Route*, *Bernina Glacier Traverse*, *Valais High Passes*, *Engadin Solitary Circuit*).
   - Live metrics strip (duration, elevation ascent, transit modes, party size) and day-by-day waypoint itinerary.

4. **Experiences (`experiences.html`)**
   - **The Elemental Sensory Spectrum** layout.
   - 4 cinematic stacked horizontal bands: *I. Thermal & Water*, *II. Rock & Altitude*, *III. Hearth & Fire*, *IV. Snow & Silence*.
   - Technical sensory gauges (water temperature, sound floor, Bortle class, thermal contrast).
   - Interactive ritual selector with a floating bottom tray and live selection counter.

5. **Journal (`journal.html`)**
   - **Print Editorial Magazine & Visual Chronicle (*The Elsewhere Review, Issue VII*)**.
   - Publication masthead with St. Moritz & Oslo provenance.
   - Asymmetric two-column print spread featuring cover essay *"The Architecture of Disappearance"*, large drop-cap typography, and pull-quote.
   - Hasselblad 500C/M & Kodak Tri-X 400 silver gelatin film strip with authentic EXIF metadata.
   - Annual linen-bound collector's compendium reserve card.

---

## 🎨 Design System & Typography

- **Headings & Display:** `Fraunces` variable optical serif (italics, soft curvature, editorial warmth).
- **Interface & Metrics:** `Plus Jakarta Sans` & `Inter` clean Swiss geometric grotesk.
- **Color Palette:**
  - Base Deep Navy: `#050B14`, `#070F1C`
  - Card Surfaces: `#09121E`, `rgba(14, 23, 36, 0.65)`
  - Alpine Cream / Accent: `#FEEFD9`, `#F5E8D3`
  - Soft Gold Highlight: `#E2C082`

---

## 🚀 Running Locally

No build tools or heavy dependencies required. Just open in any modern browser:

```bash
# Using Python built-in static server
python -m http.server 8080

# Or using Node.js / npx serve
npx serve .
```

Open `http://localhost:8080` in your browser.
