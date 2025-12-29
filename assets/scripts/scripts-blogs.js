function getFilterVals() {
  return document
    .querySelectorAll(".blog-filter-checkbox")
    .values()
    .reduce((acc, current) => {
      acc[current.value] = current.checked;
      return acc;
    }, {});
}

function applyFilter(filter) {
  const filterBtn = document.querySelector(".blogs-filter-btn");

  if (!Object.values(filter).includes(true)) {
    document.querySelectorAll(".blog-card").forEach((card) => {
      card.classList.remove("d-none");
    });
    filterBtn.classList.remove("mdi-filter-check-outline");
    filterBtn.classList.add("mdi-filter-outline");
  } else {
    for (let key in filter) {
      document.querySelectorAll(".blog-card").forEach((card) => {
        if (
          card.classList.contains(`blog-card-tag-${key.replaceAll(" ", "-")}`)
        ) {
          if (filter[key]) card.classList.remove("d-none");
          else card.classList.add("d-none");
        }
      });
    }
    filterBtn.classList.add("mdi-filter-check-outline");
    filterBtn.classList.remove("mdi-filter-outline");
  }
}

function bindBlogsFilter() {
  document.querySelector(".filter-dropdown")?.classList.remove("d-none");
  const filterBtn = document.querySelector(".blogs-filter-btn");
  const menu = document.querySelector(".filter-menu");

  // menu appearance things
  filterBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    menu.classList.toggle("d-none");
  });

  menu.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  document.addEventListener("click", () => {
    menu.classList.add("d-none");
  });

  // action trigers
  document.querySelectorAll(".blog-filter-checkbox").forEach((el) => {
    el.addEventListener("input", () => {
      applyFilter(getFilterVals());
    });
  });
  applyFilter(getFilterVals());
}

window.addEventListener("load", bindBlogsFilter);
