# KC Enterprises — Demo E-Commerce Storefront

A bold, black-and-white, Nike-inspired demo storefront for **KC Enterprises**
(shoes + clothing, Men & Women). Pure HTML/CSS/JS — no build step, no backend.
Deploy straight to **Vercel** (free) by pushing this repo to GitHub and
importing it as a project, or to GitHub Pages.

## Structure
```
kc-enterprises/
├── index.html          Home page (hero, categories, featured, drop countdown)
├── shop.html            Full catalog with Men/Women + Shoes/Clothing filters
├── product.html         Product detail page (sizes, size guide, description)
├── cart.html             Shopping bag
├── checkout.html         Checkout: address, coupons, payment methods
├── account.html          Login (email/contact), order history, activity log
├── help-centre.html      Help Centre with topic cards + FAQs
├── about.html / contact.html
└── assets/
    ├── styles.css        All styles, design tokens in :root
    ├── products.js       Product catalog + size charts (EDIT THIS to add products)
    ├── cart.js            Cart, coupons, account, WhatsApp-alert logic
    ├── main.js            Page interactivity (nav, countdown, FAQs, forms)
    └── favicon.svg
```

## Deploying for free on Vercel
1. Create a new GitHub repo and push everything in this folder to it.
2. Go to vercel.com → New Project → Import your GitHub repo.
3. Framework preset: **Other** (static site). Build command: none. Output
   directory: leave as project root (`.`).
4. Deploy. Vercel gives you a free `*.vercel.app` domain immediately; you can
   later attach a custom domain in Project Settings → Domains.

## Editing products
Open `assets/products.js` and edit the `PRODUCTS` array. Every product needs
an `id`, `name`, `gender` (`men`/`women`), `category` (`shoes`/`clothing`),
`price` and `mrp` in INR (plain numbers, no commas), `sizes`, `colour`, `sku`,
`description`, and `bullets`. New products automatically show up on the Shop
page, homepage (if `featured: true`) and have a working product page.

## Next drop date
Edit `data-drop-date="2026-08-15T09:00:00+05:30"` on the `#dropCountdown`
element in `index.html` to change the countdown target.

## Coupons
Edit the `COUPONS` object at the top of `assets/cart.js`:
```js
var COUPONS = {
  "FIRST5": { code: "FIRST5", percent: 5, label: "First Purchase — 5% off" },
  ...
};
```

## What's real vs. demo here — IMPORTANT
This is a **front-end only** storefront. There is no server, no database, and
no payment gateway wired in. Specifically:

- **Cart, account, order history, coupons** — stored in the browser's
  `localStorage`. They persist per-browser/per-device only; they are not
  synced across devices and are wiped if the user clears site data.
- **Login** — a name + email/phone form that creates a local "session" with
  no password, OTP or verification. It is good enough to demo "account
  creation" and "order history" but is NOT secure authentication. For real
  accounts, use Firebase Auth, Auth0, Clerk, or your own backend + database.
- **Payments (UPI / Card / Net Banking / COD)** — the checkout page collects
  the choice and shows a success state, but **no money is actually
  processed** — there is no payment gateway integration. To accept real
  payments in India, integrate **Razorpay** or **Cashfree** (UPI, cards, net
  banking) via their JS SDK + a small serverless function to create orders
  and verify signatures. Vercel Serverless Functions work well for this.
- **WhatsApp alerts — cannot be made fully automatic on a static site.**
  A static frontend (GitHub Pages / Vercel static hosting) has no way to call
  Meta's WhatsApp Business Cloud API directly and securely — that requires a
  backend holding a private access token. What IS included:
  - Every product view / "add to bag" / order event is logged locally and
    shown on the **Account → Activity Log** section, standing in for what a
    real WhatsApp message would say.
  - A real, working **"Notify me on WhatsApp"** button that opens a
    `wa.me` deep link pre-filled with a message — this actually opens
    WhatsApp, but the user must tap "send" themselves (WhatsApp does not
    allow unsolicited automatic messages from a browser without a verified
    Business API + user opt-in).
  - To make it fully automatic: stand up a Vercel Serverless Function,
    have the front-end POST view/cart events to it, and have that function
    call the WhatsApp Cloud API with your access token. Example sketch:
    ```js
    // /api/notify.js (Vercel serverless function)
    export default async function handler(req, res) {
      const { phone, message } = req.body;
      await fetch(`https://graph.facebook.com/v19.0/${process.env.WA_PHONE_ID}/messages`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.WA_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: phone,
          type: 'text',
          text: { body: message }
        })
      });
      res.status(200).json({ ok: true });
    }
    ```
    You'd need a Meta Developer account, a WhatsApp Business Account, a
    verified phone number, and the recipient's explicit opt-in.

## Things you should still customise before going fully live
- Replace placeholder product photography (currently simple line-art icons)
  with real photos.
- Replace placeholder phone/address/social links in the footer and Contact
  page.
- Set `WHATSAPP_BUSINESS_NUMBER` in `assets/cart.js` to your real number.
- Decide on and integrate a real payment gateway (Razorpay recommended for
  India: supports UPI, cards, net banking, wallets).
- Add real backend + database if you want orders/accounts to persist across
  devices and browsers.
