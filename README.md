# Tonight's Deals Dubai

A free, static web page listing food deals in Dubai. Every deal is read at its source and shows when it ends, what the catch is, and a link to where it came from. This is a proof of concept to see whether people want it before building more.

## Files

| File | What it is |
| --- | --- |
| `index.html` | The page |
| `styles.css` | The look, in light and dark mode |
| `deals.js` | **The only file you edit day to day**: the deals, the delivery memberships, your contact and the signup link |
| `app.js` | Filters, countdowns, copy buttons, the tip form |

There's no build step and nothing to install. Double-click `index.html` to open it in your browser.

## Adding or updating a deal

Open `deals.js` and copy an existing entry in `DEALS`:

```js
{ id: "unique-id", title: "What the deal is", place: "Restaurant", area: "JLT",
  type: "Dine-in", save: "AED 49", code: "",
  terms: "The catch: days, times, minimum spend, which card.",
  ends: "2026-11-30T23:59+04:00",   // or null if the source gives no end date
  checked: "2026-10-27T12:00+04:00", // when you last read the source
  src: "to" }                        // a key in SRC, the list of sources at the top
```

- `type` is `"Dine-in"`, `"Delivery"` or `"Card offer"`.
- Deals that have ended drop to the bottom on their own. Delete them once a week.
- Set `SIGNUP_URL` to your WhatsApp Channel or newsletter link to switch on the "Follow for free" button.
- Set `CONTACT` to the handle or number people should send tips and reports to.

## Rules this project follows

These keep a free deals site legally low-risk. This is not legal advice.

1. **Never scrape** Talabat, Careem, Noon, Deliveroo or any app. Their terms ban bots and databases built from their content. Collect by hand from public pages, or from what users send you.
2. Write every deal **in your own words**, and link the source. Don't copy photos, logos or artwork.
3. Every deal shows the date its source was checked. Keep the "not affiliated" line in the footer.
4. Signups: use opt-in only, collect just an email (or use a WhatsApp Channel so you hold no numbers), and delete data on request (UAE Federal Decree-Law 45 of 2021).

## Putting it online for free (GitHub Pages)

1. Push this folder to your GitHub repo.
2. On GitHub, go to **Settings → Pages**. Set **Source** to "Deploy from a branch", pick `main` and `/ (root)`, then save.
3. After a minute the site is live at `https://<your-username>.github.io/<repo-name>/`.

## What's next

- [ ] Weekly basket check: the same order at 5 chains, priced on Noon, Careem, Talabat and the restaurant's own app
- [ ] A comparison table for that basket on the page
- [ ] Turn on the signup and post the top 5 deals every Thursday
- [ ] Track followers and weekly visitors: the goal is the first 100
