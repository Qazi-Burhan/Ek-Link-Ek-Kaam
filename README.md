# Phone Practice

A warm, Urdu-first digital literacy simulator for adults to safely practise everyday phone tasks.

## Features

- Six safe practice scenarios, each with five decision-making questions
- Urdu-first interface with English toggle and right-to-left layout
- Neutral answer options shuffled independently at the beginning of each scenario session
- Gentle explanations after a choice, including an opportunity to retry after an incorrect answer
- Adaptive assistance per question: full help, hint, and recall
- Local learning progress saved in browser localStorage
- Everyday-language digital dictionary with optional speech
- WhatsApp progress sharing only after explicit consent
- No real accounts, passwords, personal information, files, camera, or microphone are used

## Run locally

From the project directory, run:

```powershell
python -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000).

## Adaptive help and answer order

Each question keeps its own help level and usage history. A first-try correct answer without help lowers that question’s help level for the next practice. Asking for a hint, revealing the answer, or getting stuck resets that question to full assistance. Correct answers are checked by their stable option IDs, not by their displayed positions. Options are shuffled once per question when a new scenario session begins and remain in that order while the question is open.

## Privacy and safety

This is a fictional learning simulator. It never submits real forms, connects to financial or government services, or accesses personal device data. Learning progress stays in local browser storage. WhatsApp sharing requires a user confirmation and contains only a short aggregate summary.

## Validation

Run syntax checks for the JavaScript modules with:

```powershell
Get-ChildItem .\js\*.js | ForEach-Object { node --check $_.FullName }
```
