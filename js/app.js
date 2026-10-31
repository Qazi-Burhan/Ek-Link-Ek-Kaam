import { DEFAULT_GUIDES } from './guides.js';
import { buildGuideShareUrl, encodeGuideForUrl, validateGuideData } from './encode.js';
import { initI18n, localized, t } from './i18n.js';

let shareTrigger = null;

function createId(prefix) {
  const randomPart = window.crypto?.randomUUID?.() || Math.random().toString(16).slice(2);
  return `${prefix}-${Date.now()}-${randomPart}`;
}

function node(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}

function makeDefaultStep() {
  return {
    id: createId('step'),
    title: { en: '', ur: '' },
    instruction: { en: '', ur: '' },
    hint: { en: '', ur: '' },
    image: '📌'
  };
}

function renderCards() {
  const container = document.getElementById('guide-cards');
  if (!container) return;
  container.replaceChildren();

  DEFAULT_GUIDES.forEach((guide) => {
    const card = node('article', 'guide-card');
    const top = node('div', 'guide-top');
    top.append(node('span', 'guide-icon', guide.icon));
    top.lastChild.setAttribute('aria-hidden', 'true');
    top.append(node('span', 'guide-stat', `${guide.steps.length} ${t('steps')}`));

    const heading = node('h3', '', localized(guide.title));
    const description = node('p', '', localized(guide.description));
    const startButton = node('a', 'btn btn-primary', t('startGuide'));
    startButton.href = './play.html';
    startButton.addEventListener('click', (event) => {
      event.preventDefault();
      try {
        sessionStorage.removeItem(`ek-link-ek-kaam.run.${guide.id}`);
        window.location.href = `./play.html#guide=${encodeGuideForUrl(guide)}`;
      } catch (error) {
        console.error('Could not create a link for the demo guide.', error);
        window.alert(t('error'));
      }
    });
    heading.dir = 'auto';
    description.dir = 'auto';
    card.append(top, heading, description, startButton);
    container.appendChild(card);
  });
}

function field(labelKey, className, value, options = {}) {
  const wrapper = node('div', 'field-group');
  const label = node('label', '', t(labelKey));
  const control = node(options.multiline ? 'textarea' : 'input', className);
  control.className = className;
  control.value = value || '';
  control.id = createId('field');
  label.htmlFor = control.id;
  if (options.rows) control.rows = options.rows;
  if (options.maxLength) control.maxLength = options.maxLength;
  control.dir = options.dir || 'auto';
  wrapper.append(label, control);
  return { wrapper, control };
}

function getStepValues(card) {
  const languages = ['en', 'ur'];
  const value = (selector) => Object.fromEntries(languages.map((language) => [
    language,
    card.querySelector(`[data-field="${selector}-${language}"]`).value.trim()
  ]));
  return {
    id: card.dataset.stepId,
    title: value('title'),
    instruction: value('instruction'),
    hint: value('hint'),
    image: card.querySelector('[data-field="image"]').value.trim() || '📌'
  };
}

function addFieldPair(container, labelKey, fieldName, options = {}) {
  const pair = node('div', 'bilingual-field-pair');
  const en = field(labelKey.en, '', options.en || '', {
    multiline: options.multiline,
    rows: options.rows,
    maxLength: options.maxLength,
    dir: 'ltr'
  });
  en.control.dataset.field = `${fieldName}-en`;
  en.control.placeholder = options.placeholderEn || '';
  en.control.setAttribute('aria-label', t(labelKey.en));
  const ur = field(labelKey.ur, '', options.ur || '', {
    multiline: options.multiline,
    rows: options.rows,
    maxLength: options.maxLength,
    dir: 'rtl'
  });
  ur.control.dataset.field = `${fieldName}-ur`;
  ur.control.placeholder = options.placeholderUr || '';
  ur.control.setAttribute('aria-label', t(labelKey.ur));
  pair.append(en.wrapper, ur.wrapper);
  container.appendChild(pair);
}

