import { createPhoneShell } from './phone-simulator.js';

function node(tag, className = '', text = '') {
  const item = document.createElement(tag);
  if (className) item.className = className;
  if (text) item.textContent = text;
  return item;
}

function copy(language, ur, en) {
  return language === 'ur' ? ur : en;
}

function addScreenTitle(content, language, title, progress = '') {
  const heading = node('div', 'sim-screen-title');
  heading.append(node('span', 'sim-step-title', title));
  if (progress) heading.append(node('span', 'sim-step-count', progress));
  content.append(heading);
}

function openPhone(root, language, title, onBack) {
  const { phone, content } = createPhoneShell({
    root,
    language,
    title,
    icon: '✉',
    onBack
  });
  phone.classList.add('sim-phone-messages');
  phone.append(content);
  return { phone, content };
}

export function renderWalletInbox(root, { language, completedIds, onOpenWallet, onOpenMore, onBack, onShowSummary }) {
  const { content } = openPhone(root, language, copy(language, 'پیغامات', 'Messages'), onBack);
  addScreenTitle(content, language, copy(language, 'فرضی پیغامات', 'Practice inbox'));
  content.append(node(
    'p',
    'sim-question',
    copy(language, 'یہ دونوں پیغام فرضی تربیتی مثالیں ہیں، اصلی JazzCash یا Easypaisa پیغامات نہیں۔', 'These are fictional training examples, not real JazzCash or Easypaisa messages.')
  ));

  const inbox = node('div', 'sms-inbox-list');
  [
    { id: 'wallet-jazzcash', brand: 'JazzCash', sender: 'JZ-CASH-HELP', time: '10:24 AM', preview: copy(language, 'اکاؤنٹ بند ہونے اور کوڈ کی بات…', 'Account closure and code request…') },
    { id: 'wallet-easypaisa', brand: 'Easypaisa', sender: 'EP-REWARD-ALERT', time: '11:06 AM', preview: copy(language, 'انعام اور تصدیق کی بات…', 'Prize and verification request…') }
  ].forEach((message) => {
    const button = node('button', 'sms-inbox-item');
    button.type = 'button';
    button.dataset.openWallet = message.id;
    const heading = node('span', 'sms-inbox-heading');
    heading.append(node('strong', '', message.brand));
    heading.append(node('span', 'fictional-pill', copy(language, 'فرضی مشق', 'SIMULATION')));
    const meta = node('span', 'sms-inbox-meta');
    meta.append(node('span', '', message.sender));
    meta.append(node('time', '', message.time));
    button.append(heading, meta, node('span', 'sms-inbox-preview', message.preview));
    if (completedIds.includes(message.id)) {
      button.append(node('span', 'sms-inbox-done', copy(language, 'مشق مکمل', 'Practice completed')));
    }
    button.addEventListener('click', () => onOpenWallet(message.id));
    inbox.append(button);
  });
  content.append(inbox);

  const more = node('button', 'btn btn-secondary sms-more-practice', copy(language, 'دیگر فرضی پیغامات دیکھیں', 'Review other fictional messages'));
  more.type = 'button';
  more.addEventListener('click', onOpenMore);
  content.append(more);
  if (completedIds.includes('wallet-jazzcash') && completedIds.includes('wallet-easypaisa')) {
    const summary = node('button', 'btn btn-primary sms-combined-summary', copy(language, 'دونوں کا خلاصہ دیکھیں', 'See the combined summary'));
    summary.type = 'button';
    summary.addEventListener('click', onShowSummary);
    content.append(summary);
  }
}

