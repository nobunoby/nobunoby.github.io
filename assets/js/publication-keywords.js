document.addEventListener("DOMContentLoaded", () => {
  const template = document.getElementById("publication-keyword-data");
  const select = document.getElementById("publication-keyword");
  const filter = document.querySelector(".publication-keyword-filter");
  const lists = document.querySelectorAll(".publications ol.bibliography");
  const keywordsByKey = new Map();
  const keywords = new Set();

  template.content.querySelectorAll("li").forEach((entry) => {
    const [key, value] = entry.textContent.trim().split("|");
    if (!key || !value) return;
    const tags = value
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
    keywordsByKey.set(key.trim(), tags);
    tags.forEach((tag) => keywords.add(tag));
  });

  if (!keywords.size) return;
  [...keywords].sort().forEach((keyword) => select.add(new Option(keyword, keyword)));
  filter.hidden = false;

  const update = () => {
    lists.forEach((list) => {
      const entries = [...list.querySelectorAll(":scope > li")];
      entries.forEach((entry) => {
        const key = entry.querySelector("div[id]")?.id;
        entry.hidden = !!select.value && !(keywordsByKey.get(key) || []).includes(select.value);
      });
      const year = list.previousElementSibling;
      if (year && year.matches("h2, h3")) {
        year.hidden = !entries.some((entry) => !entry.hidden && !entry.classList.contains("unloaded"));
      }
    });
  };
  select.addEventListener("change", update);
  document.getElementById("bibsearch")?.addEventListener("input", () => setTimeout(update, 350));
});
