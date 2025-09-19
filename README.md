# Ferhat Atagün - ferhatatagun.com

Vercel-like style portfolio template for developers.

## How to Use

To use the template as it is:
- Update files in `src/lib/data` with your data.
- Update `src/lib/index.scss` for custom styling.
- Update `static/favicon.ico` to customize the tab's icon.

Feel free to explore and hack the template to your needs.

## Deploying to GitHub Pages

Before deploying:
1. Change the `base` parameter in `svelte.config.js`.
2. Update the target branch in `deploy.yml` (default is `master`).
3. Allow GitHub Pages in your repo settings:
   - **Permissions:**
     - Go to `Settings` > `Actions` > `General`
     - In `Actions permissions`, check `Allow all actions and reusable workflows`
   - **Pages:**
     - Go to `Settings` > `Pages`
     - In Source section, select `Deploy from a branch`
     - In Branch section, select `gh-pages` and `/ (root)`, then save

If the workflow does not launch, try pushing another commit (even an empty one). If issues persist, create an issue and link your repo.

## Known Issues

- Svelte no longer supports `node 14`, use a newer version instead.