export function renderWalletMessage(root, {
  language,
  message,
  instruction,
  selectedIds,
  lastFeedback,
  feedbackType,
  complete,
  completedWalletIds,
  onBack,
  onSelect,
  onReturnToInbox,
  onShowSummary
}) {
  const { content } = openPhone(root, language, message.brand, onBack);
  addScreenTitle(content, language, message.heading[language]);

  const metadata = node('div', 'sms-message-meta');
  metadata.append(node('strong', '', `${message.brand} (${copy(language, 'فرضی مشق', 'SIMULATION')})`));
  metadata.append(node('span', '', copy(language, 'فرضی پیغام، اصلی ادارے کی طرف سے نہیں', 'Fictional message, not from the real service')));
  metadata.append(node('time', '', message.time));
  content.append(metadata);
  content.append(node(
    'p',
    'wallet-instruction',
    instruction
  ));

  const senderWarning = message.warnings.find((warning) => warning.id === 'sender');
  if (senderWarning) {
    const senderButton = node('button', `sms-sender-warning ${selectedIds.has(senderWarning.id) ? 'is-selected' : ''}`);
    senderButton.type = 'button';
    senderButton.textContent = `${copy(language, 'بھیجنے والا', 'Sender')}: ${message.sender}`;
    senderButton.setAttribute('aria-pressed', String(selectedIds.has(senderWarning.id)));
    senderButton.disabled = complete || selectedIds.has(senderWarning.id);
    senderButton.addEventListener('click', () => onSelect(senderWarning.id));
    content.append(senderButton);
  } else {
    content.append(node('div', 'sms-sender-label', `${copy(language, 'بھیجنے والا', 'Sender')}: ${message.sender}`));
  }

  const bubble = node('div', 'sms-message-bubble');
  bubble.setAttribute('dir', language === 'ur' ? 'rtl' : 'ltr');
  const opening = node('button', 'sms-fragment sms-safe-fragment', message.opening[language]);
  opening.type = 'button';
  opening.disabled = complete;
  opening.setAttribute('aria-label', `${message.opening[language]} — ${copy(language, 'پیغام کا یہ حصہ چنیں', 'Select this part of the message')}`);
  opening.addEventListener('click', () => onSelect('safe-opening'));
  bubble.append(opening);
  message.warnings.filter((warning) => warning.id !== 'sender' && warning.id !== 'link').forEach((warning) => {
    const fragment = node('button', `sms-fragment ${selectedIds.has(warning.id) ? 'is-warning-selected' : ''}`);
    fragment.type = 'button';
    fragment.dataset.walletWarning = warning.id;
    fragment.setAttribute('aria-pressed', String(selectedIds.has(warning.id)));
    fragment.setAttribute('aria-label', `${warning.text[language]} — ${copy(language, 'خطرے کی نشانی پہچانیں', 'Identify this warning sign')}`);
    fragment.setAttribute('aria-describedby', `wallet-reason-${warning.id}`);
    fragment.disabled = complete || selectedIds.has(warning.id);
    fragment.append(node('span', 'sms-fragment-text', warning.text[language]));
    if (selectedIds.has(warning.id)) {
      const indicator = node('span', 'sms-warning-indicator');
      indicator.setAttribute('aria-hidden', 'true');
      fragment.append(indicator);
    }
    fragment.addEventListener('click', () => onSelect(warning.id));
    bubble.append(document.createTextNode(' '), fragment);
  });
  bubble.append(document.createTextNode(' '), node('span', 'sms-plain-fragment', message.closing[language]));
  content.append(bubble);
  const linkWarning = message.warnings.find((warning) => warning.id === 'link');
  if (linkWarning) {
    const link = node('button', `sms-fragment sms-link-fragment ${selectedIds.has(linkWarning.id) ? 'is-warning-selected' : ''}`);
    link.type = 'button';
    link.dataset.walletWarning = linkWarning.id;
    link.textContent = linkWarning.text[language];
    link.setAttribute('aria-pressed', String(selectedIds.has(linkWarning.id)));
    link.setAttribute('aria-label', `${linkWarning.text[language]} — ${copy(language, 'فرضی انجان پتہ', 'Fictional unknown address')}`);
    link.setAttribute('aria-describedby', `wallet-reason-${linkWarning.id}`);
    link.disabled = complete || selectedIds.has(linkWarning.id);
    if (selectedIds.has(linkWarning.id)) {
      const indicator = node('span', 'sms-warning-indicator');
      indicator.setAttribute('aria-hidden', 'true');
      link.append(indicator);
    }
    link.addEventListener('click', () => onSelect(linkWarning.id));
    content.append(link);
  }

  const clueCount = selectedIds.size;
  content.append(node(
    'div',
    'sms-count',
    copy(language, `${clueCount} از ${message.warnings.length} خطرے کی نشانیاں پہچانی گئیں`, `${clueCount} of ${message.warnings.length} warning signs found`)
  ));
  message.warnings.forEach((warning) => {
    const explanation = node('p', 'sms-clue-explanation', warning.why[language]);
    explanation.id = `wallet-reason-${warning.id}`;
    explanation.hidden = !selectedIds.has(warning.id);
    content.append(explanation);
  });
  const feedback = node(
    'div',
    `sim-feedback ${lastFeedback ? (feedbackType === 'incorrect' ? 'is-incorrect' : 'is-correct') : 'is-empty'}`,
    lastFeedback || ''
  );
  feedback.setAttribute('role', 'status');
  feedback.setAttribute('aria-live', 'polite');
  content.append(feedback);

  if (complete) {
    const completion = node('div', 'sms-wallet-complete');
    completion.append(node('strong', '', copy(language, 'بہت خوب! آپ نے تمام خطرے کی نشانیاں پہچان لی ہیں۔', 'Well done! You found all the warning signs.')));
    completion.append(node('p', '', message.explanation[language]));
    completion.append(node('p', '', copy(language, 'OTP یا PIN کبھی نہ بتائیں۔ جلدی کے دباؤ میں نہ آئیں۔ انجان ادائیگی کے لنک نہ کھولیں۔ معلوم ایپ میں خود تصدیق کریں۔', 'Never share an OTP or PIN. Do not rush under pressure. Avoid unknown payment links. Check in the app you know.')));
    content.append(completion);

    const returnButton = node('button', 'btn btn-secondary sms-return-inbox', copy(language, 'واپس پیغامات پر جائیں', 'Return to inbox'));
    returnButton.type = 'button';
    returnButton.addEventListener('click', onReturnToInbox);
    content.append(returnButton);
    if (completedWalletIds.includes('wallet-jazzcash') && completedWalletIds.includes('wallet-easypaisa')) {
      const summaryButton = node('button', 'btn btn-primary sms-combined-summary', copy(language, 'دونوں کا خلاصہ دیکھیں', 'See the combined summary'));
      summaryButton.type = 'button';
      summaryButton.addEventListener('click', onShowSummary);
      content.append(summaryButton);
    }
  }
}

