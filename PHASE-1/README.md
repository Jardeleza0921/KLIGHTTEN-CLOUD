# Klightten Cloud — Phase 1

**Status:** Complete, verified, and ready for public presentation.

Phase 1 is the first completed Klightten Cloud prototype milestone. This public edition presents the project through an informational website and a safe, non-persistent preview of the client and administrator interfaces.

## Public build

The Phase 1 release is fully static and requires no database, server process, account store, or external dependency. GitHub Pages publishes the contents of [`site/`](site/).

The published experience contains two connected public surfaces:

- **Project website:** Introduction, Objectives, Development, About, Security, Themes, and Contact.
- **Web-app preview:** Login, sign-up, client dashboard, and administrator dashboard demonstrations.

## Preview access

The preview credentials are fictional and work only inside the browser demonstration:

| Preview | Username | Password |
| --- | --- | --- |
| Client | `user` | `user1` |
| Administrator | `admin` | `admin1` |

Nothing entered in the preview is transmitted or saved. Refreshing the page resets the demonstration.

## Structure

```text
PHASE-1/
├── README.md
└── site/
    ├── index.html
    ├── objectives.html
    ├── development.html
    ├── about.html
    ├── security.html
    ├── themes.html
    ├── contact.html
    ├── styles.css
    ├── site.js
    ├── assets/
    │   ├── klightten-cloud-logo.svg
    │   └── mascots/
    └── preview/
        ├── index.html
        ├── login.html
        ├── signup.html
        ├── dashboard.html
        ├── app.css
        └── app.js
```

## Project presentation

- Uses the original Klightten Cloud cat-in-a-cloud logo.
- Provides five balanced visual themes: Dark Mint, Neon Arcade, Black & White, Crimson Red, and Cream Coffee.
- Keeps each informational page independent and easy to navigate.
- Uses responsive layouts for desktop, tablet, and mobile viewing.
- Includes the Klightten signature mark: `// = ^ w ^ = )`.

## File security

This public release intentionally excludes operational source, private administration tools, databases, account records, uploaded files, infrastructure addresses, tunnel details, credentials, keys, secrets, logs, and backups.

The web-app area is a visual preview only. It cannot create a real account, authenticate against a live service, upload a file, modify stored information, or reach private administration controls.

See the repository [security policy](../SECURITY.md) for responsible reporting guidance.

## Local review

Open [`site/index.html`](site/index.html) in a modern browser. No installation is required.

## Publication

The included GitHub Pages workflow publishes only `PHASE-1/site`. Phase documentation and future-development files remain visible in the repository but are not included in the website artifact.