function createStepEditor(step, index) {
  const card = node('article', 'step-card');
  card.dataset.stepId = step.id;

  const header = node('div', 'step-card-header');
  header.append(node('span', 'step-index', String(index + 1)));
  const controls = node('div', 'step-controls');

  [
    ['moveUp', '↑', 'up'],
    ['moveDown', '↓', 'down'],
    ['deleteStep', '×', 'remove']
  ].forEach(([key, symbol, action]) => {
    const button = node('button', 'icon-btn', symbol);
    button.type = 'button';
    button.dataset.stepAction = action;
    button.dataset.i18nAriaLabel = key;
    button.setAttribute('aria-label', t(key));
    controls.appendChild(button);
  });
  header.appendChild(controls);

  const grid = node('div', 'step-grid');
  addFieldPair(grid, { en: 'stepTitleEn', ur: 'stepTitleUr' }, 'title', {
    en: step.title.en,
    ur: step.title.ur,
    placeholderEn: 'e.g. Join the meeting',
    placeholderUr: 'مثال: میٹنگ میں شامل ہوں',
    maxLength: 100
  });
  const emojiWrap = node('div', 'field-group');
  const emojiLabel = node('label', '', t('emoji'));
  const emojiSelect = node('select', 'emoji-input');
  emojiSelect.id = createId('emoji');
  emojiSelect.dataset.field = 'image';
  emojiLabel.htmlFor = emojiSelect.id;
  const emojiChoices = ['📌', '📱', '🔗', '🔍', '✅', '💬', '👤', '📎', '🖼️', '🚀', '📝', '▶️', '📹', '📸', '🎬'];
  if (!emojiChoices.includes(step.image)) emojiChoices.unshift(step.image);
  emojiChoices.forEach((value) => {
    const option = node('option', '', value);
    option.value = value;
    emojiSelect.appendChild(option);
  });
  emojiSelect.value = step.image || '📌';
  emojiWrap.append(emojiLabel, emojiSelect);
  grid.appendChild(emojiWrap);
  addFieldPair(grid, { en: 'instructionEn', ur: 'instructionUr' }, 'instruction', {
    en: step.instruction.en,
    ur: step.instruction.ur,
    multiline: true,
    rows: 2,
    placeholderEn: 'Describe this step in English',
    placeholderUr: 'اس قدم کی ہدایت اردو میں لکھیں'
  });
  addFieldPair(grid, { en: 'hintEn', ur: 'hintUr' }, 'hint', {
    en: step.hint.en,
    ur: step.hint.ur,
    multiline: true,
    rows: 2,
    placeholderEn: 'Optional helpful hint',
    placeholderUr: 'اختیاری مددگار اشارہ'
  });

  card.append(header, grid);
  return card;
}

function refreshStepNumbers() {
  document.querySelectorAll('#steps-list .step-card').forEach((card, index) => {
    card.querySelector('.step-index').textContent = String(index + 1);
  });
}

function showFormError(key) {
  const errors = document.getElementById('form-errors');
  errors.textContent = t(key);
  errors.dataset.translationKey = key;
  errors.classList.add('visible');
}

function clearFormError() {
  const errors = document.getElementById('form-errors');
  errors.textContent = '';
  delete errors.dataset.translationKey;
  errors.classList.remove('visible');
}

function readGuideDraftFromForm() {
  const guide = {
    id: createId('guide'),
    title: {
      en: document.getElementById('guide-title-en').value.trim(),
      ur: document.getElementById('guide-title-ur').value.trim()
    },
    description: {
      en: document.getElementById('guide-description-en').value.trim(),
      ur: document.getElementById('guide-description-ur').value.trim()
    },
    steps: [...document.querySelectorAll('#steps-list .step-card')].map(getStepValues)
  };
  return guide;
}

