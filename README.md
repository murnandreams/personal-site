# cv

Devin Murnan's personal portfolio site, a small static site built with plain HTML and CSS.

## Pages

| File | Description |
| --- | --- |
| `index.html` | Home page: bio, education, skills, software proficiencies and work experience |
| `hobbies.html` | Hobbies and interests |
| `poetry.html` | A few original poems |
| `contact.html` | Contact details and a `mailto:` contact form |

Shared styles are in `css/styles.css` and images are in `images/`.

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
