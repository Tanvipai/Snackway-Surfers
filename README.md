# Snackway Surfers

A Subway Surfers themed online grocery store. 

The idea was simple: what if buying groceries looked like a Subway Surfers menu? Animated buttons, floating characters, the whole aesthetic. Turns out it's a lot more fun to shop for broccoli when there's a graffiti wall involved.

---

## What's inside

You sign up, pick your Subway Surfers character, and get dropped into a home screen that looks straight out of the game. From there you can browse products by category, add things to your cart, go through a checkout flow, and manage your profile. There's also a wishlist, an about page, and a graffiti wall where you can just draw stuff.

Everything runs on localStorage — no backend, no database. Users, cart, orders, wishlist — all of it lives in the browser.

## Pages

| Route | What it is |
|---|---|
| `/login` | Sign up or log in, pick your character |
| `/home` | Main hub — animated, game-style navigation |
| `/shop` | All products, filterable by category |
| `/aisles` | Category browsing |
| `/product/:id` | Product detail page |
| `/cart` | Cart with quantity controls and order summary |
| `/checkout` | Address + payment, submits the order |
| `/order-confirmation` | Post-checkout screen |
| `/profile` | Character display, change username/password |
| `/wishlist` | Saved products |
| `/about` | About the creators |

## Stack

- React 19 + React Router v7
- No UI libraries — all styling is inline or injected CSS
- Firebase is installed but not wired up yet (auth and persistence are localStorage for now)

## Running it locally

```bash
npm install
npm start
```

Opens at `http://localhost:3000`. That's it.

---

