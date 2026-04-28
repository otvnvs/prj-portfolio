const USERNAME = window.location.hostname.split('.')[0] || 'otvnvs',
  PREFIX = 'prj-';
let allRepos = [],
  activeFilter = 'all';

async function load() {
  const e = document.getElementById('projects'),
    t = document.getElementById('subtitle'),
    n = document.getElementById('filters'),
    o =
      'localhost' === window.location.hostname ||
      '127.0.0.1' === window.location.hostname,
    a = o
      ? './dummy/repos.json'
      : `https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=updated`;

  try {
    const s = await fetch(a);
    if (!s.ok)
      throw new Error(`${o ? 'Local File' : 'GitHub API'}: ${s.status}`);
    const l = await s.json();
    ((allRepos = l.filter(
      (e) => e.name.startsWith(PREFIX) && 'prj-portfolio' !== e.name
    )),
      (n.innerHTML = ''));
    const r = document.createElement('button');
    ((r.className = 'filter-btn active'),
      (r.textContent = 'all'),
      (r.dataset.filter = 'all'),
      (r.onclick = () => setFilter('all')),
      n.appendChild(r));
    const c = new Set();
    (allRepos.forEach((e) => e.topics.forEach((e) => c.add(e))),
      c.forEach((e) => {
        const t = document.createElement('button');
        ((t.className = 'filter-btn'),
          (t.textContent = e),
          (t.dataset.filter = e),
          (t.onclick = () => setFilter(e)),
          n.appendChild(t));
      }),
      render(),
      setupSearch());
  } catch (n) {
    ((e.innerHTML = `<li class="state error">${n.message}</li>`),
      (t.textContent = o
        ? '// local repos.json not found'
        : '// error fetching repos'));
  }
}

function setFilter(e) {
  ((activeFilter = e),
    document.querySelectorAll('.filter-btn').forEach((t) => {
      t.dataset.filter === e
        ? t.classList.add('active')
        : t.classList.remove('active');
    }),
    render());
}

function setupSearch() {
  document.getElementById('search').addEventListener('input', () => render());
}

function render() {
  const e = document.getElementById('projects'),
    t = document.getElementById('subtitle'),
    n = document.getElementById('search').value.toLowerCase(),
    o = allRepos.filter((e) => {
      const t =
          e.name.toLowerCase().includes(n) ||
          (e.description || '').toLowerCase().includes(n) ||
          e.topics.some((e) => e.includes(n)),
        o = 'all' === activeFilter || e.topics.includes(activeFilter);
      return t && o;
    });
  ((t.textContent = `// ${o.length} project${1 !== o.length ? 's' : ''} found`),
    (e.innerHTML = ''),
    o.length
      ? o.forEach((t, n) => {
          const o = t.name.replace(PREFIX, '').replace(/-/g, ' '),
            a = t.homepage || `https://${USERNAME}.github.io/${t.name}/`,
            s = document.createElement('li');
          ((s.style.animationDelay = `${50 * n}ms`),
            (s.innerHTML = `
                    <a href="${a}" target="_blank" rel="noopener">
                        <span class="proj-name">${o}</span>
                        <span class="proj-desc">${t.description || 'No description provided.'}</span>
                        <div class="proj-footer">
                            <div class="proj-tags">
                                ${t.topics.map((e) => `<span class="tag">#${e}</span>`).join('')}
                            </div>
                            <div class="proj-meta">
                                ${t.stargazers_count ? '★ ' + t.stargazers_count : ''}
                                <object>
                                    <a href="${t.html_url}" target="_blank" class="repo-link">source ↗</a>
                                </object>
                            </div>
                        </div>
                    </a>
                `),
            e.appendChild(s));
        })
      : (e.innerHTML = '<li class="state">No matching projects found.</li>'));
}
load();
