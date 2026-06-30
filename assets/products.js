
/* ==========================================================================
KC ENTERPRISES — product catalog (demo / placeholder data)
Edit this array to add, remove, or change products. Every product needs:
id, name, brand, gender ("men"/"women"), category ("shoes"/"clothing"),
price (INR, integer), mrp (INR, optional — for showing a discount strike),
sizes (array of strings), colour, sku, description, bullets (array),
image (emoji/icon key used by the placeholder figure), isNew, featured.
========================================================================== */

const PRODUCTS = [
  {
    id: "kc-1001",
    name: "Air-Core Runner",
    brand: "KC Enterprises",
    gender: "men",
    category: "shoes",
    price: 8495,
    mrp: 9999,
    sizes: ["UK 6","UK 7","UK 8","UK 9","UK 10","UK 11"],
    colour: "White / Volt",
    sku: "KC-1042",
    isNew: true,
    featured: true,
    order: 1,
    description: "Built for the days you don't sit still. A responsive foam midsole and breathable knit upper make the Air-Core Runner equally at home on a 10K or a Tuesday commute.",
    bullets: [
      "Responsive foam midsole absorbs impact and returns energy",
      "Breathable engineered knit upper keeps feet cool",
      "Rubber outsole with multi-directional traction pods",
      "Reflective heel tab for low-light visibility"
    ]
  },
  {
    id: "kc-1002",
    name: "Skyline Trainer",
    brand: "KC Enterprises",
    gender: "men",
    category: "shoes",
    price: 7295,
    mrp: 7999,
    sizes: ["UK 6","UK 7","UK 8","UK 9","UK 10"],
    colour: "Black / White",
    sku: "KC-1043",
    isNew: false,
    featured: true,
    order: 2,
    description: "A street-ready trainer with a low-profile silhouette and a durable rubber cupsole built to take a beating.",
    bullets: [
      "Premium synthetic leather upper",
      "Cupsole construction for durability",
      "Padded collar for all-day comfort",
      "Classic two-tone colourway"
    ]
  },
  {
    id: "kc-1003",
    name: "Vapor Slide",
    brand: "KC Enterprises",
    gender: "men",
    category: "shoes",
    price: 2495,
    mrp: 2495,
    sizes: ["UK 7","UK 8","UK 9","UK 10","UK 11"],
    colour: "Brown",
    sku: "KC-1044",
    isNew: false,
    featured: false,
    order: 3,
    description: "Recovery footwear made from soft, responsive foam — the slide you reach for after every session.",
    bullets: [
      "Soft responsive foam upper and footbed",
      "Sticky rubber outsole for grip on wet surfaces",
      "Lightweight, easy to pack",
      "Wide forefoot fit for natural toe splay"
    ]
  },
  {
    id: "kc-2001",
    name: "Flux Hoodie",
    brand: "KC Enterprises",
    gender: "men",
    category: "clothing",
    price: 3295,
    mrp: 3995,
    sizes: ["S","M","L","XL","XXL"],
    colour: "Black",
    sku: "KC-2042",
    isNew: true,
    featured: true,
    order: 4,
    description: "A heavyweight fleece hoodie cut for movement, with a brushed interior that holds its warmth wash after wash.",
    bullets: [
      "320 GSM brushed-back fleece",
      "Ribbed cuffs and hem lock in warmth",
      "Kangaroo pocket for hands or essentials",
      "Pre-shrunk to hold its shape"
    ]
  },
  {
    id: "kc-2002",
    name: "Momentum Tee",
    brand: "KC Enterprises",
    gender: "men",
    category: "clothing",
    price: 1295,
    mrp: 1495,
    sizes: ["S","M","L","XL"],
    colour: "White",
    sku: "KC-2043",
    isNew: false,
    featured: true,
    order: 5,
    description: "A breathable training tee with moisture-wicking fabric that keeps you dry through the toughest sessions.",
    bullets: [
      "Moisture-wicking performance fabric",
      "Tagless neck label for chafe-free comfort",
      "Regular athletic fit",
      "Reinforced shoulder seams"
    ]
  },
  {
    id: "kc-2003",
    name: "Ascent Joggers",
    brand: "KC Enterprises",
    gender: "men",
    category: "clothing",
    price: 2895,
    mrp: 3495,
    sizes: ["S","M","L","XL","XXL"],
    colour: "Charcoal",
    sku: "KC-2044",
    isNew: false,
    featured: false,
    order: 6,
    description: "Tapered joggers with a soft brushed interior and a secure zip pocket for your phone and keys.",
    bullets: [
      "Tapered fit with elastic cuffs",
      "Brushed interior fleece",
      "Zippered side pocket",
      "Drawcord adjustable waist"
    ]
  },
  {
    id: "kc-3001",
    name: "Pulse Trainer W",
    brand: "KC Enterprises",
    gender: "women",
    category: "shoes",
    price: 7995,
    mrp: 8995,
    sizes: ["UK 3","UK 4","UK 5","UK 6","UK 7","UK 8"],
    colour: "White / Pink",
    sku: "KC-3042",
    isNew: true,
    featured: true,
    order: 7,
    description: "Lightweight cushioning meets a sleek silhouette, designed for everything from studio sessions to street style.",
    bullets: [
      "Lightweight foam cushioning",
      "Breathable mesh upper",
      "Flexible outsole for natural movement",
      "Padded ankle collar"
    ]
  },
  {
    id: "kc-3002",
    name: "Glide Runner W",
    brand: "KC Enterprises",
    gender: "women",
    category: "shoes",
    price: 8195,
    mrp: 8195,
    sizes: ["UK 3","UK 4","UK 5","UK 6","UK 7"],
    colour: "Black / Volt",
    sku: "KC-3043",
    isNew: false,
    featured: true,
    order: 8,
    description: "Engineered for distance. The Glide Runner W keeps you light on your feet across every mile.",
    bullets: [
      "Engineered mesh upper for breathability",
      "Energy-return foam midsole",
      "Durable rubber outsole",
      "Reflective detailing"
    ]
  },
  {
    id: "kc-3003",
    name: "Studio Slide W",
    brand: "KC Enterprises",
    gender: "women",
    category: "shoes",
    price: 2295,
    mrp: 2295,
    sizes: ["UK 3","UK 4","UK 5","UK 6","UK 7"],
    colour: "Sand",
    sku: "KC-3044",
    isNew: false,
    featured: false,
    order: 9,
    description: "Soft, recovery-ready slides built to cradle tired feet after a long day on the move.",
    bullets: [
      "Soft EVA footbed",
      "Water-friendly construction",
      "Sticky rubber outsole",
      "Lightweight and packable"
    ]
  },
  {
    id: "kc-4001",
    name: "Flux Hoodie W",
    brand: "KC Enterprises",
    gender: "women",
    category: "clothing",
    price: 3195,
    mrp: 3795,
    sizes: ["XS","S","M","L","XL"],
    colour: "Sage",
    sku: "KC-4042",
    isNew: true,
    featured: true,
    order: 10,
    description: "A cropped, heavyweight fleece hoodie with a relaxed fit and a brushed interior for everyday warmth.",
    bullets: [
      "320 GSM brushed-back fleece",
      "Cropped, relaxed fit",
      "Ribbed cuffs and hem",
      "Dropped shoulder seams"
    ]
  },
  {
    id: "kc-4002",
    name: "Momentum Tee W",
    brand: "KC Enterprises",
    gender: "women",
    category: "clothing",
    price: 1195,
    mrp: 1395,
    sizes: ["XS","S","M","L","XL"],
    colour: "Black",
    sku: "KC-4043",
    isNew: false,
    featured: true,
    order: 11,
    description: "A fitted training tee in breathable, moisture-wicking fabric designed to move with you.",
    bullets: [
      "Moisture-wicking performance fabric",
      "Fitted athletic cut",
      "Flatlock seams reduce chafing",
      "Tagless neck label"
    ]
  },
  {
    id: "kc-4003",
    name: "Ascent Leggings",
    brand: "KC Enterprises",
    gender: "women",
    category: "clothing",
    price: 2795,
    mrp: 3295,
    sizes: ["XS","S","M","L","XL"],
    colour: "Black",
    sku: "KC-4044",
    isNew: false,
    featured: false,
    order: 12,
    description: "High-rise leggings with four-way stretch fabric and a hidden waistband pocket for your essentials.",
    bullets: [
      "High-rise, four-way stretch fabric",
      "Hidden waistband pocket",
      "Squat-proof opaque fabric",
      "Flatlock seams"
    ]
  }
];

