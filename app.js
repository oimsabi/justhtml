(() => {
  const projects = Array.isArray(window.HTML_SHOWCASE_PROJECTS)
    ? window.HTML_SHOWCASE_PROJECTS
    : [];
  const grid = document.querySelector("#project-grid");
  const empty = document.querySelector("#empty-state");
  const count = document.querySelector("#project-count");
  const search = document.querySelector("#search-input");
  const repositoryLink = document.querySelector("#repository-link");

  const repoMatch = window.location.hostname.endsWith(".github.io")
    ? window.location.pathname.split("/").filter(Boolean)[0]
    : "";
  const owner = window.location.hostname.endsWith(".github.io")
    ? window.location.hostname.replace(".github.io", "")
    : "";

  if (owner && repoMatch) {
    repositoryLink.href = `https://github.com/${owner}/${repoMatch}`;
  } else if (owner) {
    repositoryLink.href = `https://github.com/${owner}`;
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function render(query = "") {
    const normalizedQuery = query.trim().toLocaleLowerCase("th");
    const filtered = projects.filter((project) =>
      `${project.title} ${project.path}`.toLocaleLowerCase("th").includes(normalizedQuery)
    );

    grid.innerHTML = filtered.map((project) => `
      <a class="project-card" href="${encodeURI(project.path)}">
        <div class="card-top">
          <span class="file-icon" aria-hidden="true">HTML</span>
          <span class="open-icon" aria-hidden="true">↗</span>
        </div>
        <div class="card-body">
          <h2>${escapeHtml(project.title)}</h2>
          <p class="card-path">${escapeHtml(project.path)}</p>
        </div>
      </a>
    `).join("");

    count.textContent = `${filtered.length} ${filtered.length === 1 ? "FILE" : "FILES"}`;
    empty.hidden = filtered.length > 0;
  }

  search.addEventListener("input", (event) => render(event.target.value));
  render();
})();
