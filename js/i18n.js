const LANGUAGE_KEY = 'ek-link-ek-kaam.language';

const translations = {
  en: {
    brandTagline: 'Digital independence',
    brandName: 'Ek Link, Ek Kaam',
    languageControl: 'Language',
    createGuide: 'Create a guide',
    heroTag: 'Less help, more independence',
    heroTitle: 'Help parents learn digital tasks with confidence',
    heroDescription: 'Create a simple guide, share it on WhatsApp, and teach one step at a time. Guidance gradually reduces as confidence grows.',
    demoGuides: 'Ready-to-use guides',
    demoHeading: 'Try a sample guide',
    steps: 'steps',
    startGuide: 'Start guide',
    privacy: 'Privacy',
    privacyStatement: 'Guide content is included in its shareable link. Learning progress is saved only on the parent’s device.',
    howToUse: 'How it works',
    howStep1: 'Choose a guide or create your own.',
    howStep2: 'Share the link with WhatsApp.',
    howStep3: 'Learn one step at a time.',
    howStep4: 'Get less help as confidence grows.',
    howHeadline: 'Madad Kam Karte Jao',
    howSubtitle: 'Learn by doing, one step at a time.',
    newGuide: 'Create a new guide',
    creator: 'Guide creator',
    safety: 'Safety reminder',
    safetyText: 'Never include OTPs, passwords, PINs or card numbers.',
    guideTitle: 'Guide title',
    guideTitleEn: 'Guide title (English)',
    guideTitleUr: 'Guide title (Urdu)',
    guideDescription: 'Description (optional)',
    guideDescriptionEn: 'Description (English)',
    guideDescriptionUr: 'Description (Urdu)',
    guideDescriptionPlaceholder: 'What will this guide help someone do?',
    stepsHeading: 'Guide steps',
    addStep: 'Add a step',
    stepTitleEn: 'Step title (English)',
    stepTitleUr: 'Step title (Urdu)',
    instructionEn: 'Instruction (English)',
    instructionUr: 'Instruction (Urdu)',
    hintEn: 'Optional hint (English)',
    hintUr: 'Optional hint (Urdu)',
    emoji: 'Emoji',
    moveUp: 'Move step up',
    moveDown: 'Move step down',
    deleteStep: 'Delete step',
    createLink: 'Create share link',
    resetForm: 'Start over',
    preview: 'Live preview',
    guidePreview: 'Your guide preview',
    linkTitle: 'Your guide link',
    shareableGuideUrl: 'Shareable guide URL',
    linkDescription: 'The guide travels in this link; progress stays on the learner’s device.',
    copyLink: 'Copy link',
    copied: 'Copied!',
    copyFailed: 'Could not copy automatically. Select and copy the link.',
    shareWhatsApp: 'Share on WhatsApp',
    close: 'Close',
    stepsMinError: 'A guide needs at least 2 steps.',
    stepsMaxError: 'A guide can have no more than 15 steps.',
    guideTitleError: 'Enter a guide title in English or Urdu.',
    stepRequiredError: 'Each step needs a title and instruction in at least one language.',
    invalidGuide: 'This guide link is missing, invalid, or unsupported.',
    home: 'Home',
    playGuide: 'Guide',
    stepOf: 'Step {current} of {total}',
    guideProgress: 'Guide progress',
    fullHelp: 'Full guidance',
    hintMode: 'Hint',
    recallMode: 'Recall',
    speak: '🔊 Listen',
    showHint: 'Show hint',
    showAnswer: 'Show answer',
    showFullHelp: 'Show help',
    done: '✅ Done',
    stuck: '🆘 I need help',
    back: '⬅️ Back',
    resetProgress: 'Reset learning progress',
    resetConfirm: 'Reset this guide’s learning progress on this device?',
    answerPrompt: 'What should you do next?',
    hintOpened: 'Here is a helpful hint.',
    answerOpened: 'Here is the full instruction.',
    voiceUnavailable: 'No suitable English or Urdu voice is available on this device.',
    speaking: 'Speaking…',
    askHelpTitle: 'Ask someone for help?',
    send: 'Send',
    cancel: 'Cancel',
    helpMessage: 'I am stuck on “{step}” in “{guide}”. Could you please help me?',
    completionTitle: 'You did it yourself! 🎉',
    completionMessage: 'Wonderful work. You completed the guide.',
    completedSteps: 'Steps completed: {count} of {total}',
    independentSteps: 'Steps completed without opening help: {count}',
    learningSummary: 'Each step keeps its own help level, so you can keep building confidence at your own pace.',
    restartGuide: 'Restart guide',
    shareProgress: 'Share progress on WhatsApp',
    level: 'Help level {level} of 3',
    error: 'Something went wrong. Please try again.',
    qrAlt: 'QR code for the guide link',
    previewEmpty: 'Add a title and steps to see your guide here.',
    backHome: 'Return home',
    resetDone: 'Learning progress has been reset.',
    whatsappHelpReady: 'Your help message is ready. Review it in WhatsApp before sending.',
    unsupportedVersion: 'This guide was created with an unsupported version.'
  },
  ur: {
    brandTagline: 'ڈیجیٹل خودمختاری',
    brandName: 'Ek Link, Ek Kaam',
    languageControl: 'زبان',
    createGuide: 'گائیڈ بنائیں',
    heroTag: 'کم مدد، زیادہ خودمختاری',
    heroTitle: 'والدین کو ڈیجیٹل کام اعتماد سے سکھائیں',
    heroDescription: 'ایک آسان گائیڈ بنائیں، اسے WhatsApp پر بھیجیں، اور ایک وقت میں ایک قدم سکھائیں۔ اعتماد بڑھنے کے ساتھ مدد کم ہوتی جائے گی۔',
    demoGuides: 'تیار گائیڈز',
    demoHeading: 'نمونہ گائیڈ آزمائیں',
    steps: 'قدم',
    startGuide: 'گائیڈ شروع کریں',
    privacy: 'رازداری',
    privacyStatement: 'گائیڈ کا مواد اس کے شیئر کیے جانے والے لنک میں شامل ہوتا ہے۔ سیکھنے کی پیش رفت صرف سیکھنے والے کے آلے پر محفوظ ہوتی ہے۔',
    howToUse: 'طریقۂ استعمال',
    howStep1: 'گائیڈ منتخب کریں یا خود بنائیں۔',
    howStep2: 'لنک WhatsApp پر بھیجیں۔',
    howStep3: 'ایک وقت میں ایک قدم سیکھیں۔',
    howStep4: 'اعتماد بڑھنے پر مدد کم ہوتی جائے گی۔',
    howHeadline: 'مدد کم کرتے جائیں',
    howSubtitle: 'ایک وقت میں ایک قدم، خود سیکھیں۔',
    newGuide: 'نئی گائیڈ بنائیں',
    creator: 'گائیڈ ساز',
    safety: 'حفاظتی یاد دہانی',
    safetyText: 'OTP، Password، PIN یا Card Number کبھی شامل نہ کریں۔',
    guideTitle: 'گائیڈ کا عنوان',
    guideTitleEn: 'گائیڈ کا عنوان (English)',
    guideTitleUr: 'گائیڈ کا عنوان (اردو)',
    guideDescription: 'تفصیل (اختیاری)',
    guideDescriptionEn: 'تفصیل (English)',
    guideDescriptionUr: 'تفصیل (اردو)',
    guideDescriptionPlaceholder: 'یہ گائیڈ کس کام میں مدد دے گی؟',
    stepsHeading: 'گائیڈ کے قدم',
    addStep: 'قدم شامل کریں',
    stepTitleEn: 'قدم کا عنوان (English)',
    stepTitleUr: 'قدم کا عنوان (اردو)',
    instructionEn: 'ہدایت (English)',
    instructionUr: 'ہدایت (اردو)',
    hintEn: 'اختیاری اشارہ (English)',
    hintUr: 'اختیاری اشارہ (اردو)',
    emoji: 'ایموجی',
    moveUp: 'قدم اوپر کریں',
    moveDown: 'قدم نیچے کریں',
    deleteStep: 'قدم حذف کریں',
    createLink: 'شیئر لنک بنائیں',
    resetForm: 'دوبارہ شروع کریں',
    preview: 'لائیو پیش منظر',
    guidePreview: 'آپ کی گائیڈ کا پیش منظر',
    linkTitle: 'آپ کی گائیڈ کا لنک',
    shareableGuideUrl: 'شیئر کرنے کے لیے گائیڈ کا لنک',
    linkDescription: 'گائیڈ اس لنک میں موجود ہے؛ سیکھنے کی پیش رفت سیکھنے والے کے آلے پر رہتی ہے۔',
    copyLink: 'لنک کاپی کریں',
    copied: 'کاپی ہوگیا!',
    copyFailed: 'خودکار کاپی نہیں ہوسکی۔ لنک منتخب کرکے کاپی کریں۔',
    shareWhatsApp: 'WhatsApp پر بھیجیں',
    close: 'بند کریں',
    stepsMinError: 'گائیڈ میں کم از کم 2 قدم ضروری ہیں۔',
    stepsMaxError: 'گائیڈ میں زیادہ سے زیادہ 15 قدم ہوسکتے ہیں۔',
    guideTitleError: 'English یا اردو میں گائیڈ کا عنوان درج کریں۔',
    stepRequiredError: 'ہر قدم کے لیے کم از کم ایک زبان میں عنوان اور ہدایت ضروری ہے۔',
    invalidGuide: 'یہ گائیڈ لنک غائب، خراب یا غیر معاون ہے۔',
    home: 'صفحۂ اول',
    playGuide: 'گائیڈ',
    stepOf: 'قدم {current} از {total}',
    guideProgress: 'گائیڈ کی پیش رفت',
    fullHelp: 'مکمل رہنمائی',
    hintMode: 'اشارہ',
    recallMode: 'یادداشت',
    speak: '🔊 سنیں',
    showHint: 'اشارہ دیکھیں',
    showAnswer: 'جواب دیکھیں',
    showFullHelp: 'مدد دیکھیں',
    done: '✅ ہوگیا',
    stuck: '🆘 مدد چاہیے',
    back: '⬅️ واپس',
    resetProgress: 'سیکھنے کی پیش رفت دوبارہ ترتیب دیں',
    resetConfirm: 'کیا اس آلے پر اس گائیڈ کی سیکھنے کی پیش رفت مٹانی ہے؟',
    answerPrompt: 'اگلا کام کیا ہے؟',
    hintOpened: 'یہ رہا ایک مددگار اشارہ۔',
    answerOpened: 'یہ رہی مکمل ہدایت۔',
    voiceUnavailable: 'اس آلے پر مناسب اردو یا English آواز دستیاب نہیں۔',
    speaking: 'آواز چل رہی ہے…',
    askHelpTitle: 'کسی سے مدد مانگیں؟',
    send: 'بھیجیں',
    cancel: 'نہیں',
    helpMessage: 'مجھے “{guide}” میں “{step}” کے قدم پر مدد چاہیے۔ کیا آپ میری مدد کرسکتے ہیں؟',
    completionTitle: 'آپ نے یہ خود کیا! 🎉',
    completionMessage: 'بہت خوب! آپ نے گائیڈ مکمل کرلی۔',
    completedSteps: 'مکمل کیے گئے قدم: {count} از {total}',
    independentSteps: 'مدد کھولے بغیر مکمل کیے گئے قدم: {count}',
    learningSummary: 'ہر قدم کی مدد الگ سے کم ہوتی ہے، تاکہ آپ اپنی رفتار سے اعتماد بڑھا سکیں۔',
    restartGuide: 'گائیڈ دوبارہ شروع کریں',
    shareProgress: 'WhatsApp پر پیش رفت بھیجیں',
    level: 'مدد کی سطح {level} از 3',
    error: 'کچھ مسئلہ پیش آیا۔ دوبارہ کوشش کریں۔',
    qrAlt: 'گائیڈ لنک کا QR کوڈ',
    previewEmpty: 'اپنی گائیڈ دیکھنے کے لیے عنوان اور قدم شامل کریں۔',
    backHome: 'صفحۂ اول پر جائیں',
    resetDone: 'سیکھنے کی پیش رفت دوبارہ ترتیب دے دی گئی۔',
    whatsappHelpReady: 'مدد کا پیغام تیار ہے۔ WhatsApp میں اسے دیکھ کر بھیجیں۔',
    unsupportedVersion: 'یہ گائیڈ غیر معاون ورژن میں بنائی گئی ہے۔'
  }
};

