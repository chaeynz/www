function initTicker(span) {
  const messages = JSON.parse(span.dataset.messages);
  let i = 0;
  span.textContent = messages[0];
  span.addEventListener("animationiteration", () => {
    i = (i + 1) % messages.length;
    span.textContent = messages[i];
  });
  span.dataset.tickerInit = "true";
}

function initTickers() {
  document
    .querySelectorAll(".ticker span:not([data-ticker-init])")
    .forEach(initTicker);
}

initTickers();
document.body.addEventListener("htmx:load", initTickers);
