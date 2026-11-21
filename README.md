# cv

Devin Murnan's personal portfolio site, a small static site built with plain HTML, CSS
and a little vanilla JavaScript. There is no build step and no dependencies.

## Pages

| File | Description |
| --- | --- |
| `index.html` | Home page in CV format: hero with bio and contact line, professional summary (seniority stats and highlights), work experience timeline, skills, education and tools. Includes print styles so it can be saved as a PDF CV. |
| `hobbies.html` | Hobbies and interests, as a card grid |
| `poetry.html` | A few original poems |
| `contact.html` | Email address with mailto and copy buttons, plus a `mailto:` contact form |

Every page shares the same sticky header (name, navigation, theme toggle, mobile menu)
and footer. When you change the navigation, update it on all four pages and keep
`aria-current="page"` on the link for the current page.

## Folders

| Folder | Contents |
| --- | --- |
| `css/` | `styles.css`, the single shared stylesheet. Design tokens (colours for the light and dark themes, fluid type scale, spacing scale, radii, shadows) are CSS custom properties at the top of the file. Change values there rather than hard-coding them. |
| `js/` | `theme.js` loads synchronously in `<head>`. It applies the saved or system theme before the first paint, so pages don't flash the wrong theme, and it powers the toggle (the choice is saved in `localStorage` under `theme`). `main.js` loads with `defer` and handles the mobile menu, scroll-reveal animations (IntersectionObserver), the copy-email button and the contact form's validation states. |
| `fonts/` | Self-hosted variable `woff2` fonts (Latin subset): Lora for headings and Inter for body text, with their SIL Open Font License files. |
| `images/` | Photos used on the pages. |

The site still works without JavaScript: navigation links stay visible, content isn't
hidden by reveals, and the theme follows the system `prefers-color-scheme` setting.
Animations are switched off for visitors who prefer reduced motion.

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
