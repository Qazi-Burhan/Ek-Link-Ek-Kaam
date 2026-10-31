# Ek Link, Ek Kaam

**Digital independence through guided learning.** Ek Link, Ek Kaam helps children teach parents and family members digital tasks with short, accessible guides. A guide shows one step at a time and gradually reduces help as the learner gains confidence.

## Problem

Digital tasks can be intimidating when people are unfamiliar with an app or have to follow many instructions at once. Asking a family member repeatedly can also make it harder to build confidence and independence.

## Solution and innovation

Children create a simple guide and share it as a compressed link. The learner opens it on their own device and follows one step at a time. **Madad Kam Karte Jao** independently tracks help for each step:

- **Full help:** the complete instruction is visible.
- **Hint:** the step title is shown; the learner can request a hint.
- **Recall:** the learner is asked what comes next and may reveal the answer.

Completing a step without opening help reduces its help level for the next attempt. Requesting a hint, answer, or WhatsApp assistance restores that step to full help. Progress remains local to the learner’s device.

## Features

- English and Urdu interface with a persistent language switch and automatic LTR/RTL layout
- Three bilingual demonstration guides
- Guide creator for 2–15 steps with both-language titles, instructions, and optional hints
- Live preview, step reordering, deletion, and validation
- Compressed, versioned guide data in a URL hash using lz-string
- Link copy and explicit WhatsApp sharing
- One-step-at-a-time player, per-step adaptive assistance, and local progress reset
- Browser text-to-speech when a suitable English or Urdu voice is installed; Hindi is an Urdu fallback
- Consent confirmation before a WhatsApp help message opens
- Responsive layout, keyboard focus styling, large touch targets, and reduced-motion support

## Technology

- HTML5, CSS3, and vanilla JavaScript ES modules
- Browser localStorage for language preference and learning progress
- sessionStorage for restoring the current player position on page refresh
- lz-string CDN for URL compression
- Web Speech API for optional device speech
- WhatsApp Click-to-Chat (`wa.me`)
- Google Fonts Noto Naskh Arabic for Urdu; system sans-serif fonts for English

No application backend, account, analytics, or database is used.

## Project structure

```text
index.html
create.html
play.html
css/style.css
js/app.js
js/encode.js
js/engine.js
js/guides.js
js/i18n.js
js/speech.js
js/storage.js
js/whatsapp.js
assets/
README.md
PERSONA.md
```

## Run locally

Use Python’s simple static server from the project directory:

```powershell
python -m http.server 8000
```

Open [http://localhost:8000](http://localhost:8000). Because the app uses JavaScript modules, use a local HTTP server rather than opening the HTML files directly. Stop the server with `Ctrl+C`.

The Google font and lz-string are loaded from CDNs; an internet connection is needed to load these resources. The rest of the app is static.

## GitHub Pages deployment

1. Push the project files to a GitHub repository.
2. In **Settings → Pages**, choose the deployment branch and the project root (`/`).
3. Wait for the Pages URL to become available and open `index.html`.
4. Create a test guide and open the generated link to confirm its path and hash work on the published site.

No build step or backend configuration is required. Guide URLs include their content in the hash and are portable to the same Pages deployment.

## Privacy architecture

- Guide text is compressed into the shareable URL hash. Anyone with that link can read its guide content, so do not include OTPs, passwords, PINs, card numbers, or other sensitive information.
- Learning progress and the chosen language are stored in browser localStorage on that device. The current guide position is held in sessionStorage for refresh recovery.
- No guide data or progress is sent to an application server. The learner chooses whether to open WhatsApp; messages are never sent automatically.
- WhatsApp Click-to-Chat, the font CDN, and the lz-string CDN are external services. The optional speech feature uses voices supplied by the device/browser.

## Team responsibilities

- **Member A:** player, adaptive help engine, and local progress
- **Member B:** guide creator, URL encoding, and sharing
- **Member C:** design, responsive behavior, accessibility, and speech
- **Member D:** user research, persona, documentation, and demonstration

## Competition demonstration (about 2–3 minutes)

1. Open a sample Video Call guide.
2. Complete a step without requesting help and continue.
3. Restart the guide to show the completed step now has less help.
4. Open a hint or answer and show that the step returns to full help.
5. Press **I need help**, inspect the exact WhatsApp message, then cancel once to demonstrate consent.
6. Reopen the confirmation and send only with explicit consent.
7. Complete the guide and show the learning summary.

## Research note

The persona document describes a hypothetical design target. It does not claim that interviews or usability studies have been conducted.
