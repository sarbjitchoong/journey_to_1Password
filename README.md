# My Journey to 1Password

A static one-page presentation website for Sarb's journey to 1Password. It combines a canvas-rendered globe, animated starfield, an Air Canada-inspired flight route, a clickable timeline, and presenter controls.

## GitHub Pages Deployment

Upload the contents of this folder to the root of your GitHub Pages repository:

- `index.html`
- `styles.css`
- `script.js`
- `assets/`
- `vendor/`
- `.nojekyll`
- `README.md` and `templates/` are optional project notes.

Then enable GitHub Pages from the repository root. There is no build step and no package install.

## Local Preview

From this folder:

```bash
python3 -m http.server 8001
```

Open:

```text
http://127.0.0.1:8001/
```

If you run the server from the parent folder instead, open:

```text
http://127.0.0.1:8001/townhall-journey-canvas/
```

## Direct Start Links

These optional query links are useful for rehearsing a section:

- `?chapter=canada`
- `?chapter=flight`
- `?chapter=flighthub`
- `?chapter=concordia`
- `?chapter=1password`

## Presentation Notes

- Use the bottom-right presenter controls to pause, restart, stop, or replay the timeline.
- Click any timeline milestone to jump directly to that part of the story.
- The countdown timer shows how much time is left in the presentation timeline.
- The animation stops on the final 1Password/DATA chapter. Use `Restart` to play it again.
- Runtime dependencies are local under `vendor/` and `assets/`, so the site works on GitHub Pages without a CDN.

## Story Editing

Open `script.js` and update the `chapters` array near the top. Each chapter controls the timeline label, chapter title, route progress, and optional direct-link aliases.
