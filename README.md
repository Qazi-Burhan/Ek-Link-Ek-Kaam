# Ek Link, Ek Kaam — Phone Practice

A friendly, Urdu-first digital-literacy app where adults can safely practise everyday phone tasks. Learn in Urdu or English, try fictional phone simulations, get help when you need it, and build confidence at your own pace.

> **Practice only:** the app does not connect to real banks, government services, messaging accounts, or payment providers. Never enter real passwords, OTPs, PINs, account details, or personal information.

## Screenshots

![Screenshot 2026-10-31 173610](./assets/images/Screenshot%202026-10-31%20173610.png)

![Screenshot 2026-10-31 174624](./assets/images/Screenshot%202026-10-31%20174624.png)

![Screenshot 2026-10-31 174704](./assets/images/Screenshot%202026-10-31%20174704.png)

![Screenshot 2026-10-31 174753](./assets/images/Screenshot%202026-10-31%20174753.png)

![Screenshot 2026-10-31 175021](./assets/images/Screenshot%202026-10-31%20175021.png)

![Screenshot 2026-10-31 175043](./assets/images/Screenshot%202026-10-31%20175043.png)

![Screenshot 2026-10-31 175100](./assets/images/Screenshot%202026-10-31%20175100.png)

![Screenshot 2026-10-31 175118](./assets/images/Screenshot%202026-10-31%20175118.png)

![Screenshot 2026-10-31 175140](./assets/images/Screenshot%202026-10-31%20175140.png)

![Screenshot 2026-10-31 175154](./assets/images/Screenshot%202026-10-31%20175154.png)

## What you can learn

The app includes six practice topics. Each has five decision-making questions, with simple explanations and feedback after an answer.

| Practice topic | Example skills |
| --- | --- |
| **Bank App Logout** | Safely leaving an account, using a shared phone, responding to an unexpected code, reopening the app, and keeping passwords private |
| **Government Form** | Finding required fields, checking information, handling verification codes, choosing a file, and reviewing before submission |
| **Real or Fake Message** | Checking the sender, spotting unexpected prizes, protecting codes, resisting urgent threats, and avoiding unknown files or links |
| **Phone Storage Full** | Understanding what uses space, checking before deleting, keeping a backup, finding duplicates, and choosing what is safe to remove |
| **Forgotten Password** | Using the official recovery path, protecting a verification code, choosing a stronger password, and keeping it private |
| **Video Call Not Working** | Checking the camera, microphone and mute settings, handling a frozen video, reviewing permissions, and ending a call |

### Other learning activities

- **Message safety practice:** review five fictional everyday messages and identify suspicious parts. A normal reminder is included so learners practise distinguishing ordinary messages from risky ones.
- **Fictional wallet-message exercises:** inspect two clearly labelled JazzCash/Easypaisa-style examples and learn to spot pressure, unexpected prizes, requests for private codes, and unfamiliar links. These examples do not represent real messages from those services.
- **Teach-back:** answer two short questions after a topic to practise remembering and explaining its key safety lessons.
- **Digital word guide:** search technical terms and read short, everyday explanations in either language.

## Learning features

- **Urdu and English:** switch languages from the header. Urdu uses right-to-left layout; English uses left-to-right layout.
- **Shuffled answer choices:** options are shuffled when a practice session starts. Each choice remains associated with its correct answer, and the order stays stable during the session.
- **Answer-first learning:** choices are visually neutral before selection. The app gives encouraging feedback for a correct choice and a clear explanation with a chance to retry after an incorrect choice.
- **Adaptive help:** each question offers four levels:
  1. **Full guidance** — read the situation and support text.
  2. **Hint** — get a smaller clue.
  3. **Recall** — try to remember with less support.
  4. **Independent practice** — answer without a hint.
- **Progress tracking:** the dashboard summarizes completed topics, attempts, independent steps, topics to revisit, and completed teach-backs.
- **Resume practice:** the current topic and step can be continued later. Progress and the active session are saved in the current browser.
- **Optional speech:** the word guide can read an explanation using the browser’s speech feature. Available voices depend on the device; Urdu speech requires an installed Urdu voice.
- **Consent-based sharing:** review or copy a short progress summary before choosing to open WhatsApp. Sharing is optional.
- **Responsive layout:** designed to work on phones, tablets, and desktop screens.

## Run locally

This is a static web app; no build step or package installation is required. Serve the project folder over HTTP so that browser ES modules can load.

### Python

From the project directory:

```powershell
python -m http.server 8000
```

Open [http://localhost:8000](http://localhost:8000).

### Node.js alternative

If you already have the `http-server` package available:

```powershell
npx http-server . -p 8000
```

Then open [http://localhost:8000](http://localhost:8000).

> Opening `index.html` directly as a `file://` URL may prevent JavaScript modules from loading. Use a local web server instead.

## Project structure

```text
.
├── index.html                 # Main Phone Practice app
├── css/
│   └── style.css              # Theme, layout, and responsive styles
├── js/
│   ├── app.js                 # Dashboard, scenarios, dictionary, and app events
│   ├── scenarios.js           # Six practice topics and digital word guide
│   ├── scenario-urdu.js       # Urdu scenario text
│   ├── i18n.js                # Shared Urdu and English interface copy
│   ├── engine.js              # Adaptive help, progress logic, answer shuffling
│   ├── storage.js             # Browser-local progress state
│   ├── phone-simulator.js     # Simulated phone screens for practice
│   ├── message-practice.js    # Fictional everyday message examples
│   ├── wallet-sms.js          # Fictional wallet-message examples
│   ├── sms-simulator.js       # Message inbox and message practice screens
│   ├── scam-detector.js       # Explanations for message warning signs
│   ├── teach-back.js          # Follow-up teach-back questions
│   ├── speech.js              # Browser text-to-speech support
│   └── whatsapp.js            # User-initiated progress sharing
└── assets/
    └── images/                # README screenshots and app images
```

The Urdu and English display strings are kept separate from technical identifiers and are selected at runtime. Practice answers are validated by stable option IDs, not by their shuffled screen positions.

## Privacy and safety

- The practice screens are fictional and do not submit forms or contact real services.
- The app does not require an account, backend, or database.
- It does not collect real banking credentials, OTPs, passwords, PINs, personal files, camera input, or microphone input.
- Message links are examples only; the message exercises do not navigate to or load those links.
- Learning progress is stored in this browser’s `localStorage`. It is not uploaded or synchronized across devices. Clearing the browser’s site data removes that local progress.
- WhatsApp sharing opens only after the learner reviews the summary and explicitly chooses to share it.

## Validation

There is no automated test runner configured in this repository. To check JavaScript syntax with Node.js, run this from the project directory:

```powershell
Get-ChildItem .\js\*.js | ForEach-Object { node --check $_.FullName }
```

To check whitespace in the current Git diff:

```powershell
git diff --check
```

## Troubleshooting

- **The page is blank or scripts do not load:** make sure the app is served over HTTP instead of opened directly from disk, and check the browser console.
- **The Urdu font looks different:** the preferred web font is fetched from Google Fonts; an internet connection is needed to download it. The system’s fallback font is used when it cannot load.
- **Urdu speech is unavailable:** speech depends on the browser and installed device voices. Read the displayed Urdu explanation if no Urdu voice is available.
- **Progress is missing on another device or browser:** progress is local to the browser profile where it was created and is not cloud-synced.

## License

No license file is currently included in this repository. Contact the project owner for permission before reusing or redistributing the project.
