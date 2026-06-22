// Webring widget: fetches the canonical member list and wires up the
// Previous / Random / Next links relative to whichever site is showing it.
const WEBRING_SRC = "https://kernel.gay/webring/members.json";

// Normalize a host so "www.foo.com" and "foo.com" compare equal.
function normalizeHost(host) {
  return host.replace(/^www\./, "").toLowerCase();
}

async function initWebring(root) {
  root.dataset.webringInit = "true";

  let members;
  try {
    const res = await fetch(WEBRING_SRC);
    members = (await res.json()).members;
  } catch (err) {
    root.textContent = "webring offline";
    return;
  }
  if (!Array.isArray(members) || members.length === 0) return;

  // Find where we are in the ring; fall back to the start if we're not listed.
  const here = normalizeHost(location.hostname);
  let i = members.findIndex((m) => normalizeHost(m) === here);
  if (i === -1) i = 0;

  const len = members.length;
  const prev = members[(i - 1 + len) % len];
  const next = members[(i + 1) % len];

  const others = members.filter((_, j) => j !== i);
  const rand = (others.length ? others : members)[
    Math.floor(Math.random() * (others.length || len))
  ];

  const link = (label, host) => {
    const a = document.createElement("a");
    a.href = "https://" + host + "/webring";
    a.textContent = label;
    return a;
  };

  root.replaceChildren(
    link("Previous", prev),
    document.createTextNode(" "),
    link("Random", rand),
    document.createTextNode(" "),
    link("Next", next),
  );
}

function initWebrings() {
  document
    .querySelectorAll(".webring:not([data-webring-init])")
    .forEach(initWebring);
}

initWebrings();
document.body.addEventListener("htmx:load", initWebrings);
