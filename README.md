# Ammi ka Practice Phone

A warm, Urdu-first digital literacy simulator for parents to safely practice mobile tasks without risk.

## Features implemented

- Welcoming home dashboard with six guided practice scenarios
- Urdu-first UI with English toggle and RTL support
- Safe phone simulator screens for banking, forms, scam messages, storage, password recovery, and video calls
- Adaptive help engine: full help, hint, and recall stages
- Local progress storage with browser localStorage
- Digital dictionary with Urdu explanations and optional speech feedback
- WhatsApp share flow with consent before opening the message
- Privacy notice that clearly explains no real accounts, no passwords, and no personal data are used

## Run locally

```bash
cd "C:\Users\Supreme-Trader\Downloads\Ek Link, Ek Kaam"
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## How the adaptive help engine works

Each step starts in full-help mode. If a learner completes the step without help, the level reduces for the next attempt. If the learner asks for a hint, reveals the answer, or says they are stuck, that step resets to full assistance so the learner can safely recover and continue.

## Privacy and safety

This app is a learning simulator only. It never uses a real bank account, personal data, device files, camera input, or actual payment systems.

## Testing performed

- JavaScript syntax check with `node --check` on all JavaScript files
- Static review of each scenario flow
- Manual check of the menu, toggle, and accessibility-friendly feedback patterns

## Exact command to run

```bash
cd "C:\Users\Supreme-Trader\Downloads\Ek Link, Ek Kaam" && python -m http.server 8000
```
