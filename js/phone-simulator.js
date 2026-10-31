function element(tag, className = '', text = '') {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

function pair(ur, en, language) {
  return language === 'ur' ? ur : en;
}

function labeledRow(label, value, lang) {
  const row = element('div', 'demo-row');
  row.append(element('span', 'demo-row-label', pair(label[0], label[1], lang)));
  row.append(element('strong', 'demo-row-value', pair(value[0], value[1], lang)));
  return row;
}

function appendActionButtons(container, options, lang, onChoice) {
  const actions = element('div', 'sim-action-list');
  actions.setAttribute('role', 'group');
  actions.setAttribute('aria-label', pair('مشق کے لیے فون کے بٹن', 'Practice phone actions', lang));
  options.forEach((option) => {
    const button = element('button', 'sim-action');
    button.type = 'button';
    button.dataset.choice = option.id;
    button.textContent = lang === 'ur' ? option.labelUr : option.labelEn;
    button.addEventListener('click', () => onChoice(option.id));
    actions.append(button);
  });
  container.append(actions);
}

function addDemoScene(container, scenarioId, stepIndex, lang) {
  if (scenarioId === 'bank-logout') {
    const balance = element('div', 'demo-balance-card');
    balance.append(element('span', 'demo-overline', pair('فرضی کھاتا', 'DEMO ACCOUNT', lang)));
    balance.append(element('strong', 'demo-balance', pair('روپے ۲۴،۵۰۰', 'Rs 24,500', lang)));
    balance.append(element('span', 'demo-muted', pair('صرف نمونہ، اصلی رقم نہیں', 'Sample only, not real money', lang)));
    container.append(balance);
    const menu = element('div', 'demo-menu-list');
    [
      ['کھاتے کی تفصیل', 'Account details'],
      ['حالیہ سرگرمی', 'Recent activity'],
      ['ترتیبات', 'Settings'],
      ['محفوظ طریقے سے باہر آئیں', 'Log out safely']
    ].forEach((item, index) => {
      menu.append(labeledRow(item, index === Math.min(stepIndex, 3) ? ['یہاں مشق کریں', 'Practice this step'] : ['نمونہ', 'Example'], lang));
    });
    container.append(menu);
  } else if (scenarioId === 'government-form') {
    const form = element('div', 'demo-form');
    form.append(element('h3', 'demo-section-title', pair('فرضی شہری خدمت کا فارم', 'Fictional public service form', lang)));
    form.append(element('p', 'demo-muted', pair('یہ معلومات صرف نمونے کے لیے ہیں۔', 'These details are examples only.', lang)));
    [
      [pair('نام', 'Name', lang), pair('نمونہ صارف', 'Practice User', lang)],
      [pair('موبائل نمبر', 'Mobile number', lang), '03xx-xxx-xxxx']
    ].forEach(([label, value]) => {
      const wrapper = element('label', 'demo-field');
      wrapper.append(element('span', '', label));
      const input = element('input');
      input.value = value;
      input.readOnly = true;
      input.setAttribute('aria-label', label);
      wrapper.append(input);
      form.append(wrapper);
    });
    [
      [pair('علاقہ منتخب کریں', 'Choose an area', lang), ['لاہور', 'کراچی', 'ملتان']],
      [pair('خدمت منتخب کریں', 'Choose a service', lang), ['معلومات', 'درخواست', 'مدد']]
    ].forEach(([label, values]) => {
      const wrapper = element('label', 'demo-field');
      wrapper.append(element('span', '', label));
      const select = element('select');
      select.setAttribute('aria-label', label);
      values.forEach((value, index) => {
        const option = element('option', '', lang === 'ur' ? value : ['Lahore', 'Karachi', 'Multan'][index]);
        option.value = value;
        select.append(option);
      });
      select.addEventListener('change', () => {
        const notice = form.querySelector('.demo-form-note');
        notice.textContent = pair('نمونہ انتخاب بدل گیا۔ کچھ بھی بھیجا نہیں گیا۔', 'Sample choice changed. Nothing was sent.', lang);
      });
      wrapper.append(select);
      form.append(wrapper);
    });
    form.append(element('p', 'demo-form-note', pair('یہ فرضی فارم ہے۔ کوئی معلومات جمع نہیں ہوتیں۔', 'This is a fictional form. No information is submitted.', lang)));
    container.append(form);
  } else if (scenarioId === 'storage-full') {
    const usage = element('div', 'demo-storage');
    usage.append(element('h3', 'demo-section-title', pair('فون کی جگہ', 'Phone storage', lang)));
    usage.append(element('div', 'storage-usage-label', pair('۸ جی بی میں سے ۷ جی بی استعمال', '7 GB of 8 GB used', lang)));
    const track = element('div', 'storage-track');
    const fill = element('span', 'storage-track-fill');
    fill.style.width = '87.5%';
    track.append(fill);
    usage.append(track);
    [
      [pair('تصویریں', 'Photos', lang), '2.4 GB', '68%'],
      [pair('ویڈیوز', 'Videos', lang), '3.1 GB', '78%'],
      [pair('ایپس', 'Apps', lang), '1.2 GB', '42%'],
      [pair('ڈاؤن لوڈ', 'Downloads', lang), '0.3 GB', '24%']
    ].forEach(([label, size, width]) => {
      const row = element('div', 'storage-category');
      row.append(labeledRow([label, label], [size, size], lang));
      const categoryTrack = element('div', 'storage-track small');
      const categoryFill = element('span', 'storage-track-fill');
      categoryFill.style.width = width;
      categoryTrack.append(categoryFill);
      row.append(categoryTrack);
      usage.append(row);
    });
    usage.append(element('p', 'demo-muted', pair('یہ صرف فرضی فائلیں ہیں۔ فون کی اصلی چیزوں تک رسائی نہیں۔', 'These are fictional files. Real phone files are not accessed.', lang)));
    container.append(usage);
  } else if (scenarioId === 'forgot-password') {
    const recovery = element('div', 'demo-recovery');
    recovery.append(element('h3', 'demo-section-title', pair('اکاؤنٹ میں داخل ہوں', 'Sign in to your account', lang)));
    const username = element('div', 'demo-fake-input');
    username.append(element('span', 'demo-row-label', pair('فرضی کھاتا', 'SAMPLE ACCOUNT', lang)));
    username.append(element('strong', '', pair('نمونہ صارف', 'Practice User', lang)));
    recovery.append(username);
    const secret = element('div', 'demo-fake-input');
    secret.append(element('span', 'demo-row-label', pair('فرضی خفیہ لفظ', 'SAMPLE PASSWORD', lang)));
    secret.append(element('strong', 'demo-password-value', '••••••••••'));
    const visibility = element('button', 'btn btn-ghost demo-password-toggle', pair('دکھائیں', 'Show'));
    visibility.type = 'button';
    visibility.setAttribute('aria-pressed', 'false');
    visibility.addEventListener('click', () => {
      const visible = visibility.getAttribute('aria-pressed') === 'true';
      secret.querySelector('.demo-password-value').textContent = visible ? '••••••••••' : 'Practice-only';
      visibility.setAttribute('aria-pressed', String(!visible));
      visibility.textContent = pair(visible ? 'دکھائیں' : 'چھپائیں', visible ? 'Show' : 'Hide', lang);
    });
    secret.append(visibility);
    recovery.append(secret);
    recovery.append(element('p', 'demo-muted', pair('اصلی خفیہ لفظ یہاں نہ لکھیں۔', 'Do not enter a real password here.', lang)));
    container.append(recovery);
  } else if (scenarioId === 'video-call') {
    const call = element('div', 'demo-call');
    call.append(element('div', 'demo-avatar', lang === 'ur' ? 'س' : 'P'));
    call.append(element('strong', 'demo-contact-name', pair('نمونہ رابطہ', 'Practice contact', lang)));
    call.append(element('span', 'demo-muted', pair(
      stepIndex < 2 ? 'کال مل رہی ہے…' : stepIndex < 4 ? 'رابطہ کمزور ہے' : 'فرضی کال جڑ گئی',
      stepIndex < 2 ? 'Calling…' : stepIndex < 4 ? 'Connection is weak' : 'Practice call connected',
      lang
    )));
    const controls = element('div', 'demo-call-controls');
    [pair('مائیک', 'Mic', lang), pair('کیمرہ', 'Camera', lang), pair('کال بند', 'End call', lang)].forEach((label) => {
      controls.append(element('span', 'demo-call-control', label));
    });
    call.append(controls);
    call.append(element('p', 'demo-muted', pair('یہ تصویر اور آواز کی فرضی مشق ہے۔', 'This is a fictional video and audio practice.', lang)));
    container.append(call);
  } else if (scenarioId === 'real-fake-message') {
    const message = element('div', 'demo-sms-card');
    message.append(element('span', 'demo-overline', pair('فرضی پیغام', 'FICTIONAL MESSAGE')));
    message.append(element('strong', '', pair('نامعلوم بھیجنے والا', 'Unknown sender')));
    message.append(element('p', '', pair(
      'آپ نے انعام جیتا ہے۔ تفصیل دیکھنے کے لیے لنک کھولیں۔',
      'You won a prize. Open the link to see the details.'
    )));
    message.append(element('span', 'demo-muted', pair(
      'کسی لنک پر نہیں جایا جائے گا۔',
      'No link will open.'
    )));
    container.append(message);
  }
}

export function createPhoneShell({ root, language, title, icon, onBack }) {
  root.replaceChildren();
  const phone = element('div', 'sim-phone');
  const appHeader = element('div', 'sim-app-header');
  const back = element('button', 'sim-phone-back', pair('⌂', '⌂', language));
  back.type = 'button';
  back.setAttribute('aria-label', pair('مشقوں کی فہرست پر واپس جائیں', 'Return to practice list', language));
  back.addEventListener('click', onBack);
  const appIdentity = element('div', 'sim-app-identity');
  appIdentity.append(element('span', 'sim-app-dot', icon));
  appIdentity.append(element('strong', '', title));
  appHeader.append(back, appIdentity);
  const menu = element('span', 'sim-app-menu', '⋮');
  menu.setAttribute('aria-hidden', 'true');
  appHeader.append(menu);
  phone.append(appHeader);

  const content = element('div', 'sim-phone-content');
  const training = element('div', 'sim-training-label', pair('یہ صرف پریکٹس ہے، اصلی فون نہیں۔', 'Practice only—this is not a real phone.', language));
  training.setAttribute('role', 'note');
  content.append(training);
  root.append(phone);
  return { phone, content };
}

export function renderPhoneSimulation({
  root,
  language,
  scenario,
  step,
  stepIndex,
  totalSteps,
  options,
  feedbackText,
  feedbackType,
  onChoice,
  onBack
}) {
  const { phone, content } = createPhoneShell({
    root,
    language,
    title: scenario.title[language],
    icon: scenario.id === 'bank-logout' ? 'M' : scenario.icon,
    onBack
  });
  phone.classList.add(`sim-phone-${scenario.id}`);
  const titlebar = element('div', 'sim-screen-title');
  titlebar.append(element('span', 'sim-step-title', step.title[language]));
  titlebar.append(element('span', 'sim-step-count', `${stepIndex + 1} / ${totalSteps}`));
  content.append(titlebar);

  const scene = element('section', 'sim-app-scene');
  scene.setAttribute('aria-label', pair('فرضی ایپ کی اسکرین', 'Fictional app screen', language));
  addDemoScene(scene, scenario.id, stepIndex, language);
  content.append(scene);
  content.append(element('p', 'sim-question', language === 'ur' ? step.promptUr : step.promptEn));
  appendActionButtons(content, options, language, onChoice);

  const feedback = element('div', `sim-feedback ${feedbackType ? `is-${feedbackType}` : 'is-empty'}`, feedbackText || '');
  feedback.setAttribute('role', 'status');
  feedback.setAttribute('aria-live', 'polite');
  content.append(feedback);
  phone.append(content);
}
