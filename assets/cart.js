
/* ==========================================================================
KC ENTERPRISES — cart / account / whatsapp-alert engine
Pure front-end demo using localStorage. No backend, no real payment
gateway, no real WhatsApp API — see README for what to wire up for
production. This file must load AFTER assets/products.js on every page.
========================================================================== */

var CART_KEY   = "kc-cart-v1";
var USER_KEY   = "kc-user-v1";
var ORDERS_KEY = "kc-orders-v1";
var WA_LOG_KEY = "kc-wa-log-v1";

/* ---------------------------------------------------------------------
Cart helpers — cart is an array of { id, size, qty }
--------------------------------------------------------------------- */
function getCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
  catch (e) { return []; }
}
function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  refreshBagCount();
}
function addToCart(productId, size, qty) {
  qty = qty || 1;
  var cart = getCart();
  var line = cart.find(function (l) { return l.id === productId && l.size === size; });
  if (line) { line.qty += qty; } else { cart.push({ id: productId, size: size, qty: qty }); }
  saveCart(cart);
  var product = getProductById(productId);
  if (product) sendWhatsAppAlert("added_to_bag", product, size);
}
function removeFromCart(productId, size) {
  var cart = getCart().filter(function (l) { return !(l.id === productId && l.size === size); });
  saveCart(cart);
}
function setQty(productId, size, qty) {
  var cart = getCart();
  var line = cart.find(function (l) { return l.id === productId && l.size === size; });
  if (line) {
    line.qty = Math.max(1, qty);
    saveCart(cart);
  }
}
function getCartLines() {
  return getCart().map(function (l) {
    var p = getProductById(l.id);
    return p ? Object.assign({}, p, { size: l.size, qty: l.qty }) : null;
  }).filter(Boolean);
}
function getCartTotals() {
  var lines = getCartLines();
  var subtotal = lines.reduce(function (sum, l) { return sum + l.price * l.qty; }, 0);
  var mrpTotal = lines.reduce(function (sum, l) { return sum + (l.mrp || l.price) * l.qty; }, 0);
  var discount = Math.max(0, mrpTotal - subtotal);
  var coupon = getAppliedCoupon();
  var couponDiscount = 0;
  if (coupon) couponDiscount = Math.round(subtotal * coupon.percent / 100);
  var shipping = subtotal > 0 && subtotal < 2999 ? 99 : 0;
  var total = Math.max(0, subtotal - couponDiscount + shipping);
  return { lines: lines, subtotal: subtotal, discount: discount, couponDiscount: couponDiscount, shipping: shipping, total: total, coupon: coupon };
}
function refreshBagCount() {
  var n = getCart().reduce(function (sum, l) { return sum + l.qty; }, 0);
  document.querySelectorAll(".bag-count").forEach(function (el) { el.textContent = String(n); });
}

/* ---------------------------------------------------------------------
Coupons — demo set. Add more here.
--------------------------------------------------------------------- */
var COUPONS = {
  "FIRST5":  { code: "FIRST5",  percent: 5,  label: "First Purchase — 5% off" },
  "KC10":    { code: "KC10",    percent: 10, label: "KC10 — 10% off orders above ₹3,000", minSubtotal: 3000 },
  "WELCOME15": { code: "WELCOME15", percent: 15, label: "Welcome15 — 15% off (new accounts)", minSubtotal: 5000 }
};
var COUPON_KEY = "kc-coupon-v1";
function getAppliedCoupon() {
  try { return JSON.parse(localStorage.getItem(COUPON_KEY)) || null; }
  catch (e) { return null; }
}
function applyCoupon(code) {
  var c = COUPONS[String(code).toUpperCase()];
  if (!c) return { ok: false, message: "Invalid coupon code." };
  var totals = getCartTotals();
  if (c.minSubtotal && totals.subtotal < c.minSubtotal) {
    return { ok: false, message: "Add " + formatINR(c.minSubtotal) + " or more to use this code." };
  }
  localStorage.setItem(COUPON_KEY, JSON.stringify(c));
  return { ok: true, message: c.label + " applied." };
}
function removeCoupon() { localStorage.removeItem(COUPON_KEY); }

