function option(id, ur, en) {
  return { id, labelUr: ur, labelEn: en };
}

function question(id, promptUr, promptEn, correctAction, options, contextUr, contextEn, hintUr, hintEn, answerUr, answerEn) {
  return {
    id: `teach-${id}`,
    title: { ur: 'اب آپ بتائیں', en: 'Your turn to explain' },
    promptUr,
    promptEn,
    correctAction,
    options,
    contextUr,
    contextEn,
    hintUr,
    hintEn,
    answerUr,
    answerEn,
    correctFeedbackUr: 'بالکل ٹھیک۔ آپ نے صحیح بات یاد رکھی۔',
    correctFeedbackEn: 'That is right. You remembered the important part.',
    incorrectFeedbackUr: 'کوئی بات نہیں۔ صحیح بات دیکھیں اور دوبارہ کوشش کریں۔',
    incorrectFeedbackEn: 'No problem. Look at the helpful note and try again.'
  };
}

export const teachBackCatalog = {
  'bank-logout': [
    question('bank-code', 'بینک کا نام لینے والا کوئی شخص آپ سے فون پر خفیہ کوڈ مانگے تو کیا کریں؟', 'Someone claiming to be from your bank asks for a secret code on the phone. What should you do?', 'keep', [
      option('keep', 'کوڈ اپنے پاس رکھیں۔', 'Keep the code to yourself.'),
      option('share', 'کوڈ بتا دیں۔', 'Tell them the code.'),
      option('link', 'ان کا بھیجا ہوا لنک کھولیں۔', 'Open the link they sent.')
    ], 'بینک ایپ کی مشق میں خفیہ کوڈ اپنے پاس رکھنا سیکھا۔', 'In the banking practice, you learned to keep secret codes private.', 'کوڈ صرف آپ کے لیے ہوتا ہے۔', 'The code is meant only for you.', 'کوڈ نہ بتائیں۔ ضرورت ہو تو بینک کے معلوم نمبر پر خود رابطہ کریں۔', 'Do not share it. If needed, contact your bank using a number you already know.'),
    question('bank-shared-phone', 'کسی اور کے فون پر اپنا اکاؤنٹ استعمال کرنے کے بعد کیا کرنا چاہیے؟', 'What should you do after using your account on someone else’s phone?', 'leave', [
      option('leave', 'اپنے اکاؤنٹ سے باہر آ کر ایپ بند کریں۔', 'Log out of your account and close the app.'),
      option('open', 'اکاؤنٹ کھلا چھوڑ دیں۔', 'Leave your account open.'),
      option('save', 'خفیہ لفظ فون میں محفوظ کریں۔', 'Save your password on the phone.')
    ], 'دوسرے کے فون پر اکاؤنٹ کھلا چھوڑنا محفوظ نہیں۔', 'Leaving your account open on someone else’s phone is not safe.', 'فون واپس کرنے سے پہلے اپنا اکاؤنٹ بند کریں۔', 'Close your account before returning the phone.', 'اکاؤنٹ سے باہر آئیں اور خفیہ لفظ محفوظ نہ کریں۔', 'Log out and do not save your password there.')
  ],
  'government-form': [
    question('form-review', 'فرضی فارم بھیجنے سے پہلے کون سا کام ضروری ہے؟', 'What should you do before sending a practice form?', 'review', [
      option('review', 'لکھی ہوئی معلومات دوبارہ دیکھیں۔', 'Review the information you entered.'),
      option('guess', 'خالی جگہوں کا اندازہ لگائیں۔', 'Guess the missing details.'),
      option('real', 'اپنی اصلی ذاتی معلومات لکھیں۔', 'Enter your real personal details.')
    ], 'فارم بھیجنے سے پہلے معلومات چیک کرنا ضروری ہے۔', 'It is important to check information before sending a form.', 'جیسے کاغذ بھیجنے سے پہلے پڑھتے ہیں، ویسے ہی فارم دیکھیں۔', 'Review the form just as you would check a paper before sending it.', 'صرف فرضی معلومات دیکھیں اور غلطی ہو تو ٹھیک کریں۔', 'Use only fictional details and correct any mistakes.'),
    question('form-code', 'کوئی فون پر فارم کا تصدیقی کوڈ مانگے تو کیا کریں؟', 'Someone asks for a form verification code over the phone. What should you do?', 'private', [
      option('private', 'کوڈ کسی کو نہ بتائیں۔', 'Do not tell anyone the code.'),
      option('caller', 'فون کرنے والے کو کوڈ دے دیں۔', 'Give the code to the caller.'),
      option('group', 'کوڈ گروپ میں بھیج دیں۔', 'Send the code to a group.')
    ], 'تصدیقی کوڈ آپ کے لیے ہے، فون کرنے والے کے لیے نہیں۔', 'A verification code is for you, not for the caller.', 'کوڈ کو خفیہ رکھنے والی بات یاد کریں۔', 'Remember the lesson about keeping a code private.', 'کوڈ نہ بتائیں۔ ضرورت ہو تو دفتر سے معلوم طریقے سے رابطہ کریں۔', 'Do not share it. Contact the office through a known method if needed.')
  ],
  'real-fake-message': [
    question('message-link', 'انجان نمبر کا پیغام آپ کو ابھی لنک کھولنے اور کوڈ بھیجنے کو کہے تو کیا کریں؟', 'An unknown number tells you to open a link and send a code now. What should you do?', 'stop', [
      option('stop', 'لنک نہ کھولیں اور کوڈ نہ بھیجیں۔', 'Do not open the link or send the code.'),
      option('send', 'جلدی سے کوڈ بھیج دیں۔', 'Send the code quickly.'),
      option('forward', 'پیغام سب کو بھیج دیں۔', 'Forward the message to everyone.')
    ], 'جلدی کا دباؤ اور کوڈ مانگنا خطرے کی نشانیاں ہیں۔', 'Pressure to act quickly and asking for a code are warning signs.', 'سوچیں کہ کیا آپ اس بھیجنے والے کو جانتے ہیں؟', 'Ask yourself whether you know the sender.', 'لنک نہ کھولیں، کوڈ نہ بتائیں، اور پیغام کی خبر دیں۔', 'Do not open the link or share the code, and report the message.'),
    question('message-safe', 'آپ کے جانے پہچانے گروپ سے صرف کل کی کلاس کا وقت آیا ہے۔ کیا کریں؟', 'A group you know sends only tomorrow’s class time. What should you do?', 'check', [
      option('check', 'بھیجنے والے کو پہچان کر معمول کی اطلاع پڑھیں۔', 'Check that you know the sender and read the ordinary reminder.'),
      option('secret', 'اپنا خفیہ لفظ بھیج دیں۔', 'Send your password.'),
      option('money', 'رقم بھیج دیں۔', 'Send money.')
    ], 'ہر پیغام دھوکا نہیں ہوتا۔ بھیجنے والے اور پیغام دونوں کو دیکھیں۔', 'Not every message is a scam. Check both the sender and the message.', 'کیا اس میں پیسے، خفیہ معلومات یا انجان لنک مانگا گیا ہے؟', 'Does it ask for money, private details, or use an unknown link?', 'اگر بھیجنے والا جانا پہچانا ہو اور کوئی خطرے کی بات نہ ہو تو اسے پڑھ سکتے ہیں۔', 'If you know the sender and there are no warning signs, you can read it.')
  ],
  'storage-full': [
    question('storage-copy', 'فون سے کوئی ضروری تصویر ہٹانے سے پہلے کیا کرنا بہتر ہے؟', 'What is a good idea before removing an important photo from your phone?', 'copy', [
      option('copy', 'اس کی ایک اضافی نقل محفوظ کر لیں۔', 'Save an extra copy of it.'),
      option('delete', 'بغیر دیکھے سب تصویریں مٹا دیں۔', 'Delete all photos without checking.'),
      option('send', 'تصویر کسی انجان شخص کو بھیجیں۔', 'Send it to someone you do not know.')
    ], 'اصل تصویر مٹنے سے پہلے اس کی اضافی نقل مدد دے سکتی ہے۔', 'An extra copy can help if the original is removed.', 'سوچیں کہ اصل تصویر گم ہو جائے تو کیا کام آئے گا؟', 'Think about what would help if the original photo were lost.', 'ضروری تصویر کی نقل رکھیں، پھر ہی اسے ہٹانے کا سوچیں۔', 'Keep a copy of an important photo before considering removing it.'),
    question('storage-safe', 'جگہ خالی کرنے کے لیے کون سا قدم زیادہ محفوظ ہے؟', 'Which is a safer way to make more space?', 'review', [
      option('review', 'پہلے بڑی یا دہرائی ہوئی چیزیں دیکھیں۔', 'First check large or duplicate items.'),
      option('all', 'فون کی ہر چیز مٹا دیں۔', 'Delete everything on the phone.'),
      option('unknown', 'صفائی کے لیے انجان ایپ لگائیں۔', 'Install an unknown cleaning app.')
    ], 'چیز مٹانے سے پہلے دیکھیں کہ وہ ضروری تو نہیں۔', 'Check whether something is important before deleting it.', 'جیسے گھر کی الماری صاف کرتے وقت پہلے چیزیں دیکھتے ہیں۔', 'As with a cupboard, check items before clearing them out.', 'غیر ضروری اور دہرائی ہوئی چیزیں ہی احتیاط سے ہٹائیں۔', 'Carefully remove only items you do not need or duplicates.')
  ],
  'forgot-password': [
    question('password-code', 'اکاؤنٹ کھولنے کے لیے آیا ہوا کوڈ کوئی اور مانگے تو کیا کریں؟', 'Someone asks for the code sent to help open your account. What should you do?', 'private', [
      option('private', 'کوڈ اپنے پاس رکھیں۔', 'Keep the code to yourself.'),
      option('share', 'کوڈ بھیج دیں۔', 'Send them the code.'),
      option('post', 'کوڈ کہیں لکھ کر سب کو دکھائیں۔', 'Write the code where everyone can see it.')
    ], 'اکاؤنٹ کا کوڈ خفیہ ہوتا ہے۔', 'An account code is private.', 'کوڈ صرف آپ کے اکاؤنٹ کے لیے آیا ہے۔', 'The code was sent for your account only.', 'کوڈ کسی کو نہ بتائیں۔', 'Do not share the code with anyone.'),
    question('password-new', 'نیا خفیہ لفظ بناتے وقت کیا بہتر ہے؟', 'What is a good choice when making a new password?', 'unique', [
      option('unique', 'ایسا نیا خفیہ لفظ بنائیں جو دوسروں کو معلوم نہ ہو۔', 'Make a new password that other people cannot guess.'),
      option('reuse', 'سب کو اپنا خفیہ لفظ بتا دیں۔', 'Tell everyone your password.'),
      option('same', 'ہر جگہ ایک ہی آسان لفظ رکھیں۔', 'Use the same easy word everywhere.')
    ], 'خفیہ لفظ اکاؤنٹ کی چابی جیسا ہے۔', 'A password is like a key to your account.', 'ایسا لفظ چنیں جو صرف آپ کو معلوم ہو۔', 'Choose something only you know.', 'ہر اکاؤنٹ کے لیے محفوظ اور الگ خفیہ لفظ رکھیں۔', 'Use a safe, different password for each account.')
  ],
  'video-call': [
    question('video-sound', 'ویڈیو کال پر دوسرے آپ کی آواز نہیں سن رہے اور مائیک بند ہے۔ کیا کریں؟', 'People cannot hear you on a video call and the microphone is muted. What should you do?', 'mic', [
      option('mic', 'مائیک کا بٹن کھولیں۔', 'Turn on the microphone.'),
      option('camera', 'کیمرہ بند کریں۔', 'Turn off the camera.'),
      option('end', 'فوراً کال بند کریں۔', 'End the call right away.')
    ], 'مائیک آواز بھیجتا ہے، کیمرہ تصویر دکھاتا ہے۔', 'The microphone sends sound; the camera shows video.', 'آواز کے لیے مائیک کا نشان دیکھیں۔', 'For sound, look for the microphone symbol.', 'مائیک کھولیں تاکہ دوسرے آپ کی آواز سن سکیں۔', 'Turn on the microphone so others can hear you.'),
    question('video-permission', 'کوئی انجان ایپ کیمرہ استعمال کرنے کی اجازت مانگے تو کیا کریں؟', 'An unknown app asks to use your camera. What should you do?', 'check', [
      option('check', 'پہلے ایپ کو پہچانیں، پھر ضرورت دیکھیں۔', 'Check what the app is and whether it needs the camera.'),
      option('all', 'ہر ایپ کو اجازت دے دیں۔', 'Allow every app.'),
      option('password', 'فون کا خفیہ لفظ بھیج دیں۔', 'Send your phone password.')
    ], 'ہر ایپ کو کیمرہ استعمال کرنے کی ضرورت نہیں ہوتی۔', 'Not every app needs to use the camera.', 'اجازت دینے سے پہلے دیکھیں کہ کون مانگ رہا ہے۔', 'Check which app is asking before allowing it.', 'ایپ کو پہچانے بغیر اجازت نہ دیں۔', 'Do not allow access before checking the app.')
  ]
};
