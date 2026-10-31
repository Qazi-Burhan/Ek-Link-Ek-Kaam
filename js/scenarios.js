export const dictionaryEntries = {
  OTP: {
    ur: 'Ek baar istemal hone wala code. Yeh ek din ki chabi jaisa hai. Isay kisi ko mat batayein.',
    en: 'A code used one time. It is like a one-use key. Do not tell it to anyone.'
  },
  Verify: {
    ur: 'Kisi cheez ko check karna ke woh sahi hai ya nahi.',
    en: 'To check whether something is correct or not.'
  },
  Update: {
    ur: 'App ko naya karna, jaise purani cheez ki jagah us ka naya version lagana.',
    en: 'To make an app newer, like replacing an old item with its newer version.'
  },
  Login: {
    ur: 'Apne account mein dakhil hona.',
    en: 'To enter your account.'
  },
  Logout: {
    ur: 'Apne account se bahar nikalna.',
    en: 'To leave your account.'
  },
  Password: {
    ur: 'Aapke account ki chhupi hui chabi. Isay sirf aapko pata hona chahiye.',
    en: 'The secret key to your account. Only you should know it.'
  },
  Storage: {
    ur: 'Phone ki almari jahan photos, videos aur doosri cheezein rakhi hoti hain.',
    en: 'The phone’s cupboard where photos, videos, and other things are kept.'
  },
  Permission: {
    ur: 'Phone se kisi kaam ki ijazat lena. Jaise camera istemal karne ki ijazat.',
    en: 'Asking to use something on the phone, like asking to use its camera.'
  },
  Backup: {
    ur: 'Zaroori photos aur files ki ek extra copy, taake original kho jaye to doosri copy mil sake.',
    en: 'An extra copy of important photos and files, in case the original is lost.'
  },
  Link: {
    ur: 'Internet par kisi page tak pohanchne ka raasta. Anjaan link par bina soche click na karein.',
    en: 'A path to a page on the internet. Do not tap an unknown link without thinking.'
  },
  Session: {
    ur: 'Jab tak aap account chala rahe hote hain, yeh us waqt ka naam hai.',
    en: 'The time while you are using an account.'
  },
  'Required field': {
    ur: 'Form ka woh khana jo bharna zaroori hota hai. Jaise kisi kagaz par naam ki jagah.',
    en: 'A box in a form that must be filled, like the name space on a paper form.'
  },
  Review: {
    ur: 'Bhejne se pehle apni likhi hui baat dobara dekh lena.',
    en: 'Looking over what you wrote before sending it.'
  },
  Submit: {
    ur: 'Form ko check karne ke baad aage bhejna.',
    en: 'Sending a form after checking it.'
  },
  Scam: {
    ur: 'Dhoka dene wala paigham ya baat. Is mein aapse paisa ya raaz maanga ja sakta hai.',
    en: 'A trick meant to fool you. It may ask for money or private details.'
  },
  Internet: {
    ur: 'Phone ka woh raasta jis se aap websites aur messages tak pohanchte hain.',
    en: 'The connection that lets your phone reach websites and messages.'
  },
  Camera: {
    ur: 'Phone ki aankh jo tasveer ya video banati hai.',
    en: 'The phone’s eye that takes photos and videos.'
  },
  Microphone: {
    ur: 'Phone ka kaan jo aapki awaaz sunta hai.',
    en: 'The phone’s ear that hears your voice.'
  },
  Mute: {
    ur: 'Awaaz band karna, taake call par doosre aapko na sun saken.',
    en: 'Turning your sound off so other people on a call cannot hear you.'
  }
};

function option(id, ur, en) {
  return { id, labelUr: ur, labelEn: en };
}

function question({
  id, titleUr, titleEn, promptUr, promptEn, contextUr, contextEn, hintUr, hintEn,
  answerUr, answerEn, correctFeedbackUr, correctFeedbackEn, incorrectFeedbackUr,
  incorrectFeedbackEn, options, correctAction
}) {
  return {
    id,
    title: { ur: titleUr, en: titleEn },
    promptUr,
    promptEn,
    contextUr,
    contextEn,
    hintUr,
    hintEn,
    answerUr,
    answerEn,
    correctFeedbackUr,
    correctFeedbackEn,
    incorrectFeedbackUr,
    incorrectFeedbackEn,
    options,
    correctAction
  };
}

