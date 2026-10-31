export const DEFAULT_GUIDES = [
  {
    id: 'video-call-join',
    title: { en: 'Join a video call', ur: 'ویڈیو کال میں شامل ہوں' },
    description: {
      en: 'Open the link and join a video meeting.',
      ur: 'لنک کھولیں اور ویڈیو میٹنگ میں شامل ہوں۔'
    },
    icon: '📹',
    steps: [
      {
        id: 'video-link',
        title: { en: 'Open the video call link', ur: 'ویڈیو کال کا لنک کھولیں' },
        instruction: { en: 'Tap the video call link to open the website or app.', ur: 'ویڈیو کال کا لنک دبائیں تاکہ ویب سائٹ یا ایپ کھل جائے۔' },
        hint: { en: 'Look for the link in the message you received.', ur: 'آپ کو موصول ہونے والے پیغام میں لنک تلاش کریں۔' },
        image: '🔗'
      },
      {
        id: 'find-join',
        title: { en: 'Find the Join Meeting button', ur: 'Join Meeting کا بٹن تلاش کریں' },
        instruction: { en: 'Find and tap the Join Meeting or Join button.', ur: 'Join Meeting یا Join کا بٹن تلاش کرکے دبائیں۔' },
        hint: { en: 'If you cannot see it, scroll down a little.', ur: 'اگر بٹن نظر نہ آئے تو تھوڑا نیچے اسکرول کریں۔' },
        image: '🔍'
      },
      {
        id: 'enter-name',
        title: { en: 'Enter your name', ur: 'اپنا نام درج کریں' },
        instruction: { en: 'Type your name in the name box.', ur: 'نام والے خانے میں اپنا نام لکھیں۔' },
        hint: { en: 'A short name is fine.', ur: 'مختصر نام بھی ٹھیک ہے۔' },
        image: '📝'
      },
      {
        id: 'join-call',
        title: { en: 'Join the meeting', ur: 'میٹنگ میں شامل ہوں' },
        instruction: { en: 'Tap Join to enter the meeting.', ur: 'میٹنگ میں شامل ہونے کے لیے Join دبائیں۔' },
        hint: { en: 'The button may be near the bottom of the screen.', ur: 'یہ بٹن اسکرین کے نیچے ہوسکتا ہے۔' },
        image: '✅'
      }
    ]
  },
  {
    id: 'whatsapp-photo-send',
    title: { en: 'Send a photo on WhatsApp', ur: 'WhatsApp پر تصویر بھیجیں' },
    description: {
      en: 'Choose a chat, select a photo and send it.',
      ur: 'چیٹ منتخب کریں، تصویر چنیں اور بھیجیں۔'
    },
    icon: '📸',
    steps: [
      {
        id: 'open-whatsapp',
        title: { en: 'Open WhatsApp', ur: 'WhatsApp کھولیں' },
        instruction: { en: 'Open the WhatsApp app on your phone.', ur: 'اپنے فون پر WhatsApp ایپ کھولیں۔' },
        hint: { en: 'Look for the green WhatsApp icon.', ur: 'سبز WhatsApp آئیکن تلاش کریں۔' },
        image: '💬'
      },
      {
        id: 'open-chat',
        title: { en: 'Open the right chat', ur: 'درست چیٹ کھولیں' },
        instruction: { en: 'Open the chat of the person who should receive the photo.', ur: 'اس شخص کی چیٹ کھولیں جسے تصویر بھیجنی ہے۔' },
        hint: { en: 'Find their name in your chat list.', ur: 'چیٹس کی فہرست میں ان کا نام تلاش کریں۔' },
        image: '👤'
      },
      {
        id: 'tap-attachment',
        title: { en: 'Tap the attachment or camera icon', ur: 'اٹیچمنٹ یا کیمرہ آئیکن دبائیں' },
        instruction: { en: 'Tap the paperclip or camera icon beside the message box.', ur: 'پیغام لکھنے والے خانے کے پاس کاغذی کلپ یا کیمرہ آئیکن دبائیں۔' },
        hint: { en: 'The paperclip is usually beside the message box.', ur: 'کاغذی کلپ عموماً پیغام والے خانے کے پاس ہوتا ہے۔' },
        image: '📎'
      },
      {
        id: 'choose-photo',
        title: { en: 'Choose a photo from Gallery', ur: 'گیلری سے تصویر منتخب کریں' },
        instruction: { en: 'Open Gallery and tap the photo you want to share.', ur: 'گیلری کھولیں اور بھیجنے والی تصویر پر دبائیں۔' },
        hint: { en: 'Your recent photos may appear first.', ur: 'آپ کی حالیہ تصاویر پہلے نظر آسکتی ہیں۔' },
        image: '🖼️'
      },
      {
        id: 'send-photo',
        title: { en: 'Send the photo', ur: 'تصویر بھیجیں' },
        instruction: { en: 'Tap the send arrow to share the photo.', ur: 'تصویر بھیجنے کے لیے بھیجنے والا تیر دبائیں۔' },
        hint: { en: 'Check the chat name before sending.', ur: 'بھیجنے سے پہلے چیٹ کا نام دیکھ لیں۔' },
        image: '🚀'
      }
    ]
  },
  {
    id: 'youtube-watch-video',
    title: { en: 'Watch a video on YouTube', ur: 'YouTube پر ویڈیو دیکھیں' },
    description: {
      en: 'Search for a video and play it.',
      ur: 'ویڈیو تلاش کریں اور اسے چلائیں۔'
    },
    icon: '🎬',
    steps: [
      {
        id: 'open-youtube',
        title: { en: 'Open YouTube', ur: 'YouTube کھولیں' },
        instruction: { en: 'Open the YouTube app on your phone.', ur: 'اپنے فون پر YouTube ایپ کھولیں۔' },
        hint: { en: 'Look for the red play-button icon.', ur: 'سرخ پلے بٹن والا آئیکن تلاش کریں۔' },
        image: '🎬'
      },
      {
        id: 'tap-search',
        title: { en: 'Tap the search bar', ur: 'سرچ بار دبائیں' },
        instruction: { en: 'Tap the search bar or magnifying glass.', ur: 'سرچ بار یا میگنیفائنگ گلاس دبائیں۔' },
        hint: { en: 'It is usually near the top of the screen.', ur: 'یہ عموماً اسکرین کے اوپر ہوتا ہے۔' },
        image: '🔎'
      },
      {
        id: 'type-video',
        title: { en: 'Type the video name', ur: 'ویڈیو کا نام لکھیں' },
        instruction: { en: 'Type the name of the video you want to watch.', ur: 'جو ویڈیو دیکھنی ہے اس کا نام لکھیں۔' },
        hint: { en: 'You can use the keyboard that appears on screen.', ur: 'اسکرین پر آنے والا کی بورڈ استعمال کریں۔' },
        image: '✍️'
      },
      {
        id: 'choose-result',
        title: { en: 'Choose a search result', ur: 'تلاش کے نتائج میں سے ویڈیو چنیں' },
        instruction: { en: 'Tap the video that looks like the one you want.', ur: 'اپنی مطلوبہ ویڈیو پر دبائیں۔' },
        hint: { en: 'Look at the picture and title of each result.', ur: 'ہر نتیجے کی تصویر اور عنوان دیکھیں۔' },
        image: '▶️'
      },
      {
        id: 'play-video',
        title: { en: 'Play the video', ur: 'ویڈیو چلائیں' },
        instruction: { en: 'Tap the play button if the video does not start.', ur: 'اگر ویڈیو خود نہ چلے تو پلے بٹن دبائیں۔' },
        hint: { en: 'The play button looks like a triangle.', ur: 'پلے بٹن تکون جیسا ہوتا ہے۔' },
        image: '✅'
      }
    ]
  }
];
