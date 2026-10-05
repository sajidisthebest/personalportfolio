# Sajidul Hasan — Thumbnail Designer Portfolio

A static, Cloudflare Pages-ready portfolio. No framework or build step required.

## Before you publish

Open `index.html` and replace:

- Email is set to: `sajid@sajidvisuals.com`
- `YOUR_BOOKING_LINK_HERE` with your Calendly / Cal.com / other booking URL

## Replace the showcase thumbnails

1. Put your 16:9 thumbnail images inside `assets/thumbnails/`.
2. Open `content/projects.json`.
3. Change each project's `image`, `title`, `client`, `category`, and `stat`.
4. Add or remove project objects whenever you want. The website creates the filters and portfolio grid automatically.

Example:

```json
{
  "title": "I Survived 100 Days",
  "client": "Creator Name",
  "category": "Entertainment",
  "image": "assets/thumbnails/my-thumbnail.webp",
  "stat": "5.7% CTR",
  "featured": true
}
```

`featured` is included for future expansion. The current grid displays all items and uses `category` for filtering.

## Recommended image format

- Aspect ratio: 16:9
- Suggested export: 1280×720 or 1600×900
- Prefer `.webp` for faster loading (JPEG/PNG also work)
- Try to keep each image below ~400 KB

## Preview locally

Because the portfolio reads `projects.json`, opening `index.html` with `file://` may be blocked by your browser.

From this folder run one of these:

```bash
python -m http.server 8080
```

Then visit `http://localhost:8080`.

## Deploy to Cloudflare Pages

### Easiest: Direct Upload

1. Zip the files or keep the folder ready.
2. In Cloudflare: **Workers & Pages → Create → Pages → Upload assets**.
3. Upload the contents of this folder.
4. Deploy.

### Git workflow

Push this folder to GitHub, then connect the repository in Cloudflare Pages. There is no build command. Set the output directory to the repository root.

## Where to edit copy

All website copy is in `index.html`. Visual styling is in `styles.css` and interactions are in `script.js`.

## Notes

The included thumbnails are intentional placeholders, not portfolio claims. Replace them with your real work before launch.
