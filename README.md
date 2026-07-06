# DevOneCMS GitHub Marketplace Starter

This folder is ready to become the public DevOneCMS marketplace website.

## Best setup

- Host this folder with GitHub Pages.
- Put marketplace ZIP packages in GitHub Releases.
- Put Release asset download URLs inside `manifest.json` as `zip_url`.

## Repo layout

```text
index.html
submit.html
manifest.json
assets/
packages/              # demo/local packages only; Releases are recommended for production ZIPs
.nojekyll
```

## Quick GitHub setup

1. Create a public repository, for example `devonecms-marketplace`.
2. Upload everything in this folder to the repository root.
3. Enable GitHub Pages from the repository settings.
4. Create a GitHub Release, for example `marketplace-v1`.
5. Upload theme/plugin/library ZIPs as release assets.
6. Open each release asset and copy its download URL.
7. Replace local `packages/example.zip` values in `manifest.json` with the release asset URLs.
8. In DevOneCMS admin, go to **DevOne Store** and set the Marketplace Source to:

```text
https://YOUR-USERNAME.github.io/devonecms-marketplace/manifest.json
```

## Example manifest item using GitHub Release asset

```json
{
  "type": "theme",
  "category": "themes",
  "name": "DevOne Inferno Gold",
  "slug": "devone-inferno-gold",
  "version": "1.0.0",
  "pricing": "free",
  "price": "Free",
  "thumbnail": "assets/img/inferno-gold.svg",
  "zip_url": "https://github.com/YOUR-USERNAME/devonecms-marketplace/releases/download/marketplace-v1/DevOneCMS-theme-devone-inferno-gold-flat.zip"
}
```

## Developer submissions

For now, point `submit.html` or the submit button to GitHub Issues or a GitHub Discussions category. Later DevOneCMS can connect this to a real vendor dashboard, cart, checkout, licensing, and review queue.