export const scenarioCatalog = [
  {
    id: 'bank-logout',
    icon: '🏦',
    title: { ur: 'بینک ایپ سے لاگ آؤٹ', en: 'Bank App Logout' },
    short: {
      ur: 'بینک ایپ کو محفوظ طریقے سے استعمال کرنا سیکھیں۔',
      en: 'Practice using a banking app safely.'
    },
    steps: [
      question({
        id: 'bank-step-1', titleUr: 'Session khatam', titleEn: 'Session ended',
        promptUr: 'Bank app keh rahi hai ke session khatam ho gaya. Ab kya karein?',
        promptEn: 'The bank app says your session has ended. What should you do?',
        contextUr: 'Aapko app se mehfooz tareeqe se nikal kar dobara kholna hai.',
        contextEn: 'You need to leave the app safely and open it again.',
        hintUr: 'Aisa option chunein jo aapko account se bahar nikale, account ko mitaye nahi.',
        hintEn: 'Choose the option that leaves the account, not deletes it.',
        answerUr: 'Logout chunein. Is se account band nahi hota, sirf app se bahar aate hain.',
        answerEn: 'Choose Log Out. This does not close your account; it only leaves the app.',
        correctFeedbackUr: 'Bilkul sahi. Logout se aap app se mehfooz bahar aa jate hain.',
        correctFeedbackEn: 'That is right. Logging out safely leaves the app.',
        incorrectFeedbackUr: 'Koi baat nahi. Account mitana ya code batana zaroori nahi. App se bahar aane ka option chunein: Log Out.',
        incorrectFeedbackEn: 'No worries. You do not need to delete the account or share a code. Choose Log Out to leave the app.',
        options: [
          option('logout', 'Log Out', 'Log Out'),
          option('delete', 'Account mitayein', 'Delete account'),
          option('share-otp', 'Code kisi ko batayein', 'Tell someone the code'),
          option('update', 'App update karein', 'Update the app')
        ],
        correctAction: 'logout'
      }),
      question({
        id: 'bank-step-2', titleUr: 'Shared phone', titleEn: 'Shared phone',
        promptUr: 'Aap ne ghar ke kisi aur ke phone par fictional bank app kholi. Phone wapas dene se pehle kya karein?',
        promptEn: 'You opened a fictional bank app on someone else’s phone. What should you do before returning it?',
        contextUr: 'Doosre ka phone istemal karne ke baad apna account khula na chhorein.',
        contextEn: 'Do not leave your account open after using someone else’s phone.',
        hintUr: 'Pehle apne account se bahar aayen.',
        hintEn: 'Leave your account before handing the phone back.',
        answerUr: 'Account se Logout kar ke app band karein.',
        answerEn: 'Log out of the account and close the app.',
        correctFeedbackUr: 'Shabash. Is tarah agla shakhs aapka account nahi dekh sakta.',
        correctFeedbackEn: 'Well done. This helps keep the next person out of your account.',
        incorrectFeedbackUr: 'Agar account khula reh gaya to doosra shakhs usay dekh sakta hai. Pehle Logout karein.',
        incorrectFeedbackEn: 'If the account stays open, someone else could see it. Log out first.',
        options: [
          option('logout', 'Logout kar ke app band karein', 'Log out and close the app'),
          option('leave-open', 'Account khula chhor dein', 'Leave the account open'),
          option('save-password', 'Password phone mein save karein', 'Save the password on the phone'),
          option('share-code', 'Code phone ke malik ko bhejein', 'Send the code to the phone owner')
        ],
        correctAction: 'logout'
      }),
      question({
        id: 'bank-step-3', titleUr: 'Achanak code ka paigham', titleEn: 'Unexpected code message',
        promptUr: 'Aap app mein kuch nahi kar rahe, phir bhi bank ka code aa gaya. Ab kya karein?',
        promptEn: 'You are not using the app, but a bank code arrives. What should you do?',
        contextUr: 'Jo code aapne khud nahi manga, usay kisi ko na batayein.',
        contextEn: 'Never share a code that you did not ask for.',
        hintUr: 'Code ko raaz rakhein aur kisi ajnabi ke kehne par kaam na karein.',
        hintEn: 'Keep the code private and do not follow a stranger’s instructions.',
        answerUr: 'Code share na karein; zaroorat ho to bank se khud rasmi number par rabta karein.',
        answerEn: 'Do not share it. If needed, contact the bank using its official number.',
        correctFeedbackUr: 'Sahi. Aapka code sirf aapke liye hai.',
        correctFeedbackEn: 'Correct. Your code is for you only.',
        incorrectFeedbackUr: 'Code batane se koi aur account mein dakhil ho sakta hai. Isay share na karein.',
        incorrectFeedbackEn: 'Sharing the code could let someone else enter the account. Keep it private.',
        options: [
          option('keep-code', 'Code raaz rakhein', 'Keep the code private'),
          option('send-code', 'Code paigham bhejne wale ko batayein', 'Tell the sender the code'),
          option('post-code', 'Code family group mein bhejein', 'Post the code in a family group'),
          option('click-link', 'Paigham ke link par jayein', 'Open the message link')
        ],
        correctAction: 'keep-code'
      }),
      question({
        id: 'bank-step-4', titleUr: 'Dobara app kholna', titleEn: 'Opening the app again',
        promptUr: 'Logout ke baad aapko bank app dobara istemal karni hai. App kahan se kholna behtar hai?',
        promptEn: 'After logging out, you need to use the bank app again. What is the safest way to open it?',
        contextUr: 'Apne phone mein pehle se maujood rasmi app istemal karein.',
        contextEn: 'Use the official app already on your phone.',
        hintUr: 'Bank ke naam se aya hua anjaan link zaroori nahi ke asli ho.',
        hintEn: 'An unknown link using a bank’s name may not be genuine.',
        answerUr: 'Phone par maujood rasmi app kholein, anjaan link nahi.',
        answerEn: 'Open the official app already on your phone, not an unknown link.',
        correctFeedbackUr: 'Bilkul theek. Rasm app se jana zyada mehfooz hai.',
        correctFeedbackEn: 'That is right. Using the official app is safer.',
        incorrectFeedbackUr: 'Anjaan link dhoka ho sakta hai. Rasm app khud kholein.',
        incorrectFeedbackEn: 'An unknown link could be a trick. Open the official app yourself.',
        options: [
          option('official-app', 'Phone ki rasmi app', 'The official app on your phone'),
          option('unknown-link', 'Ajnabi paigham ka link', 'A link in an unknown message'),
          option('search-ad', 'Kisi bhi ad par click', 'Tap any advertisement'),
          option('share-password', 'Kisi se password mangna', 'Ask someone for their password')
        ],
        correctAction: 'official-app'
      }),
      question({
        id: 'bank-step-5', titleUr: 'Password save karna', titleEn: 'Saving a password',
        promptUr: 'Shared phone app poochti hai: “Password save karein?” Aapko kya karna chahiye?',
        promptEn: 'An app on a shared phone asks, “Save password?” What should you do?',
        contextUr: 'Shared phone par apna raaz save na karein.',
        contextEn: 'Do not save your secret on a shared phone.',
        hintUr: 'Sochiye, phone baad mein koi aur bhi istemal karega.',
        hintEn: 'Remember that someone else may use the phone later.',
        answerUr: 'Password save na karein aur kaam ke baad Logout karein.',
        answerEn: 'Do not save the password, and log out when you finish.',
        correctFeedbackUr: 'Sahi faisla. Aapka password aapke paas hi rehna chahiye.',
        correctFeedbackEn: 'Good choice. Your password should stay private.',
        incorrectFeedbackUr: 'Shared phone par save kiya password doosra shakhs dekh sakta hai. Save na karein.',
        incorrectFeedbackEn: 'Someone else may use a saved password on a shared phone. Do not save it.',
        options: [
          option('dont-save', 'Password save na karein', 'Do not save the password'),
          option('save', 'Password save kar dein', 'Save the password'),
          option('send', 'Password kisi ko bhej dein', 'Send the password to someone'),
          option('write-screen', 'Password screen par likh dein', 'Write the password on the screen')
        ],
        correctAction: 'dont-save'
      })
    ]
  },
  {
    id: 'government-form',
    icon: '📄',
    title: { ur: 'حکومتی فارم', en: 'Government Form' },
    short: {
      ur: 'Form bharne se pehle dekhna aur check karna seekhein.',
      en: 'Practice checking a form before sending it.'
    },
    steps: [
      question({
        id: 'gov-step-1', titleUr: 'Zaroori khana', titleEn: 'Required field',
        promptUr: 'Fictional form mein “Zaroori” likha khana khali hai. Ab kya karein?',
        promptEn: 'A fictional form has an empty box marked “Required.” What should you do?',
        contextUr: 'Kuch khane bharna zaroori hota hai, bilkul kagaz ke form par naam ki jagah ki tarah.',
        contextEn: 'Some boxes must be filled, just like the name space on a paper form.',
        hintUr: 'Aage jane se pehle us khane ko bharna ya samajhna hoga.',
        hintEn: 'You need to complete that box before moving on.',
        answerUr: 'Zaroori khana bharein. Is practice mein sirf diya gaya fictional namoona use karein.',
        answerEn: 'Fill the required box, using only the fictional sample in this practice.',
        correctFeedbackUr: 'Theek. Zaroori khana khali ho to form aage nahi ja sakta.',
        correctFeedbackEn: 'Right. A form may not continue while a required box is empty.',
        incorrectFeedbackUr: 'Zaroori ka matlab hai ke yeh khana bharna hoga. Asli zaati maloomat yahan na likhein.',
        incorrectFeedbackEn: 'Required means this box needs an answer. Do not enter real personal details here.',
        options: [
          option('fill', 'Namoona dekh kar khana bharein', 'Fill it using the sample'),
          option('skip', 'Khali chhor kar aage jayein', 'Leave it blank and continue'),
          option('real-data', 'Apni asli zaati maloomat likhein', 'Enter your real personal details'),
          option('share', 'Form kisi anjaan ko bhejein', 'Send the form to a stranger')
        ],
        correctAction: 'fill'
      }),
      question({
        id: 'gov-step-2', titleUr: 'Sahi maloomat', titleEn: 'Correct information',
        promptUr: 'Form ke namoone mein diya gaya ilaqa aapki likhi hui jagah se alag hai. Aap kya karenge?',
        promptEn: 'The sample form shows a different area from the one you entered. What should you do?',
        contextUr: 'Form bhejne se pehle har likhi hui baat dekhna achha hota hai.',
        contextEn: 'It is wise to check every detail before sending a form.',
        hintUr: 'Jaldi mein bhejne ke bajaye likhi hui baat phir se dekhein.',
        hintEn: 'Look at what you entered again instead of sending it quickly.',
        answerUr: 'Maloomat dobara check karein aur ghalti ho to theek karein.',
        answerEn: 'Check the information again and correct it if needed.',
        correctFeedbackUr: 'Shabash. Bhejne se pehle check karna ghalti se bachata hai.',
        correctFeedbackEn: 'Well done. Checking first helps prevent mistakes.',
        incorrectFeedbackUr: 'Ghalat maloomat bhejne se mushkil ho sakti hai. Pehle check aur theek karein.',
        incorrectFeedbackEn: 'Sending incorrect details may cause problems. Check and fix them first.',
        options: [
          option('review', 'Maloomat check aur theek karein', 'Check and correct the details'),
          option('submit', 'Bina dekhe bhej dein', 'Send it without checking'),
          option('guess', 'Koi bhi ilaqa andazay se likhein', 'Guess an area'),
          option('share-code', 'Tasdeeq ka code kisi ko bhejein', 'Send a verification code to someone')
        ],
        correctAction: 'review'
      }),
      question({
        id: 'gov-step-3', titleUr: 'Tasdeeq ka code', titleEn: 'Verification code',
        promptUr: 'Fictional form ek code bhejta hai. Koi shakhs phone kar ke code poochta hai. Kya karein?',
        promptEn: 'A fictional form sends a code. Someone calls and asks you to tell them the code. What do you do?',
        contextUr: 'Code aapke liye hota hai. Phone par maangne wale ko na batayein.',
        contextEn: 'The code is for you. Do not tell it to someone who calls.',
        hintUr: 'Asli daftar ya service bhi aapse code phone par nahi maangni chahiye.',
        hintEn: 'Even an office or service should not ask you to read out your code on a call.',
        answerUr: 'Code share na karein. Sirf khud khole hue rasmi form mein use karein.',
        answerEn: 'Do not share it. Use it only in the official form you opened yourself.',
        correctFeedbackUr: 'Bilkul. Code kisi aur ko dena zaroori nahi.',
        correctFeedbackEn: 'Exactly. There is no need to give the code to anyone else.',
        incorrectFeedbackUr: 'Code batane se koi aur aapki jagah kaam kar sakta hai. Isay raaz rakhein.',
        incorrectFeedbackEn: 'Someone could act as you with the code. Keep it private.',
        options: [
          option('private', 'Code kisi ko na batayein', 'Do not tell anyone the code'),
          option('read-call', 'Phone par code parh dein', 'Read it out on the call'),
          option('post', 'Code group mein likh dein', 'Post the code in a group'),
          option('photo', 'Code ki tasveer bhej dein', 'Send a photo of the code')
        ],
        correctAction: 'private'
      }),
      question({
        id: 'gov-step-4', titleUr: 'Tasveer ya file', titleEn: 'Photo or file',
        promptUr: 'Form ek file mangta hai, magar aapko samajh nahi aa raha ke kaunsi. Aap kya karenge?',
        promptEn: 'A form asks for a file, but you are unsure which one. What should you do?',
        contextUr: 'Andazay se zaati kagaz bhejne ke bajaye pehle maloom karein.',
        contextEn: 'Ask what is needed before sending a personal document by guesswork.',
        hintUr: 'Rasm hidayat dobara dekhein ya bharosemand madad lein.',
        hintEn: 'Read the official instructions again or ask someone you trust.',
        answerUr: 'Rasm hidayat check karein; samajh na aaye to bharosemand shakhs se poochein.',
        answerEn: 'Check the official instructions; ask someone you trust if unclear.',
        correctFeedbackUr: 'Sahi. Samajh kar file bhejna zyada mehfooz hai.',
        correctFeedbackEn: 'Right. It is safer to understand before sending a file.',
        incorrectFeedbackUr: 'Har file bhejna zaroori nahi hota. Pehle rasm hidayat check karein.',
        incorrectFeedbackEn: 'You do not need to send just any file. Check the official instructions first.',
        options: [
          option('instructions', 'Rasm hidayat check karein', 'Check the official instructions'),
          option('all-files', 'Phone ki tamam files bhej dein', 'Send every file on the phone'),
          option('stranger', 'Anjaan shakhs ko files bhejein', 'Send files to a stranger'),
          option('guess', 'Koi bhi file andazay se chunein', 'Choose any file by guessing')
        ],
        correctAction: 'instructions'
      }),
      question({
        id: 'gov-step-5', titleUr: 'Aakhri jaiza', titleEn: 'Final review',
        promptUr: 'Form ke aakhir mein “Submit” ka button hai. Dabane se pehle kya karna chahiye?',
        promptEn: 'There is a “Submit” button at the end of the form. What should you do before tapping it?',
        contextUr: 'Submit ka matlab form bhejna. Bhejne se pehle aik aakhri nazar daal lein.',
        contextEn: 'Submit means sending the form. Give it one last check before sending.',
        hintUr: 'Naam, chune hue jawab aur file ko dobara dekhein.',
        hintEn: 'Look over the name, selected answers, and file once more.',
        answerUr: 'Form ka jaiza lein, phir hi Submit karein.',
        answerEn: 'Review the form, then submit it.',
        correctFeedbackUr: 'Bohat achha. Jaiza le kar hi form bhejna chahiye.',
        correctFeedbackEn: 'Very good. Review the form before sending it.',
        incorrectFeedbackUr: 'Bhejne ke baad tabdeeli mushkil ho sakti hai. Pehle aakhri jaiza lein.',
        incorrectFeedbackEn: 'It may be hard to change after sending. Review it first.',
        options: [
          option('review', 'Pehle jaiza lein, phir Submit', 'Review first, then submit'),
          option('submit-now', 'Bina dekhe Submit karein', 'Submit without checking'),
          option('share', 'Form ka link sab ko bhejein', 'Send the form link to everyone'),
          option('close', 'Form band kar ke kaam khatam karein', 'Close the form without checking')
        ],
        correctAction: 'review'
      })
    ]
  },
  {
    id: 'real-fake-message',
    icon: '💬',
    title: { ur: 'اصلی یا جعلی پیغام', en: 'Real or Fake Message' },
    short: {
      ur: 'Ajnabi paigham ko pehchanein aur apni maloomat bachayein.',
      en: 'Recognize suspicious messages and protect your information.'
    },
    steps: [
      question({
        id: 'msg-step-1', titleUr: 'Ghar ka paigham', titleEn: 'Family message',
        promptUr: 'Aapki behen likhti hain: “Main ghar pohanch gayi hoon.” Koi link ya raaz nahi maangti. Yeh kaisa paigham hai?',
        promptEn: 'Your sister writes, “I am home.” There is no link or request for a secret. What kind of message is this?',
        contextUr: 'Aam pehchane hue shakhs ka seedha paigham aksar theek hota hai.',
        contextEn: 'A simple message from someone you know is usually ordinary.',
        hintUr: 'Dekhein kya paigham jaldi karwata, inaam deta, ya raaz maangta hai.',
        hintEn: 'Check whether it creates panic, offers a prize, or asks for a secret.',
        answerUr: 'Yeh aam family paigham hai. Phir bhi shak ho to bhejne wale se alag se pooch lein.',
        answerEn: 'This is an ordinary family message. If unsure, check with the sender another way.',
        correctFeedbackUr: 'Sahi. Paigham ka matlab aur bhejne wale ko dekhna zaroori hai.',
        correctFeedbackEn: 'Right. Consider both the message and who sent it.',
        incorrectFeedbackUr: 'Is paigham mein inaam, dhamki ya link nahi. Yeh aam family baat lagti hai.',
        incorrectFeedbackEn: 'There is no prize, threat, or link here. It looks like an ordinary family message.',
        options: [
          option('family', 'Aam family paigham', 'Ordinary family message'),
          option('prize', 'Inaam ka dhoka', 'Prize trick'),
          option('urgent', 'Jaldi paisa bhejne ki dhamki', 'Urgent payment threat'),
          option('otp', 'Code maangne wala paigham', 'Message asking for a code')
        ],
        correctAction: 'family'
      }),
      question({
        id: 'msg-step-2', titleUr: 'Muft inaam', titleEn: 'Free prize',
        promptUr: 'Ajnabi paigham kehta hai: “Inaam jeeta! Is link par apna password likhein.” Kya karein?',
        promptEn: 'An unknown message says, “You won! Enter your password at this link.” What should you do?',
        contextUr: 'Anjaan inaam aur password maangne wala link dhoka ho sakta hai.',
        contextEn: 'An unknown prize and a link asking for your password may be a trick.',
        hintUr: 'Asli inaam lene ke liye apna password kisi link par likhna zaroori nahi.',
        hintEn: 'You should not need to enter your password in a message link to claim a prize.',
        answerUr: 'Link na kholein aur password na likhein. Paigham ko mita dein.',
        answerEn: 'Do not open the link or enter your password. Delete the message.',
        correctFeedbackUr: 'Bilkul. Ajnabi inaam ke liye password dena mehfooz nahi.',
        correctFeedbackEn: 'Correct. Giving a password for an unknown prize is unsafe.',
        incorrectFeedbackUr: 'Inaam ka bahana bana kar password churaya ja sakta hai. Link na kholein.',
        incorrectFeedbackEn: 'A prize offer may be used to steal your password. Do not open the link.',
        options: [
          option('ignore', 'Link na kholein, paigham mita dein', 'Do not open the link; delete the message'),
          option('enter-pass', 'Password link par likhein', 'Enter the password in the link'),
          option('forward', 'Paigham sab ko bhejein', 'Forward the message to everyone'),
          option('pay-fee', 'Inaam ke liye fee bhejein', 'Pay a fee to claim the prize')
        ],
        correctAction: 'ignore'
      }),
      question({
        id: 'msg-step-3', titleUr: 'Code ka sawal', titleEn: 'Code request',
        promptUr: '“Main bank se hoon, aapka code batayein.” Aapko kya karna chahiye?',
        promptEn: '“I am from your bank. Tell me your code.” What should you do?',
        contextUr: 'Apna code kisi ko bhi na batayein, chahe woh bank ka naam le.',
        contextEn: 'Do not tell anyone your code, even if they say they are from a bank.',
        hintUr: 'Bank se rabta karna ho to uska rasmi number khud dhoondh kar call karein.',
        hintEn: 'If you need to contact the bank, find its official number yourself.',
        answerUr: 'Code na batayein. Call band kar ke bank ko rasmi number par khud call karein.',
        answerEn: 'Do not give the code. End the call and contact the bank using its official number.',
        correctFeedbackUr: 'Bohat achha. Code ko raaz rakhna aapki hifazat hai.',
        correctFeedbackEn: 'Well done. Keeping the code private protects you.',
        incorrectFeedbackUr: 'Code milne par koi aur account khol sakta hai. Isay phone par na batayein.',
        incorrectFeedbackEn: 'Someone may use the code to enter your account. Do not tell it over the phone.',
        options: [
          option('refuse', 'Code na batayein; rasmi number par khud call karein', 'Do not share it; call the official number yourself'),
          option('read', 'Code phone par parh dein', 'Read the code over the phone'),
          option('text', 'Code paigham mein bhej dein', 'Send the code in a message'),
          option('photo', 'Code ki tasveer bhej dein', 'Send a photo of the code')
        ],
        correctAction: 'refuse'
      }),
      question({
        id: 'msg-step-4', titleUr: 'Jaldi ki dhamki', titleEn: 'Urgent threat',
        promptUr: 'Paigham kehta hai: “Aaj paise na bheje to account band!” Aap kaise tasdeeq karenge?',
        promptEn: 'A message says, “Send money today or your account will close!” How do you check it?',
        contextUr: 'Dhamki de kar jaldi karwana dhokay ki nishani ho sakti hai.',
        contextEn: 'A threat that rushes you may be a sign of a scam.',
        hintUr: 'Paigham ke link ke bajaye rasmi app ya number khud istemal karein.',
        hintEn: 'Use the official app or number yourself instead of the message link.',
        answerUr: 'Jaldi mein paisa na bhejein; rasmi app ya number se khud check karein.',
        answerEn: 'Do not rush to pay; check through the official app or number yourself.',
        correctFeedbackUr: 'Sahi. Pehle tasdeeq karna, phir faisla karna behtar hai.',
        correctFeedbackEn: 'Correct. Check first, then decide what to do.',
        incorrectFeedbackUr: 'Dhamki ke dabao mein paisa na bhejein. Rasm tareeqe se khud check karein.',
        incorrectFeedbackEn: 'Do not send money under pressure. Check through an official route yourself.',
        options: [
          option('verify', 'Rasmi app ya number se khud check karein', 'Check yourself using the official app or number'),
          option('pay', 'Fauran paise bhej dein', 'Send money immediately'),
          option('tap', 'Paigham ka link kholein', 'Open the message link'),
          option('share', 'Apna code bhejne wale ko dein', 'Give the sender your code')
        ],
        correctAction: 'verify'
      }),
      question({
        id: 'msg-step-5', titleUr: 'Ajnabi file', titleEn: 'Unknown file',
        promptUr: 'Ajnabi number se file aati hai aur likha hai “Zaroor kholein”. Aap kya karenge?',
        promptEn: 'A file arrives from an unknown number with “You must open this.” What should you do?',
        contextUr: 'Ajnabi ki bheji hui file phone ko nuqsan de sakti hai.',
        contextEn: 'A file from someone unknown may harm your phone.',
        hintUr: 'Aapko file ki umeed nahi thi, is liye pehle bhejne wale ko jaanchna zaroori hai.',
        hintEn: 'You were not expecting a file, so check who sent it before opening.',
        answerUr: 'File na kholein. Zaroorat ho to bhejne wale ko alag se tasdeeq karein.',
        answerEn: 'Do not open it. If needed, check with the sender another way.',
        correctFeedbackUr: 'Theek. Ajnabi file kholne ki jaldi nahi karni.',
        correctFeedbackEn: 'Right. There is no need to rush to open an unknown file.',
        incorrectFeedbackUr: 'Ajnabi file mein nuqsan-deh cheez ho sakti hai. Pehle tasdeeq karein.',
        incorrectFeedbackEn: 'An unknown file may be harmful. Check before opening it.',
        options: [
          option('check', 'Na kholein; bhejne wale se tasdeeq karein', 'Do not open it; check with the sender'),
          option('open', 'Foran file kholein', 'Open the file immediately'),
          option('forward', 'File sab ko bhejein', 'Forward it to everyone'),
          option('enter', 'File kholne ke liye password likhein', 'Enter a password to open it')
        ],
        correctAction: 'check'
      })
    ]
  },
  {
    id: 'storage-full',
    icon: '📦',
    title: { ur: 'فون کا سٹوریج بھرا ہوا', en: 'Phone Storage Full' },
    short: {
      ur: 'Phone ki jagah ko soch samajh kar khali karein.',
      en: 'Practice freeing phone space without losing important files.'
    },
    steps: [
      question({
        id: 'storage-step-1', titleUr: 'Jagah kis ne li?', titleEn: 'What uses space?',
        promptUr: 'Phone mein jagah kam hai. Aksar bohat sari jagah kaun leta hai?',
        promptEn: 'Your phone is low on space. What often uses a lot of it?',
        contextUr: 'Bari photos aur videos phone ki almari mein bohat jagah leti hain.',
        contextEn: 'Large photos and videos can take up lots of room in your phone’s cupboard.',
        hintUr: 'Tasveeron aur videos ke folder ko dekhein.',
        hintEn: 'Think about your photos and videos.',
        answerUr: 'Photos aur videos bohat jagah le sakti hain.',
        answerEn: 'Photos and videos can use a lot of space.',
        correctFeedbackUr: 'Sahi. Bari videos khas taur par kaafi jagah leti hain.',
        correctFeedbackEn: 'Right. Large videos can take up a lot of space.',
        incorrectFeedbackUr: 'Aam tor par photos aur videos zyada jagah leti hain. Pehle unhein dekh sakte hain.',
        incorrectFeedbackEn: 'Photos and videos often use more room. You can review them first.',
        options: [
          option('media', 'Photos aur videos', 'Photos and videos'),
          option('clock', 'Phone ki ghari', 'The phone clock'),
          option('signal', 'Signal ki lakeerein', 'Signal bars'),
          option('keyboard', 'Keyboard ki awaaz', 'Keyboard sounds')
        ],
        correctAction: 'media'
      }),
      question({
        id: 'storage-step-2', titleUr: 'Delete se pehle', titleEn: 'Before deleting',
        promptUr: 'Kuch photos purani lagti hain, magar aapko yaad nahi ke zaroori hain ya nahi. Ab kya karein?',
        promptEn: 'Some photos look old, but you are unsure whether they matter. What should you do?',
        contextUr: 'Delete karne se pehle cheez ko khol kar dekh lena chahiye.',
        contextEn: 'Look at a file before deciding to delete it.',
        hintUr: 'Pehle tasveer dekhein, phir faisla karein.',
        hintEn: 'Review the photo before deciding.',
        answerUr: 'Photos ko pehle dekhein aur zaroori hon to unki extra copy rakhein.',
        answerEn: 'Review the photos and keep an extra copy of important ones.',
        correctFeedbackUr: 'Bohat achha. Dekhe baghair delete nahi karna chahiye.',
        correctFeedbackEn: 'Good. Do not delete files without looking first.',
        incorrectFeedbackUr: 'Saari photos ek saath mitane se zaroori yaadein kho sakti hain. Pehle dekhein.',
        incorrectFeedbackEn: 'Deleting all photos at once could remove important memories. Review them first.',
        options: [
          option('review', 'Pehle dekh kar faisla karein', 'Review them before deciding'),
          option('delete-all', 'Saari photos mita dein', 'Delete all the photos'),
          option('share', 'Har photo anjaan ko bhejein', 'Send every photo to a stranger'),
          option('format', 'Phone ki tamam cheezein mita dein', 'Erase everything on the phone')
        ],
        correctAction: 'review'
      }),
      question({
        id: 'storage-step-3', titleUr: 'Extra copy', titleEn: 'Extra copy',
        promptUr: 'Family ki kuch zaroori photos phone mein hain. Jagah khali karne se pehle kya karna behtar hai?',
        promptEn: 'Important family photos are on the phone. What is wise before freeing space?',
        contextUr: 'Backup ya extra copy aisi hai jaise zaroori kagaz ki doosri copy sambhalna.',
        contextEn: 'A backup is like keeping a second copy of an important paper.',
        hintUr: 'Pehle unki ek aur copy mehfooz jagah par rakhein.',
        hintEn: 'Keep another copy somewhere safe first.',
        answerUr: 'Zaroori photos ki extra copy bana kar phir hi phone se hatayein.',
        answerEn: 'Make an extra copy of important photos before removing them from the phone.',
        correctFeedbackUr: 'Sahi. Extra copy se photos kho jane ka khatra kam hota hai.',
        correctFeedbackEn: 'Correct. An extra copy lowers the chance of losing the photos.',
        incorrectFeedbackUr: 'Bina extra copy ke zaroori photos hamesha ke liye kho sakti hain.',
        incorrectFeedbackEn: 'Without an extra copy, important photos might be lost for good.',
        options: [
          option('backup', 'Pehle extra copy banayein', 'Make an extra copy first'),
          option('delete', 'Foran photos mita dein', 'Delete the photos right away'),
          option('send-all', 'Har photo kisi anjaan ko bhejein', 'Send every photo to a stranger'),
          option('ignore', 'Phone ko band kar dein', 'Turn off the phone')
        ],
        correctAction: 'backup'
      }),
      question({
        id: 'storage-step-4', titleUr: 'Purani duplicate file', titleEn: 'Old duplicate file',
        promptUr: 'Aapko ek hi video ki do copies milti hain. Ek copy mehfooz hai. Kya saaf kar sakte hain?',
        promptEn: 'You find two copies of the same video, and one copy is safely kept. What can you clean up?',
        contextUr: 'Pehle pakka kar lein ke doosri copy waqai maujood hai.',
        contextEn: 'First make sure the other copy really exists.',
        hintUr: 'Doosri copy mehfooz ho to purani extra copy kaam ki nahi.',
        hintEn: 'If one copy is safe, the extra duplicate may be removed.',
        answerUr: 'Check kar ke purani duplicate copy hata sakte hain.',
        answerEn: 'After checking, you can remove the old duplicate copy.',
        correctFeedbackUr: 'Theek. Pehle doosri copy ki maujoodgi check karna zaroori tha.',
        correctFeedbackEn: 'Right. It was important to check the other copy first.',
        incorrectFeedbackUr: 'Jab ek copy mehfooz ho to purani duplicate video hatana theek ho sakta hai.',
        incorrectFeedbackEn: 'When one copy is safe, removing the old duplicate may be fine.',
        options: [
          option('duplicate', 'Check kar ke purani duplicate video hatayein', 'Check, then remove the old duplicate video'),
          option('all', 'Phone ki tamam videos mita dein', 'Delete every video on the phone'),
          option('important', 'Extra copy bhi mita dein', 'Delete the safe copy too'),
          option('password', 'Password ko mita dein', 'Delete the password')
        ],
        correctAction: 'duplicate'
      }),
      question({
        id: 'storage-step-5', titleUr: 'Saaf safai ka faisla', titleEn: 'Choosing what to clean',
        promptUr: 'Phone ke andar purani downloaded film hai jo aapko nahi chahiye. Kya karna munasib hai?',
        promptEn: 'There is an old downloaded movie you no longer want. What is reasonable?',
        contextUr: 'Jo cheez pehchan mein ho aur zaroori na ho, usay dekh kar hata sakte hain.',
        contextEn: 'You can review and remove something you recognize and no longer need.',
        hintUr: 'Pehle film aur uski zaroorat check karein; tamam files na mitayein.',
        hintEn: 'Check that movie first; do not erase every file.',
        answerUr: 'Sirf us purani film ko check kar ke hata dein.',
        answerEn: 'Review and remove only that old movie.',
        correctFeedbackUr: 'Shabash. Sirf pehchani hui ghair zaroori cheez hatana samajhdari hai.',
        correctFeedbackEn: 'Well done. It is sensible to remove only something you recognize and do not need.',
        incorrectFeedbackUr: 'Har cheez mitane ki zaroorat nahi. Sirf purani ghair zaroori film check kar ke hatayein.',
        incorrectFeedbackEn: 'There is no need to erase everything. Review and remove only the unwanted movie.',
        options: [
          option('one-file', 'Sirf woh film check kar ke hatayein', 'Review and remove only that movie'),
          option('all-files', 'Phone ki tamam files mita dein', 'Delete all files on the phone'),
          option('unknown', 'Anjaan files bhi hata dein', 'Delete unknown files too'),
          option('share', 'Files kisi anjaan ko bhejein', 'Send the files to a stranger')
        ],
        correctAction: 'one-file'
      })
    ]
  },
  {
    id: 'forgot-password',
    icon: '🔐',
    title: { ur: 'پاس ورڈ بھول جانا', en: 'Forgotten Password' },
    short: {
      ur: 'Password yaad na ho to account ko mehfooz tareeqe se wapas kholein.',
      en: 'Practice safely getting back into an account when you forget a password.'
    },
    steps: [
      question({
        id: 'password-step-1', titleUr: 'Password bhool gaye', titleEn: 'Forgot password',
        promptUr: 'Aap apna password bhool gaye. Account kholne ka pehla mehfooz qadam kya hai?',
        promptEn: 'You forgot your password. What is the first safe step to get into your account?',
        contextUr: 'Account ki apni rasmi app ya website mein madad ka raasta hota hai.',
        contextEn: 'The official app or website has a way to help recover your account.',
        hintUr: 'App mein “Password bhool gaye?” jaisa option dekhein.',
        hintEn: 'Look for an option such as “Forgot password?” in the app.',
        answerUr: 'Rasmi app ka “Password bhool gaye?” option istemal karein.',
        answerEn: 'Use the “Forgot password?” option in the official app.',
        correctFeedbackUr: 'Sahi. Account wapas pane ke liye rasmi tareeqa hi apnayein.',
        correctFeedbackEn: 'Correct. Use the official way to recover your account.',
        incorrectFeedbackUr: 'Anjaan shakhs ya link ko password dena khatra ho sakta hai. Rasm option chunein.',
        incorrectFeedbackEn: 'Giving a password to a stranger or unknown link can be risky. Use the official option.',
        options: [
          option('official', 'Rasmi app mein “Password bhool gaye?”', '“Forgot password?” in the official app'),
          option('stranger', 'Anjaan shakhs se password mangain', 'Ask a stranger for a password'),
          option('link', 'Ajnabi paigham ka link kholein', 'Open a link from an unknown message'),
          option('share', 'Purana password sab ko bhejein', 'Send the old password to everyone')
        ],
        correctAction: 'official'
      }),
      question({
        id: 'password-step-2', titleUr: 'Code se tasdeeq', titleEn: 'Code check',
        promptUr: 'Rasmi app aapke phone par code bhejti hai. Koi aur shakhs woh code maangta hai. Kya karein?',
        promptEn: 'The official app sends a code to your phone. Someone else asks you for it. What do you do?',
        contextUr: 'Tasdeeq ka code aapko account wapas pane mein madad deta hai.',
        contextEn: 'A code helps confirm it is you recovering the account.',
        hintUr: 'Code ko kisi aur ko batana zaroori nahi.',
        hintEn: 'There is no need to tell the code to someone else.',
        answerUr: 'Code app mein khud likhein, kisi shakhs ko na batayein.',
        answerEn: 'Enter the code yourself in the app; do not tell it to anyone.',
        correctFeedbackUr: 'Bilkul. Code aapke account ki hifazat karta hai.',
        correctFeedbackEn: 'Exactly. The code helps protect your account.',
        incorrectFeedbackUr: 'Agar aap code de dein to koi aur aapka account khol sakta hai.',
        incorrectFeedbackEn: 'If you give away the code, someone else may get into your account.',
        options: [
          option('private', 'Code khud app mein likhein', 'Enter the code yourself in the app'),
          option('tell', 'Code phone karne wale ko batayein', 'Tell the caller the code'),
          option('post', 'Code online likh dein', 'Post the code online'),
          option('forward', 'Code sab ko bhej dein', 'Forward the code to everyone')
        ],
        correctAction: 'private'
      }),
      question({
        id: 'password-step-3', titleUr: 'Naya password', titleEn: 'New password',
        promptUr: 'Naya password banana hai. Kaunsa tareeqa zyada mehfooz hai?',
        promptEn: 'You need a new password. Which choice is safer?',
        contextUr: 'Har account ke liye alag aur mushkil se andaza hone wala password rakhein.',
        contextEn: 'Use a different password for each account that is hard to guess.',
        hintUr: 'Apna naam ya asaan number jaisa 1234 na rakhein.',
        hintEn: 'Avoid your name or an easy number like 1234.',
        answerUr: 'Lamba, alag password chunein jo doosre account mein na ho.',
        answerEn: 'Choose a long, unique password that is not used for another account.',
        correctFeedbackUr: 'Achha faisla. Alag password se doosre account bhi mehfooz rehte hain.',
        correctFeedbackEn: 'Good choice. Different passwords help protect your other accounts too.',
        incorrectFeedbackUr: 'Naam, janam ka din ya 1234 asaani se pehchana ja sakta hai. Alag lamba password behtar hai.',
        incorrectFeedbackEn: 'A name, birthday, or 1234 is easy to guess. A long unique password is safer.',
        options: [
          option('unique', 'Lamba aur alag password', 'A long, unique password'),
          option('name', 'Apna naam', 'Your name'),
          option('birthday', 'Janam ka din', 'Your birthday'),
          option('simple', '1234', '1234')
        ],
        correctAction: 'unique'
      }),
      question({
        id: 'password-step-4', titleUr: 'Password share karna', titleEn: 'Sharing a password',
        promptUr: 'Koi dost kehta hai “Apna password mujhe bhejo, main madad karunga.” Aap kya karenge?',
        promptEn: 'A friend says, “Send me your password and I will help.” What should you do?',
        contextUr: 'Madad lene ke liye password dena zaroori nahi.',
        contextEn: 'You do not need to give your password to get help.',
        hintUr: 'Kisi ko password bataye baghair unse screen samjhane ko keh sakte hain.',
        hintEn: 'You can ask someone to explain the screen without telling them your password.',
        answerUr: 'Password share na karein; madad lete waqt khud type karein.',
        answerEn: 'Do not share it; type it yourself if you need help.',
        correctFeedbackUr: 'Sahi. Aap password apne paas rakh kar bhi madad le sakte hain.',
        correctFeedbackEn: 'Right. You can get help while keeping your password private.',
        incorrectFeedbackUr: 'Password private hota hai. Madad karne wale ko bhi yeh batana zaroori nahi.',
        incorrectFeedbackEn: 'A password is private. Even a helper does not need to know it.',
        options: [
          option('private', 'Password na batayein; khud type karein', 'Keep it private and type it yourself'),
          option('send', 'Password paigham mein bhejein', 'Send the password in a message'),
          option('post', 'Password group mein likhein', 'Post the password in a group'),
          option('save', 'Dost ke phone mein save karein', 'Save it on your friend’s phone')
        ],
        correctAction: 'private'
      }),
      question({
        id: 'password-step-5', titleUr: 'Password yaad rakhna', titleEn: 'Keeping a password safe',
        promptUr: 'Aapko passwords yaad rakhna mushkil lagta hai. Kaunsa tareeqa theek hai?',
        promptEn: 'You find passwords hard to remember. Which approach is safer?',
        contextUr: 'Password ko khuli jagah, phone ke note ya paigham mein na likhein.',
        contextEn: 'Do not leave a password in an open note or message.',
        hintUr: 'Kisi bharosemand password rakhne ke tareeqe ya ghar ke mehfooz band kagaz par ghour karein.',
        hintEn: 'Consider a trusted password keeper or a safely stored paper kept private.',
        answerUr: 'Password mehfooz aur sirf apni pohanch mein rakhein; kisi ko khula na dikhayein.',
        answerEn: 'Keep it secure and private; do not leave it where others can see it.',
        correctFeedbackUr: 'Theek. Mehfooz jagah aur raazdari dono zaroori hain.',
        correctFeedbackEn: 'Right. Both a safe place and privacy matter.',
        incorrectFeedbackUr: 'Khuli jagah ya shared paigham se password doosre dekh sakte hain.',
        incorrectFeedbackEn: 'Others could see a password left in an open place or shared message.',
        options: [
          option('secure', 'Mehfooz, sirf apni pohanch wali jagah', 'A secure place only you can access'),
          option('message', 'Khud ko paigham bhej dein', 'Send it to yourself in a message'),
          option('public', 'Phone ke khule note mein likhein', 'Write it in an open phone note'),
          option('share', 'Doston ke group mein rakh dein', 'Put it in a friends’ group')
        ],
        correctAction: 'secure'
      })
    ]
  },
  {
    id: 'video-call',
    icon: '📹',
    title: { ur: 'ویڈیو کال مسئلہ', en: 'Video Call Not Working' },
    short: {
      ur: 'Camera, mic aur internet ke aam masail samjhein.',
      en: 'Learn common camera, microphone, and internet checks.'
    },
    steps: [
      question({
        id: 'video-step-1', titleUr: 'Camera band hai', titleEn: 'Camera is off',
        promptUr: 'Fictional call screen par aapka chehra nazar nahi aa raha. Kis cheez ko check karein?',
        promptEn: 'Your face is not visible on the fictional call screen. What should you check?',
        contextUr: 'Camera band ho to doosre aapko nahi dekh sakte.',
        contextEn: 'When the camera is off, other people cannot see you.',
        hintUr: 'Call screen par camera ki tasveer wala button dekhein.',
        hintEn: 'Look for the button with a camera picture.',
        answerUr: 'Camera ka button check kar ke usay on karein. Yeh sirf practice screen hai.',
        answerEn: 'Check the camera button and turn it on. This is only a practice screen.',
        correctFeedbackUr: 'Sahi. Camera on ho to call par tasveer nazar aati hai.',
        correctFeedbackEn: 'Correct. When the camera is on, people can see you on the call.',
        incorrectFeedbackUr: 'Mic ya internet camera ko on nahi karta. Camera wale button ko check karein.',
        incorrectFeedbackEn: 'The microphone or internet does not turn on the camera. Check the camera button.',
        options: [
          option('camera', 'Camera ka button on karein', 'Turn on the camera button'),
          option('mute', 'Mic mute karein', 'Mute the microphone'),
          option('volume', 'Awaaz barhayein', 'Turn up the volume'),
          option('leave', 'Call chhor dein', 'Leave the call')
        ],
        correctAction: 'camera'
      }),
      question({
        id: 'video-step-2', titleUr: 'Awaaz nahi aa rahi', titleEn: 'No sound from you',
        promptUr: 'Doosre shakhs ko aapki awaaz nahi aa rahi. Call par mic mute ka nishan dikh raha hai. Kya karein?',
        promptEn: 'The other person cannot hear you. The call shows your microphone is muted. What should you do?',
        contextUr: 'Mute ka matlab awaaz band. Unmute karne se aapki awaaz suni ja sakti hai.',
        contextEn: 'Mute means your sound is off. Unmuting lets others hear you.',
        hintUr: 'Mic wala button dobara dabane se mute hat sakta hai.',
        hintEn: 'Tapping the microphone button again may unmute it.',
        answerUr: 'Mic ka button dabaa kar unmute karein.',
        answerEn: 'Tap the microphone button to unmute.',
        correctFeedbackUr: 'Bilkul. Ab doosre aapki awaaz sun sakte hain.',
        correctFeedbackEn: 'That is right. Others can now hear you.',
        incorrectFeedbackUr: 'Awaaz ka masla hai, is liye mic check karein; camera ya call band karna hal nahi.',
        incorrectFeedbackEn: 'It is a sound issue, so check the microphone. The camera will not fix it.',
        options: [
          option('unmute', 'Mic ko unmute karein', 'Unmute the microphone'),
          option('camera', 'Camera band karein', 'Turn off the camera'),
          option('leave', 'Call foran band karein', 'End the call immediately'),
          option('brightness', 'Screen roshan karein', 'Make the screen brighter')
        ],
        correctAction: 'unmute'
      }),
      question({
        id: 'video-step-3', titleUr: 'Tasveer jam rahi hai', titleEn: 'Video keeps freezing',
        promptUr: 'Call mein tasveer ruk ruk kar chalti hai. Sab se pehle kya check karein?',
        promptEn: 'The video keeps freezing during a call. What should you check first?',
        contextUr: 'Kamzor internet par awaaz aur tasveer ruk sakti hai.',
        contextEn: 'A weak internet connection can interrupt sound and video.',
        hintUr: 'Phone ke internet ya signal ko dekhein.',
        hintEn: 'Check the phone’s internet or signal.',
        answerUr: 'Internet signal check karein; mumkin ho to behtar jagah par jayein.',
        answerEn: 'Check the internet signal; move to a place with a better connection if possible.',
        correctFeedbackUr: 'Sahi. Behtar internet se call saaf chal sakti hai.',
        correctFeedbackEn: 'Correct. A better connection can improve the call.',
        incorrectFeedbackUr: 'Tasveer ka rukna aksar kamzor internet se hota hai. Signal check karein.',
        incorrectFeedbackEn: 'Freezing video often happens with weak internet. Check the signal.',
        options: [
          option('internet', 'Internet signal check karein', 'Check the internet signal'),
          option('password', 'Password badlein', 'Change the password'),
          option('storage', 'Saari photos mita dein', 'Delete all photos'),
          option('share-code', 'Call ka code sab ko bhejein', 'Send the call code to everyone')
        ],
        correctAction: 'internet'
      }),
      question({
        id: 'video-step-4', titleUr: 'Ghalat ijazat', titleEn: 'Camera permission',
        promptUr: 'Practice screen batati hai ke camera ijazat nahi mili. Aap kya seekhte hain?',
        promptEn: 'The practice screen says camera permission was not given. What should you learn?',
        contextUr: 'Phone app ko camera istemal karne ki ijazat pooch sakta hai.',
        contextEn: 'A phone may ask whether an app can use the camera.',
        hintUr: 'Sirf bharosemand app ko samajh kar ijazat dein; is practice mein asli ijazat nahi maangi jayegi.',
        hintEn: 'Only allow a trusted app after understanding the request; this practice asks for no real access.',
        answerUr: 'Pehle app ko pehchanein, phir zaroorat ho to camera ki ijazat dein.',
        answerEn: 'Check that the app is trusted, then allow camera access only if needed.',
        correctFeedbackUr: 'Theek. Ijazat dene se pehle samajhna zaroori hai.',
        correctFeedbackEn: 'Right. Understand a permission request before allowing it.',
        incorrectFeedbackUr: 'Har app ko camera ki ijazat dena zaroori nahi. Pehle app ko pehchanein.',
        incorrectFeedbackEn: 'Not every app needs camera access. Check which app is asking first.',
        options: [
          option('trusted', 'App check kar ke zaroorat par ijazat dein', 'Check the app and allow only if needed'),
          option('all', 'Har app ko ijazat dein', 'Allow every app'),
          option('share', 'Phone ka password bhejein', 'Send the phone password'),
          option('ignore', 'Bina parhe har baat maan lein', 'Accept everything without reading')
        ],
        correctAction: 'trusted'
      }),
      question({
        id: 'video-step-5', titleUr: 'Call khatam karna', titleEn: 'Ending a call',
        promptUr: 'Aapki baat mukammal ho gayi. Call khatam karne ke liye aam tor par kya dabate hain?',
        promptEn: 'You have finished talking. What do you usually tap to end a call?',
        contextUr: 'Screen par laal phone wala nishan call band karta hai.',
        contextEn: 'The red phone symbol usually ends a call.',
        hintUr: 'Mic aur camera wale nishan se alag, phone ka receiver wala button dekhein.',
        hintEn: 'Look for the phone receiver button, not the microphone or camera.',
        answerUr: 'Laal phone ya End Call button dabayein.',
        answerEn: 'Tap the red phone or End Call button.',
        correctFeedbackUr: 'Shabash. Aapne call ko theek se band kar diya.',
        correctFeedbackEn: 'Well done. You ended the call correctly.',
        incorrectFeedbackUr: 'Mic band karne se call khatam nahi hoti. Laal phone wale button ko chunein.',
        incorrectFeedbackEn: 'Muting does not end the call. Choose the red phone button.',
        options: [
          option('end', 'Laal phone / End Call', 'Red phone / End Call'),
          option('mute', 'Mic mute', 'Mute microphone'),
          option('camera', 'Camera band', 'Turn off camera'),
          option('volume', 'Awaaz barhayein', 'Turn up the volume')
        ],
        correctAction: 'end'
      })
    ]
  }
];