/* ---------------------------------------------------------------------
Account — demo email/contact based "auth" (no real password backend).
Stored entirely in the browser. Swap for Firebase Auth / Auth0 / your
own API + database for production use.
--------------------------------------------------------------------- */
function getUser() {
  try { return JSON.parse(localStorage.getItem(USER_KEY)) || null; }
  catch (e) { return null; }
}
function loginUser(name, contact) {
  var user = { name: name, contact: contact, since: new Date().toISOString() };
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  return user;
}
function logoutUser() { localStorage.removeItem(USER_KEY); }

function getOrders() {
  try { return JSON.parse(localStorage.getItem(ORDERS_KEY)) || []; }
  catch (e) { return []; }
}
function placeOrder(paymentMethod) {
  var totals = getCartTotals();
  if (!totals.lines.length) return null;
  var order = {
    id: "KC" + Date.now().toString().slice(-8),
    date: new Date().toISOString(),
    lines: totals.lines,
    subtotal: totals.subtotal,
    couponDiscount: totals.couponDiscount,
    shipping: totals.shipping,
    total: totals.total,
    coupon: totals.coupon ? totals.coupon.code : null,
    paymentMethod: paymentMethod,
    status: paymentMethod === "cod" ? "Confirmed — Pay on Delivery" : "Confirmed — Paid"
  };
  var orders = getOrders();
  orders.unshift(order);
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  saveCart([]);
  removeCoupon();
  sendWhatsAppAlert("order_placed", null, null, order);
  return order;
}

/* ---------------------------------------------------------------------
WhatsApp alerts — DEMO ONLY.
True automated WhatsApp messages require a server-side integration with
the WhatsApp Business / Cloud API (or a provider like Twilio, Gupshup,
Interakt) plus the customer's verified opt-in number. A static GitHub
Pages / Vercel front-end CANNOT send WhatsApp messages on its own —
there is no backend here to call Meta's API from, and doing so would
expose your API secret in the browser.

What this demo does instead:
1. Logs every "view" / "add to bag" / "order placed" event to
   localStorage (see WA_LOG_KEY) — visible on the Account page under
   "Activity Log", standing in for what would be sent to WhatsApp.
2. Offers a real "Notify me on WhatsApp" button that opens a
   pre-filled wa.me chat link — this DOES work today, but the user has
   to tap send themselves; it is not automatic.

To make alerts fully automatic in production:
- Stand up a small backend (Vercel Serverless Function / Node API).
- On product view / add-to-bag / order events, POST to that function.
- That function calls the WhatsApp Cloud API with your access token.
See README.md "WhatsApp automation" section for a code sketch.
--------------------------------------------------------------------- */
var WHATSAPP_BUSINESS_NUMBER = "919999999999"; // <-- replace with your number, no + or spaces

function getWaLog() {
  try { return JSON.parse(localStorage.getItem(WA_LOG_KEY)) || []; }
  catch (e) { return []; }
}
function sendWhatsAppAlert(type, product, size, order) {
  var log = getWaLog();
  var entry = { type: type, time: new Date().toISOString() };
  if (product) entry.product = product.name;
  if (size) entry.size = size;
  if (order) entry.orderId = order.id;
  log.unshift(entry);
  localStorage.setItem(WA_LOG_KEY, JSON.stringify(log.slice(0, 50)));
}
function buildWaLink(message) {
  return "https://wa.me/" + WHATSAPP_BUSINESS_NUMBER + "?text=" + encodeURIComponent(message);
}

/* ---------------------------------------------------------------------
Boot: keep bag count in sync on every page load
--------------------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", refreshBagCount);
