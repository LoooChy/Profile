# Design System: Editorial Precision & Modern Architecture

## 1. Overview & Creative North Star
The Creative North Star for this system is **"The Digital Curator."** 

This design system rejects the "template" look of modern SaaS in favor of a high-end, editorial experience. It is inspired by the intentionality of a physical gallery and the structural integrity of minimalist architecture. We achieve this by breaking the rigid, centered grid in favor of **intentional asymmetry**. 

Layouts should feel "constructed" rather than "poured." By using overlapping elements, dramatic typographic scales, and normal negative space, we create a sense of depth that feels curated, professional, and technologically advanced. This is not just an interface; it is a digital monograph.

---

## 2. Colors & Surface Philosophy
The palette is a sophisticated, low-saturation dark mode centered on `#121221` (Surface). It uses a refined gold (`#F8C100`) as a high-precision accent.

### The "No-Line" Rule
To maintain a premium, architectural feel, **1px solid borders are strictly prohibited for sectioning.** Boundaries must be defined through:
*   **Background Shifts:** Transitioning from `surface` to `surface-container-low`.
*   **Tonal Transitions:** Using subtle shifts in the neutral scale to imply a change in content without the "boxiness" of traditional lines.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers—like stacked sheets of heavy cardstock or matte glass. 
*   **Base:** `surface` (#121221)
*   **Sub-sections:** `surface-container-low` (#1a1a2a)
*   **Interactive Cards:** `surface-container` (#1e1e2e)
*   **Floating/Elevated Elements:** `surface-container-highest` (#333344)

### The "Glass & Gradient" Rule
For floating menus or high-end overlays, use **Glassmorphism**. Apply a semi-transparent `surface-variant` with a 20px-40px backdrop blur. 
*   **Signature Textures:** Main CTAs or Hero backgrounds should use a subtle linear gradient from `primary` (#ffe29f) to `primary_container` (#f8c100) at a 135-degree angle to provide a "lit from within" glow.

---

## 3. Typography
The system uses a high-contrast pairing: **Newsreader** (an authoritative, sharp serif) and **Manrope** (a technical, human-centric sans-serif).

*   **Display (Newsreader):** Used for "The Big Idea." These should be set with tight letter-spacing (-0.02em) and massive scale (`display-lg`: 3.5rem).
*   **Headlines (Newsreader):** Used for section starts. They provide the "editorial" anchor for the page.
*   **Body (Manrope):** Set in `body-lg` (1rem) for readability. Manrope’s geometric yet warm structure balances the traditional feel of the serif headings.
*   **Labels (Manrope):** Use all-caps with generous letter-spacing (+0.1em) for a "technical blueprint" aesthetic.

The hierarchy is designed to guide the eye like a magazine layout: large, expressive entry points followed by clean, digestible technical data.

---

## 4. Elevation & Depth
We move away from traditional drop shadows in favor of **Tonal Layering**.

*   **The Layering Principle:** Depth is achieved by "stacking." A `surface-container-lowest` card placed on a `surface-container-low` section creates a natural, soft lift.
*   **Ambient Shadows:** If a floating element (like a modal) requires a shadow, use a large blur (40px-60px) at 6% opacity. The shadow color must be a tinted version of the background (#000000 is forbidden; use a deep indigo-tinted shadow).
*   **The "Ghost Border" Fallback:** If a border is required for accessibility, use `outline-variant` (#4f4632) at **20% opacity**. It should be felt, not seen.
*   **Asymmetrical Overlaps:** To create a "Modern Architecture" feel, allow images to overlap container edges by 10-15%. This breaks the "boxed-in" feeling of standard web grids.

---

## 5. Components

### Buttons
*   **Primary:** Gradient fill (`primary` to `primary-container`), black text (`on-primary`), `md` roundedness (0.375rem). No border.
*   **Secondary:** Ghost style. `outline` border at 20% opacity. On hover, background shifts to `surface-bright`.
*   **Tertiary:** Manrope `label-md` bold, all-caps, with a 2px underline in `primary_container` offset by 4px.

### Cards & Lists
*   **Rule:** No divider lines. Use `normal` spacing units to separate list items or subtle background shifts (`surface-container-low`).
*   **Images:** All images within cards must have a subtle `0.5rem` (lg) corner radius and a 10% black inner-glow to ground them.

### Input Fields
*   **Style:** Minimalist underline style. The label (`label-sm`) sits above the input. The input area is a `surface-container-lowest` block.
*   **States:** On focus, the bottom border animates from `outline-variant` to a solid `primary` glow.

### Signature Component: The "Editorial Quote"
A large-scale component using `display-md` serif text, centered with 20% of the screen width as horizontal padding, flanked by asymmetrical vertical lines (Ghost Borders) to ground the text in the layout.

---

## 6. Do's and Don'ts

### Do:
*   **Embrace Negative Space:** If a section feels crowded, use `spacious` padding using the `24` (8.5rem) spacing token.
*   **Use Asymmetry:** Offset text columns from image columns. An 8-column text block paired with a 4-column empty space creates an "Editorial" feel.
*   **Micro-Interactions:** Use slow, ease-in-out transitions (400ms+) for hover states to mimic the "deliberate" feel of a high-end brand.

### Don't:
*   **Don't use 100% Black:** Always use the deep indigo-navy `surface` (#121221) to keep the "Modern Minimalist" warmth.
*   **Don't use Center-Align for Everything:** Editorial design lives in the tension between left-aligned text and right-aligned imagery.
*   **Don't use Default Shadows:** Avoid "muddy" grey shadows. If it's not a soft, ambient tint, don't use it.
*   **Don't use standard icons:** Use ultra-thin (1pt) stroke icons to match the architectural aesthetic.