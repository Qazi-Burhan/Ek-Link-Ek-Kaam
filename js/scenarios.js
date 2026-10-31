export const dictionaryEntries = {
  OTP: {
    ur: 'OTP ek din ki chabi hoti hai. Isay kisi ke saath share nahi karna chahiye.',
    en: 'An OTP is a one-time key. Never share it with anyone.'
  },
  Verify: {
    ur: 'Verify ka matlab hai ke aap hi account use kar rahi hain. Apni identity ko check karna.',
    en: 'Verify means confirming that you are the one using the account.'
  },
  Update: {
    ur: 'Update ka matlab app ka naya version install karna hai. Yani security aur features improve hote hain.',
    en: 'Update means installing a newer version of the app to improve security and features.'
  },
  Login: {
    ur: 'Login ka matlab account mein entry lena. Is ke liye apna password ya PIN use hota hai.',
    en: 'Login means entering your account. You use your password or PIN to access it.'
  },
  Logout: {
    ur: 'Logout ka matlab account se safe taur par bahar aana. Aisy apps mein aapki safety ke liye zaroori hota hai.',
    en: 'Logout means safely leaving an account so your information stays protected.'
  },
  Password: {
    ur: 'Password aapke account ki private chabi hoti hai. Isay kisi ke saath share nahi karna chahiye.',
    en: 'A password is a private key for your account. Never share it.'
  },
  Storage: {
    ur: 'Storage phone par saved files, photos aur videos ka jagah hota hai. Jab storage full ho to kuch files ko review karna zaroori hota hai.',
    en: 'Storage is the space used for photos, videos, and files on the phone.'
  },
  Permission: {
    ur: 'Permission ka matlab app ko aap ki camera, mic, ya files tak access dena. Har permission ko samajh kar hi dena chahiye.',
    en: 'Permission means allowing an app to use parts of your phone, like the camera or mic.'
  },
  Backup: {
    ur: 'Backup ka matlab zaroori cheezon ki extra copy banana. Agar kuch khatam ho jaye to aap phir se use kar sakti hain.',
    en: 'Backup means keeping an extra copy of important information.'
  },
  Link: {
    ur: 'Link ek website ya page ka address hota hai. Unknown link par click karne se pahle sochna chahiye.',
    en: 'A link is a website address. Be careful before tapping unknown links.'
  }
};

