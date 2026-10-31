const translations = {
  ur: {
    brandTag: 'Safe digital practice',
    welcomeTag: 'Yahan ghalti karna bilkul mehfooz hai.',
    welcomeTitle: 'السلام علیکم!',
    welcomeText: 'Aaiye, aaj phone ka ek kaam khud practice karte hain.',
    startPractice: 'Practice shuru karein',
    shareToChild: 'Apni progress share karein',
    progressHeading: 'Progress dashboard',
    progressTitle: 'Shabash! Aap bohat achha seekh rahe hain.',
    completedScenarios: 'Completed practice scenarios',
    practiceAttempts: 'Practice attempts',
    independentSteps: 'Steps completed independently',
    needPractice: 'Scenarios that need more practice',
    attempts: 'practice',
    completed: 'Completed',
    ready: 'Ready',
    correctAnswer: 'Sahi jawab:',
    chooseTask: 'Choose a task',
    learnScenarios: 'Practice scenarios',
    backHome: 'Back to home',
    madadTitle: 'Madad Kam Karte Jao',
    dictionaryTitle: 'Digital dictionary',
    hintBtn: 'Hint',
    answerBtn: 'Answer',
    stuckBtn: 'Atak gayein',
    privacy: 'Privacy',
    speak: 'Speak',
    shareConsentTitle: 'Progress share',
    shareConsentText: 'Kya aap apni yeh mukhtasar progress WhatsApp par share karna chahte hain?',
    shareConfirm: 'Haan, share karein',
    shareCancel: 'Abhi nahi',
    safePractice: 'Yeh practice app hai. Is mein koi asli bank account, paisa, password ya personal data istemal nahi hota.'
  },
  en: {
    brandTag: 'Safe digital practice',
    welcomeTag: 'It is safe to make mistakes here.',
    welcomeTitle: 'Assalam-o-Alaikum!',
    welcomeText: 'Let us practice one phone task at your own pace.',
    startPractice: 'Start practice',
    shareToChild: 'Share my progress',
    progressHeading: 'Progress dashboard',
    progressTitle: 'Well done! You are learning at your own pace.',
    completedScenarios: 'Completed practice scenarios',
    practiceAttempts: 'Practice attempts',
    independentSteps: 'Steps completed independently',
    needPractice: 'Scenarios that need more practice',
    attempts: 'practice',
    completed: 'Completed',
    ready: 'Ready',
    correctAnswer: 'Correct answer:',
    chooseTask: 'Choose a task',
    learnScenarios: 'Practice scenarios',
    backHome: 'Back to home',
    madadTitle: 'Madad Kam Karte Jao',
    dictionaryTitle: 'Digital dictionary',
    hintBtn: 'Hint',
    answerBtn: 'Answer',
    stuckBtn: 'I am stuck',
    privacy: 'Privacy',
    speak: 'Speak',
    shareConsentTitle: 'Progress share',
    shareConsentText: 'Would you like to share this short progress summary on WhatsApp?',
    shareConfirm: 'Yes, share',
    shareCancel: 'Not now',
    safePractice: 'This is a practice app. No real bank account, money, password, or personal data is used here.'
  }
};

export function getLanguageLabel(lang) {
  return lang === 'ur' ? 'اردو' : 'English';
}

export function translate(key, lang = 'ur') {
  return translations[lang]?.[key] || translations.ur[key] || key;
}
