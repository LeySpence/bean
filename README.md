# Bean Boutique Coffee Shop

A premium, utilitarian minimalist frontend for an artisanal coffee shop brand — pure CSS, no framework dependencies.

## Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `index.html` | Split-screen hero, bento highlights, featured grid, testimonials |
| Coffee | `coffee.html` | Product catalogue with search/filter, 3-column product grid |
| Equipment | `equipment.html` | Brewing equipment catalogue, brewing tips |
| Events | `events.html` | Upcoming workshops and tasting events |
| Offers | `offers.html` | Promotions and subscription plans |
| Cart | `cart.html` | Shopping cart with localStorage persistence |

## Design System

- **Protocol:** Premium Utilitarian Minimalism
- **Canvas:** `#F7F6F3` warm bone
- **Text:** `#111111` off-black
- **Borders:** `#EAEAEA` ultra-light
- **Accent:** `#111111` (CTAs), pastel spot colors (tags/badges)
- **Fonts:** Switzer (body), Playfair Display (headings), JetBrains Mono (code/keystrokes)
- **Icons:** Phosphor Icons Bold weight
- **Shadows:** Ultra-diffuse, opacity ≤ 0.04
- **Motion:** Scroll-reveal via IntersectionObserver, ambient background blob, reduced-motion respected

Full design tokens documented in `docs/DESIGN.md`.

## Structure

```
├── index.html
├── coffee.html
├── equipment.html
├── events.html
├── offers.html
├── cart.html
├── css/
│   └── style.css          — Single stylesheet (~2600 lines)
├── js/
│   ├── main.js            — Nav, scroll-reveal, ambient blob, cart count
│   ├── cart.js            — Cart CRUD with localStorage
│   ├── slideshow.js       — Hero slideshow
│   ├── modal.js           — First-visit discount modal
│   └── forms.js           — Form validation
├── images/
│   ├── hero/              — Hero slideshow images
│   ├── slideshow/         — Featured section images
│   ├── placeholder/       — Placeholder assets
│   └── icons/             — Logo SVG
├── docs/
│   └── DESIGN.md          — Stitch-format design system
└── .agents/
    └── skills/            — Design skill protocols
```

## Running

No build step. Open any `.html` file in a browser. The cart uses `localStorage` — data persists across pages.

## Design Constraints

- No Tailwind, no CSS frameworks — pure custom CSS
- No emojis, no Inter/Roboto/Open Sans, no pure black (`#000000`)
- No neon glows, no gradients on headers, no 3-column equal card rows
- Light mode only
- Skeleton loaders for async content states
# bean
