# cv

Devin Murnan's personal portfolio site, a small static site built with plain HTML and CSS.

## Pages

| File | Description |
| --- | --- |
| `index.html` | CV: profile, experience timeline, skills sidebar, education and training |
| `hobbies.html` | Hobbies and interests |
| `poetry.html` | A few original poems |
| `contact.html` | Contact details and a `mailto:` contact form |

Shared styles are in `css/styles.css` and images are in `images/`. The theme
(deep navy with a lemon accent) is defined with CSS custom properties at the top
of the stylesheet, so colors can be changed in one place. The CV page also has
print styles, so printing it or saving it as a PDF gives a clean paper CV.
Pages load the Inter font from Google Fonts and fall back to system fonts if it is unavailable.

## Running locally

No build step is needed. Open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deployment

The site is fully static, so any static host can serve the repository root as is,
for example GitHub Pages (Settings → Pages → deploy from the `main` branch, `/ (root)`),
Netlify or Vercel.

File names are lowercase and links match them exactly, so the site also works on
case-sensitive hosts such as GitHub Pages and most Linux servers.
