const $ = id => document.getElementById(id);
const state = { q: "", type: "All", area: "All", sort: "ending" };
const flagged = new Set();
try { JSON.parse(localStorage.getItem("flagged") || "[]").forEach(x => flagged.add(x)); } catch (e) {}
$("sampleNote").hidden = !SHOWING_SAMPLES;
$("contact1").textContent = CONTACT;

function chips(el, values, key) {
  el.replaceChildren(...["All", ...values].map(v => {
    const b = document.createElement("button");
    b.className = "chip"; b.type = "button"; b.textContent = v;
    b.setAttribute("aria-pressed", String(state[key] === v));
    b.onclick = () => { state[key] = v; render(); };
    return b;
  }));
}
const uniq = k => [...new Set(DEALS.map(d => d[k]))].sort();

function left(ms) {
  if (ms <= 0) return "Ended";
  const m = Math.floor(ms / 60e3), d = Math.floor(m / 1440), h = Math.floor((m % 1440) / 60), mm = m % 60;
  if (d >= 1) return `Ends in ${d}d ${h}h`;
  if (h >= 1) return `Ends in ${h}h ${mm}m`;
  return `Ends in ${mm}m`;
}
function ago(t) {
  return "source checked " + new Date(t).toLocaleDateString("en-GB", { day: "numeric", month: "short", timeZone: "Asia/Dubai" });
}
const endMs = d => d.ends ? new Date(d.ends) - Date.now() : Infinity;

async function copy(text, btn, label) {
  try { await navigator.clipboard.writeText(text); btn.textContent = "Copied"; }
  catch (e) { btn.textContent = text; const r = document.createRange(); r.selectNodeContents(btn); const s = getSelection(); s.removeAllRanges(); s.addRange(r); }
  setTimeout(() => { btn.textContent = label; }, 1600);
}

function card(d) {
  const ms = endMs(d), ended = ms <= 0;
  const a = document.createElement("article");
  a.className = "deal" + (ended ? " ended" : "");
  const main = document.createElement("div"); main.className = "main";
  const meta = document.createElement("div"); meta.className = "meta";
  [d.type, d.area, ago(d.checked)].forEach(t => { const s = document.createElement("span"); s.textContent = t; meta.append(s); });
  const h = document.createElement("h2"); h.textContent = d.title;
  const p = document.createElement("p"); p.className = "place"; p.textContent = d.place;
  const t = document.createElement("p"); t.className = "terms"; t.textContent = "The catch: " + d.terms;
  const links = document.createElement("div"); links.className = "links";
  const src = SRC[d.src];
  if (src) { const l = document.createElement("a"); l.href = src[1]; l.target = "_blank"; l.rel = "noopener"; l.textContent = "Source: " + src[0]; links.append(l); }
  const rep = document.createElement("button"); rep.type = "button"; rep.className = "linkbtn";
  rep.textContent = flagged.has(d.id) ? "You said this didn't work" : "Didn't work?";
  links.append(rep);
  main.append(meta, h, p, t, links);
  if (flagged.has(d.id)) {
    const f = document.createElement("div"); f.className = "flagged";
    const msg = `The deal "${d.title}" at ${d.place} didn't work for me.`;
    f.innerHTML = `<span>Thanks. Send this to <span class="contact"></span> so we can fix or remove it:</span>`;
    f.querySelector(".contact").textContent = CONTACT;
    const b = document.createElement("button"); b.type = "button"; b.className = "code"; b.textContent = "Copy message";
    b.onclick = () => copy(msg, b, "Copy message");
    f.append(b); main.append(f);
  }
  rep.onclick = () => {
    flagged.has(d.id) ? flagged.delete(d.id) : flagged.add(d.id);
    try { localStorage.setItem("flagged", JSON.stringify([...flagged])); } catch (e) {}
    render();
  };
  const stub = document.createElement("div"); stub.className = "stub";
  const sv = document.createElement("div"); sv.className = "save"; sv.textContent = d.save;
  let codeEl;
  if (d.code) { codeEl = document.createElement("button"); codeEl.type = "button"; codeEl.className = "code"; codeEl.textContent = d.code; codeEl.title = "Copy code"; codeEl.onclick = () => copy(d.code, codeEl, d.code); }
  else { codeEl = document.createElement("span"); codeEl.className = "nocode"; codeEl.textContent = "No code needed"; }
  const c = document.createElement("span"); c.className = "clock" + (!ended && ms < 48 * H ? " soon" : ""); c.textContent = d.ends ? left(ms) : "No end date given";
  stub.append(sv, codeEl, c);
  a.append(main, stub);
  return a;
}

function render() {
  chips($("typeChips"), uniq("type"), "type");
  chips($("areaChips"), uniq("area"), "area");
  const q = state.q.toLowerCase();
  let rows = DEALS.filter(d =>
    (state.type === "All" || d.type === state.type) &&
    (state.area === "All" || d.area === state.area) &&
    (!q || [d.title, d.place, d.area, d.terms].join(" ").toLowerCase().includes(q)));
  const live = rows.filter(d => endMs(d) > 0);
  const gone = rows.filter(d => endMs(d) <= 0);
  live.sort(state.sort === "ending" ? (a, b) => endMs(a) - endMs(b) : (a, b) => a.title.localeCompare(b.title));
  const list = $("list");
  if (!live.length && !gone.length) {
    const e = document.createElement("p"); e.className = "empty"; e.textContent = "No deals match that. Try another area or clear the search.";
    list.replaceChildren(e); return;
  }
  const head = document.createElement("p"); head.className = "count";
  head.textContent = `${live.length} live deal${live.length === 1 ? "" : "s"}` + (gone.length ? `. At the bottom: ${gone.length} offer page${gone.length === 1 ? "" : "s"} still online that already ended.` : "");
  list.replaceChildren(head, ...live.map(card), ...gone.map(card));
}

$("q").addEventListener("input", e => { state.q = e.target.value; render(); });
$("sort").addEventListener("change", e => { state.sort = e.target.value; render(); });
$("tipForm").addEventListener("submit", e => {
  e.preventDefault();
  const lines = [
    "New deal tip:",
    "Place: " + $("tPlace").value,
    $("tArea").value && "Area: " + $("tArea").value,
    "Deal: " + $("tDeal").value,
    $("tCode").value && "Code: " + $("tCode").value,
    $("tEnds").value && "Ends: " + $("tEnds").value,
    $("tTerms").value && "Catch: " + $("tTerms").value
  ].filter(Boolean).join("\n");
  $("tipText").textContent = lines; $("tipOut").hidden = false;
});
$("copyTip").addEventListener("click", e => copy($("tipText").textContent, e.target, "Copy message"));

$("memBody").replaceChildren(...MEMBERSHIPS.map(m => {
  const tr = document.createElement("tr");
  const a = document.createElement("a"); a.href = m.link; a.target = "_blank"; a.rel = "noopener"; a.textContent = m.name;
  const cells = [a, m.price, m.sure, m.note].map(v => { const td = document.createElement("td"); typeof v === "string" ? td.textContent = v : td.append(v); return td; });
  cells[2].className = m.sure === "Not confirmed" ? "unsure" : "";
  tr.append(...cells); return tr;
}));
if (SIGNUP_URL) { $("signupBtn").href = SIGNUP_URL; $("signupBtn").hidden = false; }
else { $("signupText").textContent = "Free, before the weekend. Signup opens soon."; }

render();
setInterval(render, 60e3);
