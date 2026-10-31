const clueExplanations = {
  pressure: {
    ur: 'جلدی کا دباؤ آپ کو سوچے بغیر کام کرنے پر مجبور کر سکتا ہے۔ پہلے خود تصدیق کریں۔',
    en: 'Pressure to act quickly can stop you from thinking. Check for yourself first.'
  },
  link: {
    ur: 'انجان لنک پر نہ جائیں۔ معلوم ایپ خود کھول کر بات کی تصدیق کریں۔',
    en: 'Do not open an unknown link. Open the app you know yourself to check.'
  },
  secret: {
    ur: 'خفیہ کوڈ یا لفظ کسی کو نہ بتائیں، چاہے وہ کسی ادارے کا نام لے۔',
    en: 'Never share a private code or password, even if someone names an organisation.'
  },
  prize: {
    ur: 'جس انعام کی امید نہ ہو، اس کی بات کو پہلے معلوم ذریعے سے چیک کریں۔',
    en: 'Check an unexpected prize through a trusted source before acting.'
  },
  money: {
    ur: 'انعام یا اکاؤنٹ کے نام پر انجان شخص کو پیسے نہ بھیجیں۔',
    en: 'Do not send money to an unknown person for a prize or account claim.'
  },
  claim: {
    ur: 'صرف ادارے کا نام لینے سے فون کرنے والا اصلی ثابت نہیں ہوتا۔',
    en: 'Saying an organisation’s name does not prove that the caller is genuine.'
  },
  code: {
    ur: 'OTP آپ کے لیے ہوتا ہے۔ اسے فون پر یا پیغام میں نہ بتائیں۔',
    en: 'An OTP is for you. Do not share it by phone or message.'
  },
  'keep-call': {
    ur: 'آپ کو اپنی مرضی سے فون بند کرنے کا حق ہے۔ دباؤ میں نہ آئیں۔',
    en: 'You can end a call whenever you choose. Do not give in to pressure.'
  },
  warning: {
    ur: 'اکاؤنٹ بند ہونے کی جلدی والی دھمکی پر پہلے معلوم ایپ سے تصدیق کریں۔',
    en: 'Check an urgent account-closure threat using an app you already know.'
  },
  'code-request': {
    ur: 'خفیہ کوڈ صرف آپ کے لیے ہے۔ اسے پیغام بھیجنے والے کو نہ دیں۔',
    en: 'A private code is meant for you. Do not give it to the message sender.'
  },
  'bank-claim': {
    ur: 'بینک کا نام لینے سے پیغام بھیجنے والے کی پہچان ثابت نہیں ہوتی۔',
    en: 'Naming a bank does not prove who sent the message.'
  },
  'payment-threat': {
    ur: 'ادائیگی رکنے کی خبر کو پیغام کے لنک کے بجائے معلوم ایپ میں چیک کریں۔',
    en: 'Check a stopped-payment claim in an app you know, not through the message link.'
  },
  'personal-details': {
    ur: 'انجان پیغام میں ذاتی یا خفیہ معلومات نہ بھیجیں۔',
    en: 'Do not send personal or private details in an unknown message.'
  }
};

export function getScamClueExplanation(clueId, language) {
  const explanation = clueExplanations[clueId];
  if (!explanation) {
    return language === 'ur'
      ? 'اس حصے کو دھیان سے دیکھیں اور کسی معلوم ذریعے سے تصدیق کریں۔'
      : 'Look at this part carefully and check through a trusted source.';
  }
  return explanation[language];
}
