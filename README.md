# Apex Artisanal Bakery

A responsive static website for Apex Artisanal Bakery, presenting its story, products, gallery, contact details and enquiry options.

## Technologies

- Semantic HTML5
- CSS3 with responsive layouts and reduced-motion support
- Vanilla JavaScript
- Native HTML `<dialog>` elements for product details and the gallery lightbox
- Schema.org `Bakery` structured data
- Google Maps embed on the contact pages

## Website features

- Homepage hero carousel with manual and automatic controls.
- Product cards with ingredient details.
- Product search, category filtering, sorting and no-results feedback.
- Keyboard-accessible image lightbox on the homepage and gallery.
- Contact and enquiry forms with HTML5 and JavaScript validation.
- `mailto:` handoff for static hosting, with clear messaging that the site does not send or store submissions.
- Responsive layouts for smaller screens and visible keyboard focus states.
- LocalBusiness-compatible structured data using the existing bakery details.
- `robots.txt` and Netlify-compatible security headers.

## Run locally

No build step or package installation is required. Open `index.html` in a browser, or serve this folder with any static web server:

```text
python -m http.server
```

Then visit `http://localhost:8000/index.html`.

## Deployment

The project uses relative page and asset paths and is deployed-ready for Vercel. The sitemap is available at [sitemap.xml](./sitemap.xml), and [robots.txt](./robots.txt) points search engines to it.

The [_headers](./_headers) file is used by Netlify, while [vercel.json](./vercel.json) provides equivalent security headers for Vercel. GitHub Pages does not process either file; configure equivalent headers through the hosting platform if available.

## Static-site limitations

- The forms cannot send or store data without a backend or form service. They prepare an email in the visitor's configured email application.
- Client-side validation improves usability but is not a security boundary.
- Google Maps and remote Unsplash images require an internet connection.
- Automated browser visual testing was not available in the development environment; desktop, tablet and mobile interaction should be manually checked before release.

## Changelog

### 2026-11-01

- Updated `index.html`, `Products.html`, `Gallery.html`, `AboutUs.html`, and `Contact.html` with consistent metadata, headings, navigation, accessibility improvements and genuine bakery structured data.
- Added `enquiry.html` with validated product/service enquiry fields and a transparent static-site email handoff.
- Added product search, category filtering, sorting and no-results feedback in `Products.html` and `script.js`.
- Added a keyboard-accessible gallery lightbox to `index.html` and `Gallery.html`.
- Added responsive form controls, focus states, reduced-motion support and lazy image loading in `style.css`.
- Added `robots.txt` and `_headers` for crawling and supported hosting security configuration.
- Repaired malformed document structures and removed the missing `bakery-team.jpg` reference instead of inventing an asset.
- Added this README with setup, deployment and limitation documentation.