function readGuideFromForm() {
  const guide = readGuideDraftFromForm();
  if (!guide.title.en && !guide.title.ur) throw new Error('guideTitleError');
  if (guide.steps.length < 2) throw new Error('stepsMinError');
  if (guide.steps.length > 15) throw new Error('stepsMaxError');
  if (guide.steps.some((step) =>
    (!step.title.en && !step.title.ur) ||
    (!step.instruction.en && !step.instruction.ur)
  )) throw new Error('stepRequiredError');
  return guide;
}

function renderPreview() {
  const preview = document.getElementById('guide-preview');
  if (!preview) return;
  preview.replaceChildren();

  const guide = readGuideDraftFromForm();

  const intro = node('div', 'preview-card');
  intro.append(
    node('h3', '', localized(guide.title, t('guideTitle'))),
    node('p', '', localized(guide.description, t('previewEmpty')))
  );
  intro.querySelector('h3').dir = 'auto';
  intro.querySelector('p').dir = 'auto';
  preview.appendChild(intro);

  guide.steps.forEach((step, index) => {
    const row = node('div', 'preview-step');
    row.append(node('span', 'step-pill', String(index + 1)));
    const text = node('div');
    text.append(
      node('strong', '', localized(step.title, `${t('stepsHeading')} ${index + 1}`)),
      node('p', '', localized(step.instruction, t('previewEmpty')))
    );
    text.querySelector('strong').dir = 'auto';
    text.querySelector('p').dir = 'auto';
    row.appendChild(text);
    preview.appendChild(row);
  });
}

function showShareModal(url) {
  shareTrigger = document.querySelector('#guide-form [type="submit"]');
  document.getElementById('share-link').value = url;
  document.getElementById('share-modal').classList.remove('hidden');
  document.getElementById('share-modal').setAttribute('aria-hidden', 'false');
  document.getElementById('copy-link').focus();
}

function closeShareModal() {
  document.getElementById('share-modal').classList.add('hidden');
  document.getElementById('share-modal').setAttribute('aria-hidden', 'true');
  if (shareTrigger?.isConnected) shareTrigger.focus();
  shareTrigger = null;
}