/* SIZE CHARTS — keyed by category, in cm / UK / US */
const SIZE_CHARTS = {
  shoes: {
    title: "Shoes Size Guide",
    headers: ["UK","US (M)","US (W)","EU","Foot length (cm)"],
    rows: [
      ["UK 3","US 4","US 5.5","EU 35.5","22.0"],
      ["UK 4","US 5","US 6.5","EU 37","22.9"],
      ["UK 5","US 6","US 7.5","EU 38.5","23.8"],
      ["UK 6","US 7","US 8.5","EU 40","24.6"],
      ["UK 7","US 8","US 9.5","EU 41","25.4"],
      ["UK 8","US 9","US 10.5","EU 42.5","26.2"],
      ["UK 9","US 10","US 11.5","EU 44","27.1"],
      ["UK 10","US 11","US 12.5","EU 45","27.9"],
      ["UK 11","US 12","US 13.5","EU 46","28.7"]
    ]
  },
  clothing: {
    title: "Clothing Size Guide",
    headers: ["Size","Chest (in)","Waist (in)","Hip (in)"],
    rows: [
      ["XS","32-34","26-28","34-36"],
      ["S","35-37","29-31","37-39"],
      ["M","38-40","32-34","40-42"],
      ["L","41-43","35-37","43-45"],
      ["XL","44-46","38-40","46-48"],
      ["XXL","47-49","41-43","49-51"]
    ]
  }
};

/* Helper: format an integer as INR currency string, e.g. 8495 -> "₹8,495" */
function formatINR(amount) {
  return "₹" + Number(amount).toLocaleString("en-IN");
}

/* Helper: find a product by id */
function getProductById(id) {
  return PRODUCTS.find(function (p) { return p.id === id; });
}
