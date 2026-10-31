const translations = {
  ur: {
    brandTag: 'Practice with confidence',
    welcomeTag: 'Yahan ghalti karna bilkul safe hai.',
    welcomeTitle: 'Assalam-o-Alaikum Ammi!',
    welcomeText: 'Aaj hum phone ka ek kaam mil kar practice karenge.',
    startPractice: 'Practice shuru karein',
    shareToChild: 'Beta ko apni progress dikhayein',
    progressHeading: 'Progress dashboard',
    progressTitle: 'Shabash Ammi! Aap pehle se behtar kar rahi hain.',
    completedScenarios: 'Completed practice scenarios',
    practiceAttempts: 'Practice attempts',
    independentSteps: 'Steps completed independently',
    needPractice: 'Scenarios that need more practice',
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
    shareConsentText: 'Aap apni progress beta ko WhatsApp par share karna chahte hain?',
    shareConfirm: 'Haan, dekhain',
    shareCancel: 'Nahi',
    safePractice: 'Yeh practice app hai. Is mein koi asli bank account, paisa, password ya personal data istemal nahi hota.'
  },
  en: {
    brandTag: 'Practice with confidence',
    welcomeTag: 'It is completely safe to make mistakes here.',
    welcomeTitle: 'Assalam-o-Alaikum Ammi!',
    welcomeText: 'Today we will practice one phone task together.',
    startPractice: 'Start practice',
    shareToChild: 'Show my progress to my child',
    progressHeading: 'Progress dashboard',
    progressTitle: 'Excellent Ammi! You are improving day by day.',
    completedScenarios: 'Completed practice scenarios',
    practiceAttempts: 'Practice attempts',
    independentSteps: 'Steps completed independently',
    needPractice: 'Scenarios that need more practice',
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
    shareConsentText: 'Would you like to share your progress with your child on WhatsApp?',
    shareConfirm: 'Yes, let us see',
    shareCancel: 'No',
    safePractice: 'This is a practice app. No real bank account, money, password, or personal data is used here.'
  }
};

export function getLanguageLabel(lang) {
  return lang === 'ur' ? 'اردو' : 'English';
}

export function translate(key, lang = 'ur') {
  return translations[lang]?.[key] || translations.ur[key] || key;
}
