# MITU — Maison de Haute Couture

A luxury fashion e-commerce booking system built with **React** and **Vite**.

Browse curated collections, add items to your shopping bag, and book a private styling session at our boutiques.

## ✦ Features

- **Curated Homepage** — Hero slider, editorial grids, and category quick links
- **Product Catalogue** — Browse by category with search and quick-view modals
- **Product Detail** — Image zoom, variant selector, "Complete The Look" recommendations
- **Shopping Bag** — Slide-out cart drawer + full cart page with quantity controls
- **Cart Persistence** — Cart items saved to `localStorage` (survive page refresh)
- **Boutique Reservation** — Multi-step booking flow: select boutique → stylist & time → confirm
- **Toast Notifications** — Glassmorphism feedback for all actions
- **Responsive Design** — Adaptive grids from mobile (2-col) to desktop (5-col)

## ✦ Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 |
| Bundler | Vite 6 |
| Styling | Vanilla CSS + CSS Variables |
| State | React Context API |
| Typography | Playfair Display + Lato (Google Fonts) |
| Images | Unsplash CDN |

## ✦ Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## ✦ Project Structure

```
src/
├── App.jsx                 # Root app with SPA routing
├── main.jsx                # React DOM entry point
├── index.css               # Global CSS design system
├── components/
│   ├── NavBar.jsx           # Fixed navbar with auto-hide, search panel, menu drawer
│   ├── CartDrawer.jsx       # Slide-out shopping bag drawer
│   ├── MenuDrawer.jsx       # Full-screen navigation menu
│   ├── Footer.jsx           # Newsletter, social links, client services
│   └── ToastNotification.jsx
├── context/
│   └── AppContext.jsx       # Global state: cart, toast, bag drawer
├── data/
│   └── products.js          # Static product catalogue
├── pages/
│   ├── Home.jsx             # Hero slider, categories, editorial, CTA
│   ├── Explore.jsx          # Product grid with search + quick view
│   ├── ProductDetail.jsx    # Full product page with zoom + recommendations
│   ├── Cart.jsx             # Shopping bag page
│   └── Reserve.jsx          # Multi-step boutique appointment booking
├── utils/
│   └── format.js            # Shared price formatting utility
└── public/
    ├── favicon.svg          # MITU brand icon
    └── icons.svg            # UI icon sprite
```

## ✦ License

This is a demonstration project. All product imagery from [Unsplash](https://unsplash.com).
