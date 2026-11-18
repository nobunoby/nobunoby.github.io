document.addEventListener("DOMContentLoaded", () => {
  const template = document.getElementById("publication-keyword-data");
  const filter = document.querySelector(".publication-keyword-filter");
  const controls = filter.querySelector(".publication-filter-tags");
  const count = filter.querySelector(".publication-filter-count");
  const empty = filter.querySelector(".publication-filter-empty");
  const lists = [...document.querySelectorAll(".publications ol.bibliography")];
  const keywordsByKey = new Map();
  const keywords = new Set();
  const selected = new Set();
  const keywordClasses = {
    "Learning-Based Control": "tag-learning-control",
    "Motion Planning": "tag-motion-planning",
    "Robot Perception": "tag-robot-perception",
    "Autonomous Systems": "tag-autonomous-systems",
    "Drones (UAVs)": "tag-drones",
    "Off-Road Vehicles": "tag-off-road",
    Uncertainty: "tag-uncertainty",
    "Active Learning": "tag-active-learning",
  };

  template.content.querySelectorAll("li").forEach((entry) => {
    const [key, value] = entry.textContent.trim().replace(/^'|'$/g, "").split("|");
    if (!key || !value) return;
    const tags = value
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
    keywordsByKey.set(key.trim(), tags);
    tags.forEach((tag) => keywords.add(tag));
  });
  if (!keywords.size) return;

  const createTag = (keyword, className) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = className;
    if (keywordClasses[keyword]) button.classList.add(keywordClasses[keyword]);
    button.dataset.keyword = keyword;
    button.textContent = keyword;
    button.setAttribute("aria-pressed", "false");
    button.addEventListener("click", () => {
      if (selected.has(keyword)) selected.delete(keyword);
      else selected.add(keyword);
      update();
    });
    return button;
  };

  [...keywords].sort().forEach((keyword) => controls.append(createTag(keyword, "publication-filter-tag")));
  const entries = lists.flatMap((list) => [...list.querySelectorAll(":scope > li")]);
  entries.forEach((entry) => {
    const details = entry.querySelector("div[id]");
    const tags = keywordsByKey.get(details?.id) || [];
    if (!tags.length) return;
    const container = document.createElement("div");
    container.className = "publication-keyword-tags";
    container.setAttribute("role", "group");
    container.setAttribute("aria-label", "Research areas for this publication");
    tags.forEach((keyword) => container.append(createTag(keyword, "publication-keyword-tag")));
    const links = details.querySelector(".links");
    if (links) links.insertAdjacentElement("afterend", container);
    else details.append(container);
  });

  function update() {
    const all = filter.querySelector('input[name="keyword-mode"]:checked').value === "all";
    let matches = 0;
    entries.forEach((entry) => {
      const tags = keywordsByKey.get(entry.querySelector("div[id]")?.id) || [];
      const match = !selected.size || (all ? [...selected].every((tag) => tags.includes(tag)) : [...selected].some((tag) => tags.includes(tag)));
      entry.hidden = !match;
      if (match && !entry.classList.contains("unloaded")) matches++;
    });
    lists.forEach((list) => {
      const year = list.previousElementSibling;
      if (year && year.matches("h2, h3")) {
        year.hidden = ![...list.querySelectorAll(":scope > li")].some((entry) => !entry.hidden && !entry.classList.contains("unloaded"));
      }
    });
    document
      .querySelectorAll("[data-keyword]")
      .forEach((button) => button.setAttribute("aria-pressed", String(selected.has(button.dataset.keyword))));
    count.textContent = `${matches} ${matches === 1 ? "publication" : "publications"} shown`;
    empty.hidden = matches !== 0;
  }

  filter.querySelectorAll('input[name="keyword-mode"]').forEach((input) => input.addEventListener("change", update));
  filter.querySelector(".publication-filter-clear").addEventListener("click", () => {
    selected.clear();
    update();
  });
  const observer = new MutationObserver(update);
  entries.forEach((entry) => observer.observe(entry, { attributes: true, attributeFilter: ["class"] }));
  filter.hidden = false;
  update();
});
