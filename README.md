# Phone Practice

A warm, Urdu-first digital literacy simulator for adults to safely practise everyday phone tasks.

## Features

- Six safe practice scenarios, each with five decision-making questions
- Five fictional message examples in the scam-identification scenario; tap warning signs without opening links
- Two optional teach-back questions for every scenario, with completion tracked separately
- A simple word guide available from both the home screen and practice screens
- Urdu-first interface with English toggle and right-to-left layout
- Neutral answer options shuffled independently at the beginning of each scenario session
- Gentle explanations after a choice, including an opportunity to retry after an incorrect answer
- Adaptive assistance per question: full help, hint, and recall
- Local learning progress saved in browser localStorage, including the active question and its stable answer order
- Everyday-language digital dictionary with optional speech
- WhatsApp progress sharing only after explicit consent
- Review or copy the short progress summary before sharing
- No real accounts, passwords, personal information, files, camera, or microphone are used

## Run locally

From the project directory, run:

```powershell
python -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000).

## Adaptive help and answer order

Each question keeps its own help level and usage history. A first-try correct answer without help lowers that question’s help level for the next practice. Asking for a hint, revealing the answer, or getting stuck resets that question to full assistance. The teach-back questions and message-identification activity use the same help tracking. Correct answers are checked by stable option IDs, not by displayed positions. Options are shuffled once per question when a new session begins and remain in that order while the question is open.

The message activity uses fictional, non-clickable message parts. Four examples show common warning signs and one is an ordinary reminder for comparison. No message is sent or loaded from the internet. Teach-back completion and reviewed message examples are saved locally, separately from the six core scenario completions.

## Privacy and safety

This is a fictional learning simulator. It never submits real forms, connects to financial or government services, opens message links, or accesses personal device data. Learning progress stays in local browser storage. WhatsApp sharing requires a user confirmation; the short summary can be reviewed and copied before opening WhatsApp.

## Validation

Run syntax checks for the JavaScript modules with:

```powershell
Get-ChildItem .\js\*.js | ForEach-Object { node --check $_.FullName }
```