function storedLanguage() {
  try {
    return localStorage.getItem(LANGUAGE_KEY) === 'en' ? 'en' : 'ur';
  } catch (error) {
    console.warn('Could not read the saved language preference.', error);
    return 'ur';
  }
}

let currentLanguage = storedLanguage();

export function getLanguage() {
  return currentLanguage;
}

export function t(key, values = {}) {
  let text = translations[currentLanguage][key] || translations.en[key] || key;
  for (const [name, value] of Object.entries(values)) {
    text = text.replaceAll(`{${name}}`, String(value));
  }
  return text;
}

export function localized(value, fallback = '') {
  if (typeof value === 'string') return value || fallback;
  if (!value || typeof value !== 'object') return fallback;
  return value[currentLanguage] || value.en || value.ur || fallback;
}

export function localizedLanguage(value) {
  if (typeof value === 'string') return currentLanguage;
  if (value && value[currentLanguage]) return currentLanguage;
  if (value?.en) return 'en';
  return 'ur';
}

export function setLanguage(language) {
  if (language !== 'en' && language !== 'ur') return;
  currentLanguage = language;
  try {
    localStorage.setItem(LANGUAGE_KEY, language);
  } catch (error) {
    console.warn('Could not save the language preference.', error);
  }

  document.documentElement.lang = language;
  document.documentElement.dir = language === 'ur' ? 'rtl' : 'ltr';
  document.body.dataset.language = language;

  document.querySelectorAll('[data-i18n]').forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach((element) => {
    element.placeholder = t(element.dataset.i18nPlaceholder);
  });
  document.querySelectorAll('[data-i18n-aria-label]').forEach((element) => {
    element.setAttribute('aria-label', t(element.dataset.i18nAriaLabel));
  });
  document.querySelectorAll('.language-switch [data-language]').forEach((button) => {
    const active = button.dataset.language === language;
    button.setAttribute('aria-pressed', String(active));
    button.classList.toggle('is-active', active);
  });
  window.dispatchEvent(new CustomEvent('app-language-change', { detail: { language } }));
}

export function initI18n() {
  document.querySelectorAll('.language-switch [data-language]').forEach((button) => {
    button.addEventListener('click', () => setLanguage(button.dataset.language));
  });
  setLanguage(currentLanguage);
}

export const languageNames = { en: 'English', ur: 'اردو' };