function trapModalFocus(event, modal, close) {
  if (modal.classList.contains('hidden')) return;
  if (event.key === 'Escape') {
    event.preventDefault();
    close();
    return;
  }
  if (event.key !== 'Tab') return;

  const focusable = [...modal.querySelectorAll(
    'button:not(:disabled), a[href], input:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])'
  )];
  if (focusable.length === 0) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

function initCreator() {
  const stepsList = document.getElementById('steps-list');
  stepsList.replaceChildren(createStepEditor(makeDefaultStep(), 0), createStepEditor(makeDefaultStep(), 1));

  document.getElementById('add-step').addEventListener('click', () => {
    const count = stepsList.children.length;
    if (count >= 15) {
      showFormError('stepsMaxError');
      return;
    }
    stepsList.appendChild(createStepEditor(makeDefaultStep(), count));
    refreshStepNumbers();
    renderPreview();
  });

  stepsList.addEventListener('click', (event) => {
    const button = event.target.closest('[data-step-action]');
    if (!button) return;
    const card = button.closest('.step-card');
    const cards = [...stepsList.children];
    const index = cards.indexOf(card);
    if (button.dataset.stepAction === 'remove') {
      if (cards.length <= 2) {
        showFormError('stepsMinError');
        return;
      }
      card.remove();
    } else if (button.dataset.stepAction === 'up' && index > 0) {
      stepsList.insertBefore(card, cards[index - 1]);
    } else if (button.dataset.stepAction === 'down' && index < cards.length - 1) {
      stepsList.insertBefore(card, cards[index + 2] || null);
    }
    refreshStepNumbers();
    clearFormError();
    renderPreview();
  });

  document.getElementById('guide-form').addEventListener('input', () => {
    clearFormError();
    renderPreview();
  });

  document.getElementById('guide-form').addEventListener('submit', (event) => {
    event.preventDefault();
    clearFormError();
    try {
      const guide = readGuideFromForm();
      const validGuide = validateGuideData({ ...guide, version: 2 });
      showShareModal(buildGuideShareUrl(validGuide));
    } catch (error) {
      const translationKey = ['guideTitleError', 'stepsMinError', 'stepsMaxError', 'stepRequiredError'].includes(error.message)
        ? error.message
        : 'error';
      showFormError(translationKey);
    }
  });

  document.getElementById('reset-form').addEventListener('click', () => {
    document.getElementById('guide-form').reset();
    stepsList.replaceChildren(createStepEditor(makeDefaultStep(), 0), createStepEditor(makeDefaultStep(), 1));
    clearFormError();
    renderPreview();
  });

  document.getElementById('copy-link').addEventListener('click', async () => {
    const input = document.getElementById('share-link');
    const status = document.getElementById('share-status');
    status.classList.remove('visible');
    delete status.dataset.translationKey;
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard API unavailable');
      await navigator.clipboard.writeText(input.value);
      const copyButton = document.getElementById('copy-link');
      copyButton.dataset.copyState = 'copied';
      copyButton.textContent = t('copied');
      window.setTimeout(() => {
        delete copyButton.dataset.copyState;
        copyButton.textContent = t('copyLink');
      }, 1500);
    } catch (error) {
      input.focus();
      input.select();
      status.textContent = t('copyFailed');
      status.dataset.translationKey = 'copyFailed';
      status.classList.add('visible');
    }
  });

  document.getElementById('share-whatsapp').addEventListener('click', () => {
    const message = encodeURIComponent(`${t('linkTitle')}: ${document.getElementById('share-link').value}`);
    window.open(`https://wa.me/?text=${message}`, '_blank', 'noopener,noreferrer');
  });
  document.getElementById('close-modal').addEventListener('click', closeShareModal);
  document.getElementById('share-modal').addEventListener('click', (event) => {
    if (event.target.id === 'share-modal') closeShareModal();
  });
  document.addEventListener('keydown', (event) =>
    trapModalFocus(event, document.getElementById('share-modal'), closeShareModal)
  );

  renderPreview();
}

initI18n();
if (document.body.classList.contains('page-home')) renderCards();
if (document.body.classList.contains('page-create')) initCreator();

window.addEventListener('app-language-change', () => {
  if (document.body.classList.contains('page-home')) renderCards();
  if (document.body.classList.contains('page-create')) {
    const formErrors = document.getElementById('form-errors');
    if (formErrors.dataset.translationKey) {
      formErrors.textContent = t(formErrors.dataset.translationKey);
    }
    const shareStatus = document.getElementById('share-status');
    if (shareStatus.dataset.translationKey) {
      shareStatus.textContent = t(shareStatus.dataset.translationKey);
    }
    const copyButton = document.getElementById('copy-link');
    if (copyButton.dataset.copyState === 'copied') copyButton.textContent = t('copied');
    else copyButton.textContent = t('copyLink');
    document.querySelectorAll('#steps-list [data-i18n-aria-label]').forEach((button) => {
      button.setAttribute('aria-label', t(button.dataset.i18nAriaLabel));
    });
    document.querySelectorAll('#steps-list label').forEach((label) => {
      const input = label.nextElementSibling;
      const key = input?.dataset.field;
      if (!key) return;
      const labelKey = {
        'title-en': 'stepTitleEn', 'title-ur': 'stepTitleUr',
        'instruction-en': 'instructionEn', 'instruction-ur': 'instructionUr',
        'hint-en': 'hintEn', 'hint-ur': 'hintUr'
      }[key];
      if (labelKey) label.textContent = t(labelKey);
      if (key === 'image') label.textContent = t('emoji');
    });
    renderPreview();
  }
});
