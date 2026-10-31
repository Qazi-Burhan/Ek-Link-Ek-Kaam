function segment(id, ur, en, clue = null) {
  return { id, text: { ur, en }, clue };
}

function clue(id, ur, en) {
  return { id, label: { ur, en } };
}

export const messageExamples = [
  {
    id: 'account-warning',
    sender: { ur: 'نامعلوم نمبر', en: 'Unknown number' },
    segments: [
      segment('warning', 'آپ کا اکاؤنٹ بند ہو جائے گا!', 'Your account will be closed!', 'pressure'),
      segment('unknown-link', 'ابھی انجان لنک کھولیں', 'Open this unknown link now', 'link'),
      segment('code-request', 'اپنا خفیہ کوڈ بھیجیں۔', 'Send your secret code.', 'secret')
    ],
    clues: [
      clue('pressure', 'جلدی کا دباؤ', 'Pressure to act quickly'),
      clue('link', 'انجان لنک', 'Unknown link'),
      clue('secret', 'خفیہ کوڈ مانگنا', 'Asking for a secret code')
    ],
    context: {
      ur: 'پیغام کو غور سے دیکھیں۔',
      en: 'Take a careful look at the message.'
    },
    hint: {
      ur: 'جلدی، انجان لنک اور خفیہ معلومات مانگنے والی باتیں دیکھیں۔',
      en: 'Look for urgency, an unknown link, and a request for private details.'
    },
    answer: {
      ur: 'یہ پیغام فرضی اور مشکوک ہے۔ اس کے دباؤ، انجان لنک اور کوڈ مانگنے والی بات کو پہچانیں۔',
      en: 'This fictional message is suspicious. Notice its pressure, unknown link, and request for a code.'
    },
    feedback: {
      ur: 'درست پہچانا۔ جلدی کا دباؤ، انجان لنک اور خفیہ کوڈ مانگنا خطرے کی نشانیاں ہیں۔',
      en: 'Well spotted. Pressure, an unknown link, and a request for a secret code are warning signs.'
    }
  },
  {
    id: 'unexpected-prize',
    sender: { ur: 'انعامی اطلاع', en: 'Prize notice' },
    segments: [
      segment('prize', 'آپ نے بڑا انعام جیتا ہے!', 'You have won a big prize!', 'prize'),
      segment('personal-details', 'انعام لینے کے لیے اپنی خفیہ معلومات بھیجیں۔', 'Send your private details to claim it.', 'secret'),
      segment('fee', 'پہلے تھوڑی سی رقم جمع کریں۔', 'Pay a small fee first.', 'money')
    ],
    clues: [
      clue('prize', 'اچانک انعام', 'Unexpected prize'),
      clue('secret', 'خفیہ معلومات مانگنا', 'Asking for private details'),
      clue('money', 'پیسے مانگنا', 'Asking for money')
    ],
    context: {
      ur: 'سوچیں کہ یہ پیغام آپ سے کیا مانگ رہا ہے۔',
      en: 'Think about what this message is asking you to do.'
    },
    hint: {
      ur: 'اچانک ملنے والے انعام، خفیہ معلومات یا پیسوں کی بات دیکھیں۔',
      en: 'Look for an unexpected prize, private details, or money.'
    },
    answer: {
      ur: 'یہ فرضی انعامی پیغام مشکوک ہے۔ انعام کے نام پر خفیہ معلومات یا پیسے نہ بھیجیں۔',
      en: 'This fictional prize message is suspicious. Do not send private details or money for a prize.'
    },
    feedback: {
      ur: 'بالکل۔ انعام کے لیے پہلے پیسے یا خفیہ معلومات مانگنا خطرے کی بات ہے۔',
      en: 'Exactly. Asking for money or private details to claim a prize is a warning sign.'
    }
  },
  {
    id: 'caller-code',
    sender: { ur: 'فون پر بات کرنے والا', en: 'Caller' },
    segments: [
      segment('bank-claim', 'میں بینک سے بات کر رہا ہوں۔', 'I am calling from your bank.', 'claim'),
      segment('code', 'ابھی آیا ہوا کوڈ مجھے بتائیں۔', 'Tell me the code you just received.', 'code'),
      segment('keep-call', 'فون بند نہ کریں۔', 'Do not end the call.', 'pressure')
    ],
    clues: [
      clue('claim', 'ادارے کا نام لے کر بات کرنا', 'Claiming to represent an organisation'),
      clue('code', 'کوڈ مانگنا', 'Asking for a code'),
      clue('pressure', 'فون بند نہ کرنے کا دباؤ', 'Pressure to stay on the call')
    ],
    context: {
      ur: 'دیکھیں کہ بات کرنے والا آپ سے کیا چاہتا ہے۔',
      en: 'Notice what the caller wants from you.'
    },
    hint: {
      ur: 'کوئی بھی شخص فون پر کوڈ مانگے تو اسے نہ بتائیں۔',
      en: 'Never share a code with someone who asks for it on a call.'
    },
    answer: {
      ur: 'اپنا کوڈ نہ بتائیں۔ فون بند کریں اور ضرورت ہو تو ادارے کے معلوم نمبر پر خود رابطہ کریں۔',
      en: 'Do not share your code. End the call and contact the organisation using a number you already know.'
    },
    feedback: {
      ur: 'صحیح۔ کسی کے ادارے کا نام لینے سے اس کی بات سچی ثابت نہیں ہوتی۔',
      en: 'Correct. Naming an organisation does not prove that the caller is genuine.'
    }
  },
  {
    id: 'blocked-payment',
    sender: { ur: 'نامعلوم ادائیگی پیغام', en: 'Unknown payment message' },
    segments: [
      segment('payment-threat', 'آپ کی ادائیگی رک گئی ہے۔', 'Your payment has been stopped.', 'pressure'),
      segment('fake-fix', 'مسئلہ حل کرنے کے لیے انجان صفحہ کھولیں۔', 'Open an unknown page to fix it.', 'link'),
      segment('password', 'وہاں اپنا خفیہ لفظ لکھیں۔', 'Enter your secret password there.', 'secret')
    ],
    clues: [
      clue('pressure', 'پریشان کرنے والی خبر', 'A worrying claim'),
      clue('link', 'انجان صفحہ', 'Unknown page'),
      clue('secret', 'خفیہ لفظ مانگنا', 'Asking for a password')
    ],
    context: {
      ur: 'پیغام آپ کو کہاں جانے اور کیا لکھنے کو کہہ رہا ہے؟',
      en: 'Where does the message ask you to go, and what does it ask you to enter?'
    },
    hint: {
      ur: 'انجان صفحہ اور خفیہ لفظ مانگنے والی بات پہچانیں۔',
      en: 'Look for the unknown page and the request for a password.'
    },
    answer: {
      ur: 'انجان صفحہ نہ کھولیں اور اپنا خفیہ لفظ نہ لکھیں۔ ضرورت ہو تو معلوم ایپ خود کھولیں۔',
      en: 'Do not open the unknown page or enter your password. If needed, open the app you already know yourself.'
    },
    feedback: {
      ur: 'اچھا کیا۔ انجان صفحے پر خفیہ لفظ مانگنا خطرے کی نشانی ہے۔',
      en: 'Good catch. Asking for a password on an unknown page is a warning sign.'
    }
  },
  {
    id: 'class-reminder',
    sender: { ur: 'محفوظ کلاس گروپ', en: 'Known class group' },
    segments: [
      segment('class-time', 'کل کی کلاس شام پانچ بجے ہے۔', 'Tomorrow’s class is at five in the evening.'),
      segment('class-place', 'ملتے ہیں، آپ سب کا انتظار رہے گا۔', 'See you there. We look forward to seeing everyone.')
    ],
    clues: [],
    context: {
      ur: 'ہر پیغام دھوکا نہیں ہوتا۔ دیکھیں کہ اس میں کوئی خفیہ بات یا پیسے تو نہیں مانگے گئے۔',
      en: 'Not every message is a scam. Check whether it asks for private details or money.'
    },
    hint: {
      ur: 'اس پیغام میں نہ انجان لنک ہے، نہ پیسے یا خفیہ معلومات کی فرمائش۔',
      en: 'This message has no unknown link and asks for no money or private details.'
    },
    answer: {
      ur: 'اس معمول کی اطلاع میں کوئی واضح خطرے کی بات نہیں۔ پھر بھی بھیجنے والے کو پہچاننا ضروری ہے۔',
      en: 'There is no clear warning sign in this ordinary reminder. Still, check that you know the sender.'
    },
    feedback: {
      ur: 'درست۔ ہر پیغام خطرناک نہیں ہوتا، لیکن بھیجنے والے کو پہچاننا ضروری ہے۔',
      en: 'Correct. Not every message is dangerous, but it is important to know the sender.'
    }
  }
];
