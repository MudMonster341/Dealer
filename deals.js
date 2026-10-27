// ---- EDIT HERE ---------------------------------------------------------
// Where people send tips and reports (WhatsApp number, Instagram handle or email).
const CONTACT = "your WhatsApp or Instagram here";
// Paste your WhatsApp Channel or newsletter link here to switch on the signup button.
const SIGNUP_URL = "";
// Set to true only if the list below contains made-up example deals.
const SHOWING_SAMPLES = false;
// One object per deal. "ends" is Dubai time ("2026-11-14T23:59+04:00"), or null when the source gives no end date.
// "checked" is the day the source page was last opened and read.
// type: "Delivery", "Dine-in" or "Card offer". Leave code as "" when none is needed.
const H = 3600e3;
const SRC = {
  hsbc: ["HSBC UAE dining offers", "https://www.hsbc.ae/credit-cards/i-love-dining/"],
  gn: ["Gulf News, updated 21 Oct 2026", "https://gulfnews.com/lifestyle/dubai-food-deals-you-shouldnt-miss-5-tempting-offers-from-dh49-1.500716183"],
  to: ["Time Out Dubai, Sep 2026", "https://www.timeoutdubai.com/food-drink/best-dining-deals-offers-dubai-summer-2026"],
  wo: ["What's On, week of 26 Oct 2026", "https://whatson.ae/2026/10/things-to-do-in-dubai-this-week-oct-26-to-29"],
  gb: ["GulfBuzz Halloween list", "https://www.gulfbuzz.com/dubai-halloween-dining-deals-2026/"],
  enbd: ["Emirates NBD noon One card page", "https://emiratesnbd.com/en/campaigns/noon-one-credit-card"],
  mcd: ["McDonald's UAE bundles page", "https://www.mcdonalds.com/ae/en-ae/mcdelivery-bundles.html"],
  mqpj: ["Mashreq Papa John's page", "https://mashreq.com/en/uae/campaigns/papa-johns"],
  mqbk: ["Mashreq Burger King page", "https://www.mashreq.com/en/uae/campaigns/burger-king/"]
};
const C = "2026-10-27T12:00+04:00";
const DEALS = [
  { id: "hsbc-anantara", title: "30% off food and drinks at five Anantara restaurants", place: "Bushman's, Revo Cafe, The Beach House, Crescendo, Mekong", area: "Palm Jumeirah", type: "Card offer", save: "30% off", code: "", terms: "Pay with an HSBC UAE credit card. HSBC's page doesn't say which cards qualify, so check before you go.", ends: "2026-11-14T23:59+04:00", checked: C, src: "hsbc" },
  { id: "hsbc-radisson", title: "25% off at the Radisson Blu Deira Creek restaurants", place: "Fish Market, Minato, Marbles, Boulvar", area: "Deira", type: "Card offer", save: "25% off", code: "", terms: "Pay with an HSBC UAE credit card. Wagyu Sushi and Shabestan in the same hotel give 20%.", ends: "2026-11-30T23:59+04:00", checked: C, src: "hsbc" },
  { id: "hsbc-bbq", title: "15% off at Barbecue Delights", place: "Barbecue Delights", area: "Dubai", type: "Card offer", save: "15% off", code: "", terms: "Pay with an HSBC UAE credit card. Branch not named on HSBC's page.", ends: "2026-11-14T23:59+04:00", checked: C, src: "hsbc" },
  { id: "enbd-noon", title: "20% back on noon Food, plus free noon One", place: "Emirates NBD noon One credit card", area: "All UAE", type: "Card offer", save: "20% back", code: "", terms: "Only for holders of this specific card. The bank's page lists no end date and says terms apply.", ends: null, checked: C, src: "enbd" },
  { id: "mcd-own-app", title: "Exclusive bundles only in McDonald's own app", place: "McDonald's", area: "All UAE", type: "Delivery", save: "App-only bundles", code: "", terms: "Only on the McDonald's app or McDelivery.ae. Not valid on Talabat, Deliveroo, Careem or Noon Food, or in store. Prices are shown in the app.", ends: null, checked: C, src: "mcd" },
  { id: "lavash", title: "Breakfast spread from AED 49", place: "Lavash", area: "Dubai Marina", type: "Dine-in", save: "From AED 49", code: "", terms: "Choose 9, 18 or 36 dishes. 8am to 4pm. Also at J3 Mall, Al Wasl Road.", ends: null, checked: C, src: "gn" },
  { id: "rowleys", title: "Monday power lunch: 250g steak, salad and fries", place: "Rowley's", area: "DIFC", type: "Dine-in", save: "AED 80", code: "", terms: "Mondays only, noon to 6pm.", ends: null, checked: C, src: "to" },
  { id: "hawkerboi", title: "Business lunch for AED 89", place: "Hawkerboi", area: "JLT", type: "Dine-in", save: "AED 89", code: "", terms: "Monday to Friday, noon to 3pm.", ends: null, checked: C, src: "to" },
  { id: "gusto", title: "Two-course lunch for AED 99", place: "Gusto", area: "DIFC", type: "Dine-in", save: "AED 99", code: "", terms: "Monday to Friday, noon to 2:30pm.", ends: null, checked: C, src: "to" },
  { id: "swingers", title: "Unlimited pizza with unlimited golf", place: "Swingers Dubai", area: "Bluewaters", type: "Dine-in", save: "AED 99", code: "", terms: "Thursdays, 4pm to 11pm.", ends: null, checked: C, src: "to" },
  { id: "strand", title: "Wednesday steak frites with a drink", place: "The Strand", area: "Palm Jumeirah", type: "Dine-in", save: "AED 99", code: "", terms: "Wednesdays, 6pm to 11pm. AED 385 for two with a bottle.", ends: null, checked: C, src: "to" },
  { id: "misslilys", title: "Tuesday steak and unlimited fries", place: "Miss Lily's, Sheraton Grand", area: "Sheikh Zayed Road", type: "Dine-in", save: "AED 120", code: "", terms: "Tuesdays. 200g striploin with salad and unlimited fries. Half jerk chicken version is AED 90.", ends: null, checked: C, src: "wo" },
  { id: "ana", title: "Five-course Emirati menu on Wednesdays", place: "ANA, The Dubai Mall", area: "Downtown", type: "Dine-in", save: "AED 169", code: "", terms: "Wednesdays, noon to midnight.", ends: null, checked: C, src: "gn" },
  { id: "reform-hw", title: "Halloween breakfast brunch with a magic show", place: "Reform Social & Grill", area: "The Lakes", type: "Dine-in", save: "AED 125", code: "", terms: "One day only, from 8am. Children AED 99.", ends: "2026-10-31T12:00+04:00", checked: C, src: "gb" },
  { id: "hillhouse-hw", title: "Halloween family menu", place: "Hillhouse Brasserie", area: "Dubai Hills", type: "Dine-in", save: "AED 150", code: "", terms: "One day only, 1pm to 4pm. Children AED 125.", ends: "2026-10-31T16:00+04:00", checked: C, src: "gb" },
  { id: "claw-hw", title: "Halloween brunch and after-party", place: "CLAW BBQ, Hilton Palm Jumeirah", area: "Palm Jumeirah", type: "Dine-in", save: "From AED 199", code: "", terms: "One day only, from 12:30pm. Packages AED 199 to 399.", ends: "2026-10-31T23:59+04:00", checked: C, src: "gb" },
  { id: "mq-papajohns", title: "6\" pizza and wedges for AED 1 (Mashreq cards)", place: "Papa John's", area: "All UAE", type: "Card offer", save: "AED 1", code: "", terms: "This page is still online, but the offer was for one day only.", ends: "2026-06-29T23:59+04:00", checked: C, src: "mqpj" },
  { id: "mq-bk", title: "Burger King combo for AED 1 (Mashreq cards)", place: "Burger King", area: "All UAE", type: "Card offer", save: "AED 1", code: "", terms: "This page is still online, but the offer was for one day only.", ends: "2026-02-11T23:59+04:00", checked: C, src: "mqbk" }
];
// Delivery memberships. Sources disagree, so each row says how sure we are.
const MEMBERSHIPS = [
  { name: "Careem Plus", price: "AED 29 a month", note: "Up from AED 19 on 1 July 2026, per Arabian Business.", sure: "Confirmed in news", link: "https://www.arabianbusiness.com/abnews/careem-plus-price" },
  { name: "Talabat Pro", price: "AED 19 or AED 29 a month", note: "Two 2026 guides give different prices.", sure: "Not confirmed", link: "https://www.angelindubai.com/post/cheapest-food-delivery-apps-dubai-promo-codes" },
  { name: "Deliveroo Plus", price: "AED 29 a month", note: "Two 2026 guides agree. Not checked on Deliveroo's own site.", sure: "Likely", link: "https://tovi.ae/blog/food-delivery-apps-uae-2026" },
  { name: "noon One", price: "Price not found", note: "Free with the Emirates NBD noon One card.", sure: "Not confirmed", link: "https://emiratesnbd.com/en/campaigns/noon-one-credit-card" }
];
// ------------------------------------------------------------------------
