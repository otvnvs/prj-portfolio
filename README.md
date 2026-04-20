# prj-portfolio

A dynamic, self-updating portfolio that automatically showcases my work by fetching data directly from the GitHub API.

**[🚀 View My Live Portfolio](https://github.io)**

## How It Works
Instead of manually updating this site every time I finish a project, this portfolio uses the **GitHub REST API** to:
1. Scan my public repositories.
2. Filter for any project starting with the `prj-` prefix.
3. Automatically generate a project card with links to the **Live Demo** (GitHub Pages) and the **Source Code**.

## Tech Stack
- **HTML5 & CSS3:** Responsive grid layout with a modern dark-mode aesthetic.
- **Vanilla JavaScript:** Asynchronous API handling using `fetch` and `async/await`.
- **GitHub API:** To dynamically populate content without a backend.

## Repository Naming Convention
To keep my portfolio organized, I use the following convention:
- `prj-[name]`: Public projects intended for display.
- `prj-portfolio`: This main hub repository.

## Installation & Local Use
1. Clone the repository:
   ```bash
   git clone https://github.com
   ```

