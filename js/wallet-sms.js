function warning(id, ur, en, whyUr, whyEn) {
  return {
    id,
    text: { ur, en },
    why: { ur: whyUr, en: whyEn }
  };
}

export const walletMessages = [
  {
    id: 'wallet-jazzcash',
    brand: 'JazzCash',
    sender: 'JZ-CASH-HELP',
    time: '10:24 AM',
    type: 'wallet',
    heading: {
      ur: 'JazzCash کا فرضی پیغام',
      en: 'Fictional JazzCash message'
    },
    opening: {
      ur: 'محترم صارف،',
      en: 'Dear customer,'
    },
    closing: {
      ur: 'اکاؤنٹ کھولنے کے لیے یہ لنک استعمال کریں:',
      en: 'Use this link to keep your account active:'
    },
    warnings: [
      warning(
        'sender',
        'بھیجنے والا: JZ-CASH-HELP',
        'Sender: JZ-CASH-HELP',
        'یہ نام کسی اصلی ادارے کی پہچان ثابت نہیں کرتا۔ صرف نام دیکھ کر بھروسا نہ کریں۔',
        'A sender name does not prove who sent a message. Do not trust a name alone.'
      ),
      warning(
        'urgency',
        'آپ کا اکاؤنٹ ابھی بند ہونے والا ہے!',
        'Your account will be closed right away!',
        'اکاؤنٹ بند ہونے کی جلدی والی دھمکی آپ کو سوچے بغیر قدم اٹھانے پر مجبور کر سکتی ہے۔',
        'A threat that your account will close can pressure you into acting without checking.'
      ),
      warning(
        'otp',
        'اپنا OTP ابھی بھیجیں۔',
        'Send your OTP now.',
        'اصلی ادارے آپ سے OTP یا PIN پیغام میں نہیں مانگتے۔ اسے کبھی نہ بھیجیں۔',
        'A real service should not ask you to send an OTP or PIN in a message. Never share it.'
      ),
      warning(
        'link',
        'wallet-check.invalid',
        'wallet-check.invalid',
        'یہ فرضی اور انجان پتہ ہے۔ اس پر نہ جائیں؛ سروس خود اس کی اصلی ایپ میں کھولیں۔',
        'This is a fictional, unknown address. Do not open it; check the service in its known app.'
      )
    ],
    explanation: {
      ur: 'یہ صرف فرضی تربیتی پیغام ہے، JazzCash کا اصلی پیغام نہیں۔ اکاؤنٹ کی دھمکی، کوڈ مانگنا اور انجان لنک خطرے کی نشانیاں ہیں۔',
      en: 'This is a fictional training example, not a real JazzCash message. The threat, code request, and unknown link are warning signs.'
    },
    safeSegments: {
      ur: 'صرف پیغام میں برانڈ کا نام ہونا اسے اصلی ثابت نہیں کرتا۔',
      en: 'A brand name written in a message does not prove it is genuine.'
    }
  },
  {
    id: 'wallet-easypaisa',
    brand: 'Easypaisa',
    sender: 'EP-REWARD-ALERT',
    time: '11:06 AM',
    type: 'wallet',
    heading: {
      ur: 'Easypaisa کا فرضی پیغام',
      en: 'Fictional Easypaisa message'
    },
    opening: {
      ur: 'مبارک ہو!',
      en: 'Congratulations!'
    },
    closing: {
      ur: 'انعام لینے کے لیے یہاں تصدیق کریں:',
      en: 'Verify here to claim your prize:'
    },
    warnings: [
      warning(
        'prize',
        'آپ نے خصوصی انعام جیت لیا ہے!',
        'You have won a special prize!',
        'ایسے انعام کا دعویٰ جس کی آپ نے توقع نہ کی ہو، احتیاط سے چیک کریں۔',
        'Carefully check a prize claim that you were not expecting.'
      ),
      warning(
        'personal-details',
        'انعام کے لیے اپنی خفیہ معلومات دیں۔',
        'Give your private details to claim it.',
        'خفیہ معلومات انجان پیغام میں دینا محفوظ نہیں۔',
        'It is not safe to give private details in an unknown message.'
      ),
      warning(
        'otp',
        'اپنا OTP فوراً بھیجیں۔',
        'Send your OTP immediately.',
        'OTP صرف آپ کے لیے ہوتا ہے۔ اسے کسی شخص یا پیغام میں نہ بتائیں۔',
        'An OTP is for you only. Do not share it with a person or message.'
      ),
      warning(
        'link',
        'easypaisa-reward.invalid',
        'easypaisa-reward.invalid',
        'یہ فرضی اور انجان پتہ ہے۔ تصدیق کے لیے پیغام کا لنک نہ کھولیں۔',
        'This is a fictional, unknown address. Do not use the message link to verify.'
      )
    ],
    explanation: {
      ur: 'یہ صرف فرضی تربیتی پیغام ہے، Easypaisa کا اصلی پیغام نہیں۔ اچانک انعام، خفیہ معلومات مانگنا اور انجان لنک خطرے کی نشانیاں ہیں۔',
      en: 'This is a fictional training example, not a real Easypaisa message. The unexpected prize, private-detail request, and unknown link are warning signs.'
    },
    safeSegments: {
      ur: 'مبارک باد کے الفاظ خود دھوکے کا ثبوت نہیں، مگر اچانک انعام کو ضرور چیک کریں۔',
      en: 'A congratulatory message alone does not prove a scam, but check an unexpected prize carefully.'
    }
  }
];