export function renderWalletLearningSummary(root, { language, onBack, onFinish }) {
  const { content } = openPhone(root, language, copy(language, 'محفوظ رہنے کے آسان طریقے', 'Simple ways to stay safe'), onBack);
  addScreenTitle(content, language, copy(language, 'دونوں پیغامات کا خلاصہ', 'Both messages: learning summary'));
  content.append(node('p', 'sim-question', copy(language, 'دونوں پیغامات میں یہ خطرے کی نشانیاں تھیں:', 'Both messages included these warning signs:')));
  const advice = node('ul', 'sms-safety-list');
  [
    ['OTP یا PIN کسی کو نہ بتائیں۔', 'Never share an OTP or PIN.'],
    ['اکاؤنٹ بند ہونے کی جلدی والی دھمکی پر نہ گھبرائیں۔', 'Do not panic over an urgent account-closure threat.'],
    ['اچانک انعام کے وعدے کو پہلے چیک کریں۔', 'Check an unexpected prize claim first.'],
    ['انجان ادائیگی یا تصدیق کا لنک نہ کھولیں۔', 'Do not open an unknown payment or verification link.'],
    ['معلوم ایپ خود کھول کر پیغام کی تصدیق کریں۔', 'Open the app you know to check a message yourself.']
  ].forEach(([ur, en]) => advice.append(node('li', '', copy(language, ur, en))));
  content.append(advice);
  content.append(node('p', 'sms-brand-disclaimer', copy(language, 'یہ JazzCash اور Easypaisa کے نام سے بنائی گئی فرضی تربیتی مثالیں تھیں۔ ان کمپنیوں نے یہ پیغامات نہیں بھیجے۔', 'These were fictional training examples using JazzCash and Easypaisa names. These companies did not send these messages.')));
  const finish = node('button', 'btn btn-primary sms-finish', copy(language, 'مشق مکمل کریں', 'Finish practice'));
  finish.type = 'button';
  finish.addEventListener('click', onFinish);
  content.append(finish);
}