export const scenarioCatalog = [
  {
    id: 'bank-logout',
    icon: '🏦',
    title: { ur: 'بینک ایپ سے لاگ آؤٹ', en: 'Bank App Logout' },
    short: {
      ur: 'Session expire hone par safe logout samjhein.',
      en: 'Learn how to leave a bank app safely when the session expires.'
    },
    steps: [
      {
        id: 'bank-step-1',
        title: { ur: 'Session expire hua', en: 'Session expired' },
        promptUr: 'Aaj kothe button ko dabana chahiye?',
        promptEn: 'Which action should you choose today?',
        instructionUr: 'Agar app mein session expire ho gayi ho to aap ko safe logout karna chahiye. Password ya OTP share nahi karna.',
        instructionEn: 'If the app session expires, choose a safe logout and never share your password or OTP.',
        hintUr: 'Yeh button aapko safe home screen par wapas le jata hai. App ke andar account ko band karna hi sahi hai.',
        hintEn: 'This button returns you safely to the home screen and closes the account session. That is the correct action.',
        answerUr: 'Sahi jawab: Log Out / لاگ آؤٹ',
        answerEn: 'Correct action: Log Out',
        options: [
          { id: 'logout', labelUr: 'لاگ آؤٹ', labelEn: 'Log Out' },
          { id: 'delete', labelUr: 'حساب حذف', labelEn: 'Delete account' },
          { id: 'update', labelUr: 'اپ ڈیٹ', labelEn: 'Update' },
          { id: 'share', labelUr: 'OTP شیئر', labelEn: 'Share OTP' }
        ],
        correctAction: 'logout'
      },
      {
        id: 'bank-step-2',
        title: { ur: 'بیک اپ کا خیال', en: 'Stay safe' },
        promptUr: 'Agar app khud log out ho jaye to kya karna chahiye?',
        promptEn: 'When the app logs you out automatically, what should you do?',
        instructionUr: 'App se bahar aane ke baad phir se trusted login par ja kar apna account zaroor check karna chahiye.',
        instructionEn: 'Once you are safely logged out, re-open the app only through the official login and check your account calmly.',
        hintUr: 'Trusted login ka matlab official app hi open karna. Unknown links ya popup par click na karna.',
        hintEn: 'Use the official login and avoid unknown links or pop-ups.',
        answerUr: 'Sahi jawab: Official app se dobara login karna',
        answerEn: 'Correct action: Re-open the official app and login safely',
        options: [
          { id: 'official-login', labelUr: 'Official app se دوبارہ لاگ ان', labelEn: 'Re-open official app' },
          { id: 'share-link', labelUr: 'Unknown link kholo', labelEn: 'Open unknown link' },
          { id: 'delete-all', labelUr: 'Sab kuch حذف', labelEn: 'Delete everything' },
          { id: 'copy-password', labelUr: 'Password copy', labelEn: 'Copy password' }
        ],
        correctAction: 'official-login'
      }
    ]
  },
  {
    id: 'government-form',
    icon: '📄',
    title: { ur: 'حکومتی فارم', en: 'Government Form' },
    short: {
      ur: 'Required fields aur verification ko samjhein.',
      en: 'Learn required fields and checks before submitting a form.'
    },
    steps: [
      {
        id: 'gov-step-1',
        title: { ur: 'Required field', en: 'Required field' },
        promptUr: 'Kis field ko bharna zaroori hai?',
        promptEn: 'Which field must be filled before you move forward?',
        instructionUr: 'Required fields un fields ko kehte hain jinhe bilkul bharna zaroori hota hai. Agar koi field khali rahe to form submit nahi hota.',
        instructionEn: 'Required fields are the ones that must be completed before the form can move ahead. You must fill them carefully.',
        hintUr: 'CNIC number ya address waghera commonly required fields hote hain, lekin aaj hum fictional values use karte hain.',
        hintEn: 'Fields like CNIC number and address are commonly required, but here we use fictional sample information only.',
        answerUr: 'Sahi jawab: Required field ko pur karna',
        answerEn: 'Correct action: Fill the required field',
        options: [
          { id: 'required', labelUr: 'Required field bharo', labelEn: 'Fill required field' },
          { id: 'skip', labelUr: 'Field skip karo', labelEn: 'Skip field' },
          { id: 'fake-link', labelUr: 'Link par click karo', labelEn: 'Tap the link' },
          { id: 'download', labelUr: 'Download', labelEn: 'Download' }
        ],
        correctAction: 'required'
      },
      {
        id: 'gov-step-2',
        title: { ur: 'Review before submit', en: 'Review before submit' },
        promptUr: 'Submit karne se pehle konsa kaam sahi hai?',
        promptEn: 'Before submitting, which action is right?',
        instructionUr: 'Verify karna zaroori hai ke aapne sahi information enter ki hai. Submit se pehle review karna chahiye.',
        instructionEn: 'It is important to verify the information before submitting. Review the details carefully first.',
        hintUr: 'Check button ya review option ko chuna. Agar kuch galat ho to phir se change karna.',
        hintEn: 'Choose the review or check option and correct any mistakes before continuing.',
        answerUr: 'Sahi jawab: Review / Verify',
        answerEn: 'Correct action: Review and verify',
        options: [
          { id: 'review', labelUr: 'Review / Verify', labelEn: 'Review / Verify' },
          { id: 'close-form', labelUr: 'Form band kar do', labelEn: 'Close the form' },
          { id: 'accept', labelUr: 'Bina check ke submit', labelEn: 'Submit without checking' },
          { id: 'share-otp', labelUr: 'OTP bhejo', labelEn: 'Share OTP' }
        ],
        correctAction: 'review'
      }
    ]
  },
  {
    id: 'real-fake-message',
    icon: '💬',
    title: { ur: 'آسان پیغام', en: 'Real or Fake Message' },
    short: {
      ur: 'Fake prize aur scam messages ko pehchanen.',
      en: 'Identify suspicious messages and protect yourself from scams.'
    },
    steps: [
      {
        id: 'msg-step-1',
        title: { ur: 'Safe message', en: 'Safe message' },
        promptUr: 'Kaunsa message safe hai?',
        promptEn: 'Which message looks safe?',
        instructionUr: 'Aam family ka normal message safe hota hai agar us mein unknown link ya urgent threat na ho. Personal detail share nahi karni.',
        instructionEn: 'A normal family message is safer when it does not include a suspicious link or urgent threat. Never share personal details.',
        hintUr: 'Unknown prize, fake link ya OTP mangne wale messages suspicious hote hain. Family message normally safe hota hai.',
        hintEn: 'Prize scams, unknown links, and OTP requests are suspicious. A normal family message is usually safe.',
        answerUr: 'Sahi jawab: Family message',
        answerEn: 'Correct action: Family message',
        options: [
          { id: 'family', labelUr: 'Family message', labelEn: 'Family message' },
          { id: 'prize', labelUr: 'Prize message', labelEn: 'Prize message' },
          { id: 'fake-link', labelUr: 'Unknown link', labelEn: 'Unknown link' },
          { id: 'bank-otp', labelUr: 'Bank OTP request', labelEn: 'Bank OTP request' }
        ],
        correctAction: 'family'
      },
      {
        id: 'msg-step-2',
        title: { ur: 'Scam warning', en: 'Scam warning' },
        promptUr: 'Agar message mein “Aaj hi action lo” likha ho to kya karna chahiye?',
        promptEn: 'If a message says “act today” and asks for a quick payment, what should you do?',
        instructionUr: 'Aise urgent messages par ghabra kar action na karna chahiye. Verify karen aur kisi trusted source ko check karen.',
        instructionEn: 'Do not act urgently when a message creates panic. Verify the information through a trusted source first.',
        hintUr: 'Urgent threats, fake prize, ya unknown link ko ignore karna better hota hai.',
        hintEn: 'Urgent threats, fake prizes, and unknown links should be treated as suspicious. Stop and verify first.',
        answerUr: 'Sahi jawab: Verify before action',
        answerEn: 'Correct action: Verify before taking action',
        options: [
          { id: 'verify', labelUr: 'Verify karen', labelEn: 'Verify first' },
          { id: 'share-otp', labelUr: 'OTP bhejen', labelEn: 'Send OTP' },
          { id: 'tap-link', labelUr: 'Link par click', labelEn: 'Tap link' },
          { id: 'pay-now', labelUr: 'Abhi payment', labelEn: 'Pay now' }
        ],
        correctAction: 'verify'
      }
    ]
  },
  {
    id: 'storage-full',
    icon: '📦',
    title: { ur: 'فون کا سٹوریج بھرا ہوا', en: 'Phone Storage Full' },
    short: {
      ur: 'Storage full hone par safe clean-up samjhein.',
      en: 'Understand how to safely manage storage before deleting files.'
    },
    steps: [
      {
        id: 'storage-step-1',
        title: { ur: 'Storage warning', en: 'Storage warning' },
        promptUr: 'Storage full hone par kis cheez ko review karna chahiye?',
        promptEn: 'What should you review when storage is full?',
        instructionUr: 'Photos, videos aur bulky apps ko review karna chahiye. Backup zaroori cheezen rakhiye phir delete karna.',
        instructionEn: 'Review photos, videos, and large apps. Back up important files before deleting anything.',
        hintUr: 'Kabhi bhi kisi important file ko bina backup ke delete na karen.',
        hintEn: 'Never delete important files without a backup.',
        answerUr: 'Sahi jawab: Review files and backup first',
        answerEn: 'Correct action: Review files and back up important items first',
        options: [
          { id: 'review', labelUr: 'Files review karo', labelEn: 'Review files carefully' },
          { id: 'delete-all', labelUr: 'Sab kuch delete', labelEn: 'Delete everything' },
          { id: 'share-link', labelUr: 'Link bhejo', labelEn: 'Share link' },
          { id: 'ignore', labelUr: 'Ignore karo', labelEn: 'Ignore it' }
        ],
        correctAction: 'review'
      },
      {
        id: 'storage-step-2',
        title: { ur: 'Safe cleanup', en: 'Safe cleanup' },
        promptUr: 'Kis cheez ko choose karna safe hai?',
        promptEn: 'Which option is the safest cleanup choice?',
        instructionUr: 'Agar photo ya video duplicate ho ya outdated ho to delete karna safe hai, magar important files ko copy kar ke rakhna chahiye.',
        instructionEn: 'Deleting duplicate or old files is safe, but keep important files backed up before removing them.',
        hintUr: 'Old duplicate content ke liye cleanup karna sahi hota hai.',
        hintEn: 'Old or duplicate content is a safe cleanup target.',
        answerUr: 'Sahi jawab: Old duplicate files ko clean karna',
        answerEn: 'Correct action: Clean up old or duplicate files',
        options: [
          { id: 'duplicates', labelUr: 'Old duplicate files', labelEn: 'Old duplicate files' },
          { id: 'important', labelUr: 'Important files', labelEn: 'Important files' },
          { id: 'bank-app', labelUr: 'Bank app', labelEn: 'Bank app' },
          { id: 'password', labelUr: 'Password', labelEn: 'Password' }
        ],
        correctAction: 'duplicates'
      }
    ]
  },
  {
    id: 'forgot-password',
    icon: '🔐',
    title: { ur: 'پاس ورڈ بھول جانا', en: 'Forgotten Password' },
    short: {
      ur: 'Password recovery ke safar ko safely samjhein.',
      en: 'Practice a safe password recovery flow without risking your account.'
    },
    steps: [
      {
        id: 'password-step-1',
        title: { ur: 'Recovery option', en: 'Recovery option' },
        promptUr: 'Password bhool jane par kis option ka intikhab sahi hai?',
        promptEn: 'Which recovery option is safe to choose?',
        instructionUr: 'Password recovery ka official trusted option hi chuna chahiye. Koi bhi unknown link ya person ke saath password share nahi karna.',
        instructionEn: 'Choose the official recovery option. Never share your password or OTP with an unknown person or link.',
        hintUr: 'Trusted recovery option usually app ke official account settings se aata hai.',
        hintEn: 'The official account recovery page is usually the safe choice.',
        answerUr: 'Sahi jawab: Official recovery option',
        answerEn: 'Correct action: Use the official recovery option',
        options: [
          { id: 'recovery', labelUr: 'Official recovery option', labelEn: 'Official recovery option' },
          { id: 'share-pass', labelUr: 'Password share kar do', labelEn: 'Share password' },
          { id: 'unknown-link', labelUr: 'Unknown link', labelEn: 'Unknown link' },
          { id: 'fake-otp', labelUr: 'Fake OTP request', labelEn: 'Fake OTP request' }
        ],
        correctAction: 'recovery'
      },
      {
        id: 'password-step-2',
        title: { ur: 'Strong password', en: 'Strong password' },
        promptUr: 'Strong password kaise banana chahiye?',
        promptEn: 'What makes a strong password?',
        instructionUr: 'Strong password mein aapke naam ya birthday ke words nahi hona chahiye. Long aur unique password better hota hai.',
        instructionEn: 'A strong password should not use your name or birthday. It should be long, unique, and not shared.',
        hintUr: 'Password ka safe use hi strong password bana sakta hai.',
        hintEn: 'Use a unique, long password and keep it private.',
        answerUr: 'Sahi jawab: Long unique password',
        answerEn: 'Correct action: Use a long and unique password',
        options: [
          { id: 'unique', labelUr: 'Long unique password', labelEn: 'Long unique password' },
          { id: 'birthday', labelUr: 'Birthday word', labelEn: 'Birthday word' },
          { id: 'same-password', labelUr: 'Same password everywhere', labelEn: 'Same password everywhere' },
          { id: 'share-otp', labelUr: 'OTP share', labelEn: 'Share OTP' }
        ],
        correctAction: 'unique'
      }
    ]
  },
  {
    id: 'video-call',
    icon: '📹',
    title: { ur: 'ویڈیو کال مسئلہ', en: 'Video Call Not Working' },
    short: {
      ur: 'Camera, mic aur internet ki samjh bohat zaroori hai.',
      en: 'Learn how to check camera, mic, and internet for a video call.'
    },
    steps: [
      {
        id: 'video-step-1',
        title: { ur: 'Camera permission', en: 'Camera permission' },
        promptUr: 'Kis cheez ko check karna chahiye jab camera kaam na kare?',
        promptEn: 'What should you check when the camera is not working?',
        instructionUr: 'Camera permission, mic permission, aur device settings ko check karna chahiye. Aapko actual permissions dene ki zaroorat nahi hoti because yeh practice app hai.',
        instructionEn: 'Check the camera permission, microphone permission, and device settings. No real permissions are needed because this is a practice app.',
        hintUr: 'Camera icon ke liye settings ka option dekhen.',
        hintEn: 'Look for the camera icon and the app settings option.',
        answerUr: 'Sahi jawab: Camera settings check karna',
        answerEn: 'Correct action: Check camera settings',
        options: [
          { id: 'camera-settings', labelUr: 'Camera settings check', labelEn: 'Check camera settings' },
          { id: 'share-link', labelUr: 'Unknown link', labelEn: 'Unknown link' },
          { id: 'delete-app', labelUr: 'App delete', labelEn: 'Delete app' },
          { id: 'close-call', labelUr: 'Call close', labelEn: 'Close call' }
        ],
        correctAction: 'camera-settings'
      },
      {
        id: 'video-step-2',
        title: { ur: 'Internet check', en: 'Internet check' },
        promptUr: 'Video call mein internet kaise check karte hain?',
        promptEn: 'How do you check internet connectivity before a video call?',
        instructionUr: 'Internet ka connection check karna chahiye. Agar data weak ho to call quality low rahegi. Mute aur unmute icon bhi samjhen.',
        instructionEn: 'Check your internet connection. Weak data can affect a call. Also learn how to mute and unmute the microphone.',
        hintUr: 'Signal bars aur internet icon ko dekhen.',
        hintEn: 'Look for the signal bars and internet icon.',
        answerUr: 'Sahi jawab: Internet connection check',
        answerEn: 'Correct action: Check internet connection',
        options: [
          { id: 'internet', labelUr: 'Internet connection check', labelEn: 'Check internet connection' },
          { id: 'password', labelUr: 'Password share', labelEn: 'Share password' },
          { id: 'disable', labelUr: 'Call off', labelEn: 'Turn off call' },
          { id: 'forget', labelUr: 'Forget device', labelEn: 'Forget device' }
        ],
        correctAction: 'internet'
      }
    ]
  }
];
