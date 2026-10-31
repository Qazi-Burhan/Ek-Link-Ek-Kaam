import { scenarioCatalog, dictionaryEntries } from './scenarios.js';
import { messageExamples } from './message-practice.js';
import { teachBackCatalog } from './teach-back.js';
import { buildHelperText, getStepLevel, shuffleOptions } from './engine.js';
import { buildSummary, ensureScenarioState, getScenarioState, getStepState, loadState, markScenarioComplete, markTeachBackComplete, recordHelpRequest, recordMessageExampleComplete, recordScenarioAttempt, recordStepAttempt, recordStepSuccess, recordTeachBackAttempt, saveState } from './storage.js';
import { SpeechController } from './speech.js';
import { translate } from './i18n.js';

const state = loadState();
const speech = new SpeechController();

const runtime = {
  currentScenarioId: null,
  currentStepIndex: 0,
  mode: 'idle',
  presentation: 'dashboard',
  completionKind: 'practice',
  messageIndex: 0,
  messageSelectedClues: new Set(),
  messageAttemptCount: 0,
  messageHadWrongSelection: false,
  messageComplete: false,
  answerVisible: false,
  hintVisible: false,
  helpUsedForCurrentStep: false,
  answerAttemptCount: 0,
  feedback: null,
  shuffledOptionsByStep: {}
};

const dashboardView = document.getElementById('dashboard-view');
const scenarioView = document.getElementById('scenario-view');
const completionView = document.getElementById('completion-view');
const scenarioGrid = document.getElementById('scenario-grid');
const practiceStage = document.getElementById('practice-stage');
const scenarioHeader = document.getElementById('scenario-header');
const helperCopy = document.getElementById('helper-copy');
const dictionaryList = document.getElementById('dictionary-list');
const dictSheet = document.getElementById('dict-sheet');
const dictTitle = document.getElementById('dict-title');
const dictBody = document.getElementById('dict-body');
const consentModal = document.getElementById('consent-modal');
const toast = document.getElementById('toast');

function currentLanguage() {
  return state.language;
}

function t(key, values = {}) {
  return translate(key, currentLanguage(), values);
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.remove('hidden');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.add('hidden'), 2600);
}

function syncStaticText() {
  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const key = element.dataset.i18n;
    if (!key) return;
    const value = translate(key, currentLanguage());
    element.textContent = value;
  });
}

function setLanguage(lang) {
  speech.stop();
  state.language = lang;
  saveState(state);
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ur' ? 'rtl' : 'ltr';
  document.title = t('appName');
  document.querySelector('meta[name="description"]')?.setAttribute('content', t('pageDescription'));
  document.querySelector('.brand')?.setAttribute('aria-label', t('appName'));
  document.getElementById('language-control')?.setAttribute('aria-label', t('languageControl'));
  document.getElementById('dictionary-language-control')?.setAttribute('aria-label', t('languageControl'));
  document.getElementById('progress-panel')?.setAttribute('aria-label', t('progressHeading'));
  document.getElementById('close-dictionary')?.setAttribute('aria-label', t('closeDictionary'));
  document.querySelectorAll('[data-lang]').forEach((button) => {
    const active = button.dataset.lang === lang;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  syncStaticText();
  renderDashboard();
  if (runtime.presentation === 'scenario' && runtime.currentScenarioId) {
    renderScenario();
  } else if (runtime.presentation === 'completion') {
    renderCompletion();
  }
  if (!dictSheet.classList.contains('hidden') && dictionaryEntries[dictTitle.textContent]) {
    openDictionary(dictTitle.textContent);
  }
  if (!consentModal.classList.contains('hidden')) {
    handleShareProgress();
  }
}

function getScenarioById(id) {
  return scenarioCatalog.find((scenario) => scenario.id === id);
}

function renderDashboard() {
  const summary = buildSummary(state);
  document.getElementById('completed-scenarios').textContent = String(summary.completedScenarios);
  document.getElementById('attempt-count').textContent = String(summary.attempts);
  document.getElementById('independent-steps').textContent = String(summary.independentSteps);
  document.getElementById('need-practice').textContent = String(summary.needPractice);
  document.getElementById('completed-teach-backs').textContent = String(summary.completedTeachBacks);
  const continueButton = document.getElementById('continue-practice');
  const activeScenario = getScenarioById(state.activeSession?.scenarioId || state.lastScenarioId);
  continueButton.classList.toggle('hidden', !activeScenario);
  if (activeScenario) {
    const continueLabel = state.activeSession?.mode === 'teachback'
      ? t('continueTeachBack')
      : t('continuePractice');
    continueButton.textContent = `${continueLabel}: ${activeScenario.title[currentLanguage()]}`;
  }

  scenarioGrid.innerHTML = '';
  scenarioCatalog.forEach((scenario) => {
    const progress = getScenarioState(state, scenario.id);
    const article = document.createElement('article');
    article.className = 'scenario-card';
    article.innerHTML = `
      <div class="scenario-card-header">
        <span class="scenario-icon" aria-hidden="true">${scenario.icon}</span>
        <span class="scenario-status ${progress.completed ? 'is-complete' : ''}">${progress.completed ? '✅' : '🟢'}</span>
      </div>
      <h3>${scenario.title[currentLanguage()]}</h3>
      <p>${scenario.short[currentLanguage()]}</p>
      <div class="scenario-meta">
        <span>${progress.attempts || 0} ${t('attempts')}</span>
        <span>${progress.completed ? t('completed') : t('ready')}</span>
      </div>
      <div class="scenario-meta teach-back-meta">
        <span>${t('teachBackStatus')}</span>
        <span>${progress.teachBackCompleted ? t('teachBackDone') : t('teachBackPending')}</span>
      </div>
      ${scenario.id === 'real-fake-message' ? `
        <div class="scenario-meta teach-back-meta">
          <span>${t('messageCount', { completed: progress.messagePractice.completedIds.length, total: messageExamples.length })}</span>
        </div>
      ` : ''}
      <button type="button" class="btn btn-primary scenario-start" data-scenario-id="${scenario.id}">${t('startPractice')}</button>
      <button type="button" class="btn btn-secondary scenario-teach-back ${progress.completed ? '' : 'hidden'}" data-teach-back="${scenario.id}">${t('teachBackStart')}</button>
    `;
    article.querySelector('.scenario-start').addEventListener('click', () => startScenario(scenario.id));
    article.querySelector('.scenario-teach-back').addEventListener('click', () => startTeachBack(scenario.id));
    scenarioGrid.appendChild(article);
  });

  document.getElementById('share-progress').textContent = t('shareProgress');
  renderDictionary();
}

function persistActiveSession() {
  if (!runtime.currentScenarioId || !['practice', 'messages', 'teachback'].includes(runtime.mode)) {
    state.activeSession = null;
    saveState(state);
    return;
  }
  state.activeSession = {
    scenarioId: runtime.currentScenarioId,
    mode: runtime.mode,
    currentStepIndex: runtime.currentStepIndex,
    messageIndex: runtime.messageIndex,
    shuffledOptionsByStep: runtime.shuffledOptionsByStep,
    answerAttemptCount: runtime.answerAttemptCount,
    answerVisible: runtime.answerVisible,
    hintVisible: runtime.hintVisible,
    helpUsedForCurrentStep: runtime.helpUsedForCurrentStep,
    messageSelectedClues: [...runtime.messageSelectedClues],
    messageAttemptCount: runtime.messageAttemptCount,
    messageHadWrongSelection: runtime.messageHadWrongSelection,
    messageComplete: runtime.messageComplete,
    feedbackType: runtime.feedback?.type || null
  };
  state.lastScenarioId = runtime.currentScenarioId;
  saveState(state);
}

function resumePractice() {
  const session = state.activeSession;
  const scenario = getScenarioById(session?.scenarioId || state.lastScenarioId);
  if (!scenario) return;
  if (!session) {
    startScenario(scenario.id);
    return;
  }
  const validModes = ['practice', 'messages', 'teachback'];
  runtime.currentScenarioId = scenario.id;
  runtime.mode = validModes.includes(session.mode) ? session.mode : 'practice';
  runtime.presentation = 'scenario';
  runtime.currentStepIndex = Math.max(0, Math.min(Number(session.currentStepIndex) || 0, activeSteps().length - 1));
  runtime.messageIndex = Math.max(0, Math.min(Number(session.messageIndex) || 0, messageExamples.length - 1));
  runtime.shuffledOptionsByStep = session.shuffledOptionsByStep || {};
  activeSteps().forEach((step) => {
    if (!runtime.shuffledOptionsByStep[step.id]) {
      runtime.shuffledOptionsByStep[step.id] = shuffleOptions(step.options);
    }
  });
  runtime.answerAttemptCount = Number(session.answerAttemptCount) || 0;
  runtime.answerVisible = Boolean(session.answerVisible);
  runtime.hintVisible = Boolean(session.hintVisible);
  runtime.helpUsedForCurrentStep = Boolean(session.helpUsedForCurrentStep);
  runtime.messageSelectedClues = new Set(Array.isArray(session.messageSelectedClues) ? session.messageSelectedClues : []);
  runtime.messageAttemptCount = Number(session.messageAttemptCount) || 0;
  runtime.messageHadWrongSelection = Boolean(session.messageHadWrongSelection);
  runtime.messageComplete = Boolean(session.messageComplete);
  runtime.feedback = session.feedbackType === 'incorrect'
    ? { type: 'incorrect', ...(runtime.mode === 'messages' ? { text: t('messageWrongSelection') } : {}) }
    : runtime.messageComplete && runtime.mode === 'messages'
      ? { type: 'correct', text: messageExamples[runtime.messageIndex].feedback[currentLanguage()] }
      : null;
  renderScenario();
}

function startScenario(scenarioId) {
  const scenario = getScenarioById(scenarioId);
  if (!scenario) return;
  runtime.currentScenarioId = scenarioId;
  runtime.mode = 'practice';
  runtime.presentation = 'scenario';
  runtime.currentStepIndex = 0;
  runtime.messageIndex = 0;
  runtime.messageSelectedClues = new Set();
  runtime.messageAttemptCount = 0;
  runtime.messageHadWrongSelection = false;
  runtime.messageComplete = false;
  runtime.answerVisible = false;
  runtime.hintVisible = false;
  runtime.helpUsedForCurrentStep = false;
  runtime.answerAttemptCount = 0;
  runtime.feedback = null;
  runtime.shuffledOptionsByStep = Object.fromEntries(
    scenario.steps.map((step) => [step.id, shuffleOptions(step.options)])
  );
  state.lastScenarioId = scenarioId;
  recordScenarioAttempt(state, scenarioId);
  persistActiveSession();
  renderScenario();
}

function finishScenario() {
  const scenario = getScenarioById(runtime.currentScenarioId);
  if (!scenario) return;
  markScenarioComplete(state, scenario.id);
  state.lastScenarioId = null;
  state.activeSession = null;
  saveState(state);
  renderDashboard();
  showCompletion('practice');
}

function showDashboard() {
  runtime.presentation = 'dashboard';
  dashboardView.classList.remove('hidden');
  scenarioView.classList.add('hidden');
  completionView.classList.add('hidden');
}

function showScenario() {
  runtime.presentation = 'scenario';
  dashboardView.classList.add('hidden');
  completionView.classList.add('hidden');
  scenarioView.classList.remove('hidden');
}

function showCompletion(kind) {
  runtime.completionKind = kind;
  runtime.presentation = 'completion';
  dashboardView.classList.add('hidden');
  scenarioView.classList.add('hidden');
  completionView.classList.remove('hidden');
  renderCompletion();
  showToast(t(kind === 'teachback' ? 'completionTeachBackTitle' : 'scenarioComplete'));
}

function renderCompletion() {
  const scenario = currentScenario();
  if (!scenario) {
    showDashboard();
    return;
  }
  document.getElementById('completion-title').textContent = t(
    runtime.completionKind === 'teachback' ? 'completionTeachBackTitle' : 'completionPracticeTitle'
  );
  document.getElementById('completion-copy').textContent = t(
    runtime.completionKind === 'teachback' ? 'completionTeachBackText' : 'completionPracticeText'
  );
  const teachBackStart = document.getElementById('start-teach-back');
  const repeatTeachBack = document.getElementById('repeat-teach-back');
  teachBackStart.classList.toggle('hidden', runtime.completionKind === 'teachback');
  repeatTeachBack.classList.toggle('hidden', runtime.completionKind !== 'teachback');
}

function currentScenario() {
  return getScenarioById(runtime.currentScenarioId);
}

function currentStep() {
  const scenario = currentScenario();
  if (!scenario) return null;
  if (runtime.mode === 'teachback') {
    return teachBackCatalog[scenario.id]?.[runtime.currentStepIndex] || null;
  }
  if (runtime.mode === 'messages') {
    const message = messageExamples[runtime.messageIndex];
    if (!message) return null;
    return {
      id: `message-${message.id}`,
      title: { ur: 'فرضی پیغام', en: 'Fictional message' },
      contextUr: message.context.ur,
      contextEn: message.context.en,
      hintUr: message.hint.ur,
      hintEn: message.hint.en,
      answerUr: message.answer.ur,
      answerEn: message.answer.en
    };
  }
  return scenario.steps[runtime.currentStepIndex] || null;
}

function activeSteps() {
  const scenario = currentScenario();
  if (!scenario) return [];
  if (runtime.mode === 'teachback') return teachBackCatalog[scenario.id] || [];
  return scenario.steps;
}

function startTeachBack(scenarioId = runtime.currentScenarioId) {
  const scenario = getScenarioById(scenarioId);
  const steps = scenario ? teachBackCatalog[scenario.id] : null;
  if (!scenario || !steps?.length) return;
  runtime.currentScenarioId = scenario.id;
  runtime.mode = 'teachback';
  runtime.presentation = 'scenario';
  runtime.currentStepIndex = 0;
  runtime.answerVisible = false;
  runtime.hintVisible = false;
  runtime.helpUsedForCurrentStep = false;
  runtime.answerAttemptCount = 0;
  runtime.feedback = null;
  runtime.shuffledOptionsByStep = Object.fromEntries(
    steps.map((step) => [step.id, shuffleOptions(step.options)])
  );
  recordTeachBackAttempt(state, scenario.id);
  persistActiveSession();
  renderScenario();
}

function getStepHelperText(step) {
  if (runtime.answerVisible) {
    return currentLanguage() === 'ur' ? step.answerUr : step.answerEn;
  }
  if (runtime.hintVisible) {
    return currentLanguage() === 'ur' ? step.hintUr : step.hintEn;
  }
  const level = getStepLevel(state, runtime.currentScenarioId, step.id);
  return buildHelperText(step, currentLanguage(), level, false);
}

function handleChoice(choiceId) {
  const scenario = currentScenario();
  const step = currentStep();
  if (!scenario || !step) return;

  const firstAnswer = runtime.answerAttemptCount === 0;
  runtime.answerAttemptCount += 1;
  recordStepAttempt(state, scenario.id, step.id);

  if (choiceId === step.correctAction) {
    const independent = firstAnswer && !runtime.helpUsedForCurrentStep;
    recordStepSuccess(state, scenario.id, step.id, independent);
    runtime.feedback = null;
    saveState(state);
    showToast(currentLanguage() === 'ur' ? step.correctFeedbackUr : step.correctFeedbackEn);

    if (runtime.currentStepIndex + 1 < activeSteps().length) {
      runtime.currentStepIndex += 1;
      runtime.answerVisible = false;
      runtime.hintVisible = false;
      runtime.helpUsedForCurrentStep = false;
      runtime.answerAttemptCount = 0;
      runtime.feedback = null;
      persistActiveSession();
      renderScenario();
      return;
    }

    if (runtime.mode === 'teachback') {
      markTeachBackComplete(state, scenario.id);
      state.activeSession = null;
      state.lastScenarioId = null;
      saveState(state);
      renderDashboard();
      showCompletion('teachback');
      return;
    }

    if (scenario.id === 'real-fake-message') {
      startMessagePractice();
      return;
    }

    finishScenario();
    return;
  }

  runtime.feedback = { type: 'incorrect' };
  const stepProgress = getStepState(state, scenario.id, step.id);
  stepProgress.lastOutcome = 'retry';
  persistActiveSession();
  showToast(t('retryMessage'));
  renderScenario();
}

function startMessagePractice() {
  runtime.mode = 'messages';
  runtime.messageIndex = 0;
  resetMessageItem();
  persistActiveSession();
  renderScenario();
}

function resetMessageItem() {
  runtime.messageSelectedClues = new Set();
  runtime.messageAttemptCount = 0;
  runtime.messageHadWrongSelection = false;
  runtime.messageComplete = false;
  runtime.answerVisible = false;
  runtime.hintVisible = false;
  runtime.helpUsedForCurrentStep = false;
  runtime.feedback = null;
}

function handleMessageTap(clueId) {
  const scenario = currentScenario();
  const message = messageExamples[runtime.messageIndex];
  const step = currentStep();
  if (!scenario || !message || !step || runtime.messageComplete) return;

  runtime.messageAttemptCount += 1;
  recordStepAttempt(state, scenario.id, step.id);
  const expected = new Set(message.clues.map((item) => item.id));
  const selectedNone = clueId === 'none';
  const correctNone = selectedNone && expected.size === 0;
  const correctClue = !selectedNone && expected.has(clueId);

  if (!correctNone && !correctClue) {
    runtime.messageHadWrongSelection = true;
    runtime.feedback = { type: 'incorrect', text: t('messageWrongSelection') };
    persistActiveSession();
    renderScenario();
    return;
  }

  if (correctClue) runtime.messageSelectedClues.add(clueId);
  if (correctNone || [...expected].every((id) => runtime.messageSelectedClues.has(id))) {
    runtime.messageComplete = true;
    runtime.feedback = { type: 'correct', text: message.feedback[currentLanguage()] };
    const independent = !runtime.helpUsedForCurrentStep
      && !runtime.messageHadWrongSelection
      && runtime.messageAttemptCount === Math.max(1, expected.size);
    recordStepSuccess(state, scenario.id, step.id, independent);
    recordMessageExampleComplete(state, scenario.id, message.id, independent);
  }
  persistActiveSession();
  renderScenario();
}

function advanceMessagePractice() {
  if (!runtime.messageComplete) return;
  if (runtime.messageIndex + 1 < messageExamples.length) {
    runtime.messageIndex += 1;
    resetMessageItem();
    persistActiveSession();
    renderScenario();
    return;
  }

  markScenarioComplete(state, runtime.currentScenarioId);
  state.lastScenarioId = null;
  state.activeSession = null;
  saveState(state);
  renderDashboard();
  showCompletion('practice');
  showToast(t('messagePracticeComplete'));
}

function askHint() {
  const step = currentStep();
  if (!step) return;
  recordHelpRequest(state, runtime.currentScenarioId, step.id, 'hint');
  runtime.helpUsedForCurrentStep = true;
  runtime.hintVisible = true;
  runtime.answerVisible = false;
  runtime.feedback = null;
  persistActiveSession();
  renderScenario();
}

function revealAnswer() {
  const step = currentStep();
  if (!step) return;
  recordHelpRequest(state, runtime.currentScenarioId, step.id, 'answer');
  runtime.helpUsedForCurrentStep = true;
  runtime.answerVisible = true;
  runtime.hintVisible = true;
  runtime.feedback = null;
  persistActiveSession();
  renderScenario();
}

function requestStuckHelp() {
  const step = currentStep();
  if (!step) return;
  recordHelpRequest(state, runtime.currentScenarioId, step.id, 'stuck');
  runtime.helpUsedForCurrentStep = true;
  runtime.answerVisible = true;
  runtime.hintVisible = true;
  runtime.feedback = null;
  persistActiveSession();
  renderScenario();
}

function renderDictionary() {
  [dictionaryList, document.getElementById('home-dictionary-list')].forEach((list) => {
    if (!list) return;
    list.innerHTML = '';
    Object.keys(dictionaryEntries).forEach((term) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'dictionary-term';
      button.textContent = term;
      button.addEventListener('click', () => openDictionary(term));
      list.appendChild(button);
    });
  });
}

function openDictionary(term) {
  const entry = dictionaryEntries[term];
  if (!entry) return;
  dictTitle.textContent = term;
  dictTitle.dir = 'ltr';
  dictBody.textContent = entry[currentLanguage()];
  dictBody.dir = currentLanguage() === 'ur' ? 'rtl' : 'ltr';
  dictSheet.classList.remove('hidden');
}

function closeDictionary() {
  dictSheet.classList.add('hidden');
}

function renderScenario() {
  const scenario = currentScenario();
  const step = currentStep();
  if (!scenario || !step) {
    showDashboard();
    return;
  }

  showScenario();
  const heading = runtime.mode === 'messages'
    ? t('messagePracticeTitle')
    : runtime.mode === 'teachback'
      ? `${scenario.title[currentLanguage()]} — ${t('teachBackTitle')}`
      : scenario.title[currentLanguage()];
  scenarioHeader.innerHTML = `${scenario.icon} <span>${heading}</span>`;

  const helperText = getStepHelperText(step);
  helperCopy.textContent = helperText;
  if (runtime.mode === 'messages') {
    renderMessagePractice(scenario, helperText);
    renderDictionary();
    return;
  }

  const shuffledOptions = runtime.shuffledOptionsByStep[step.id] || step.options;
  const optionsHtml = shuffledOptions.map((option) => {
    return `
      <button type="button" class="choice-btn" data-choice="${option.id}">
        ${currentLanguage() === 'ur' ? option.labelUr : option.labelEn}
      </button>
    `;
  }).join('');

  const progressText = t('stepProgress', {
    current: runtime.currentStepIndex + 1,
    total: activeSteps().length
  });
  let feedbackText = '';
  if (runtime.feedback?.type === 'incorrect') {
    const correctOption = step.options.find((option) => option.id === step.correctAction);
    const explanation = currentLanguage() === 'ur' ? step.incorrectFeedbackUr : step.incorrectFeedbackEn;
    const correctLabel = currentLanguage() === 'ur' ? correctOption.labelUr : correctOption.labelEn;
    feedbackText = `${explanation} ${t('correctAnswer')} ${correctLabel}`;
  }

  practiceStage.innerHTML = `
    <div class="device-shell">
      <div class="simulator-app">
        <div class="simulator-banner">
          <strong>${scenario.title[currentLanguage()]}</strong>
          <small>${progressText}</small>
        </div>
        <div class="screen-block">
          <div class="screen-alert">${step.title[currentLanguage()]}</div>
          <p class="screen-question">${currentLanguage() === 'ur' ? step.promptUr : step.promptEn}</p>
          <div class="choice-grid">${optionsHtml}</div>
          <div id="answer-feedback" class="answer-feedback ${runtime.feedback ? `is-${runtime.feedback.type}` : 'is-empty'}" role="status" aria-live="polite">
          </div>
        </div>
      </div>
    </div>
  `;

  practiceStage.querySelector('#answer-feedback').textContent = feedbackText;
  practiceStage.querySelectorAll('[data-choice]').forEach((button) => {
    button.addEventListener('click', () => handleChoice(button.dataset.choice));
  });

  document.getElementById('ask-hint').textContent = t('hintBtn');
  document.getElementById('reveal-answer').textContent = t('answerBtn');
  document.getElementById('stuck-btn').textContent = t('stuckBtn');

  renderDictionary();
}

function renderMessagePractice(scenario, helperText) {
  const message = messageExamples[runtime.messageIndex];
  const selected = runtime.messageSelectedClues;
  const parts = message.segments.map((part) => {
    const text = part.text[currentLanguage()];
    const isSelected = part.clue && selected.has(part.clue);
    const ariaLabel = t('messagePartAria', { text });
    const disabled = runtime.messageComplete || Boolean(isSelected) ? 'disabled' : '';
    return `<button type="button" class="sms-fragment ${isSelected ? 'is-selected' : ''}" data-clue="${part.clue || 'ordinary'}" aria-label="${ariaLabel}" aria-pressed="${Boolean(isSelected)}" ${disabled}>${text}</button>`;
  }).join(' ');
  const progressText = t('messageProgress', {
    current: runtime.messageIndex + 1,
    total: messageExamples.length
  });
  const feedback = runtime.feedback?.text || '';
  const feedbackType = runtime.feedback?.type || 'empty';
  const noWarningSelected = runtime.messageComplete && message.clues.length === 0;

  helperCopy.textContent = helperText || t('messageHint');
  practiceStage.innerHTML = `
    <div class="device-shell">
      <div class="simulator-app">
        <div class="simulator-banner">
          <strong>${t('messageHelpTitle')}</strong>
          <small>${progressText}</small>
        </div>
        <div class="screen-block">
          <p class="screen-question">${t('messagePracticeIntro')}</p>
          <div class="fictional-message" dir="${currentLanguage() === 'ur' ? 'rtl' : 'ltr'}">
            <p class="fictional-sender">${message.sender[currentLanguage()]}</p>
            <div class="fictional-message-body">${parts}</div>
          </div>
          <p class="message-instruction">${t('messageInstruction')}</p>
          <button type="button" class="btn btn-ghost no-warning ${noWarningSelected ? 'is-selected' : ''}" data-message-none aria-pressed="${noWarningSelected}" ${runtime.messageComplete ? 'disabled' : ''}>${t('noClearWarning')}</button>
          <div class="answer-feedback ${runtime.feedback ? `is-${feedbackType}` : 'is-empty'}" role="status" aria-live="polite">${feedback}</div>
          <button type="button" class="btn btn-primary message-next ${runtime.messageComplete ? '' : 'hidden'}" data-message-next>${t('messageNext')}</button>
        </div>
      </div>
    </div>
  `;
  practiceStage.querySelectorAll('[data-clue]').forEach((button) => {
    button.addEventListener('click', () => handleMessageTap(button.dataset.clue));
  });
  practiceStage.querySelector('[data-message-none]').addEventListener('click', () => handleMessageTap('none'));
  practiceStage.querySelector('[data-message-next]').addEventListener('click', advanceMessagePractice);
}

function handleShareProgress() {
  const summary = buildSummary(state);
  document.getElementById('share-preview').value = t('progressShareMessage', {
    scenarios: summary.completedScenarios,
    steps: summary.independentSteps
  });
  consentModal.classList.remove('hidden');
}

function confirmShare() {
  const message = document.getElementById('share-preview').value.trim();
  if (!message) return;
  const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
  consentModal.classList.add('hidden');
}

async function copyShareSummary() {
  const preview = document.getElementById('share-preview');
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(preview.value);
    } else {
      preview.focus();
      preview.select();
      if (!document.execCommand('copy')) throw new Error('Clipboard copy was declined.');
    }
    showToast(t('summaryCopied'));
  } catch (error) {
    console.warn('Progress summary could not be copied.', error);
    showToast(t('copyFailed'));
  }
}

function returnHome() {
  runtime.currentScenarioId = null;
  runtime.currentStepIndex = 0;
  runtime.mode = 'idle';
  runtime.answerVisible = false;
  runtime.hintVisible = false;
  runtime.helpUsedForCurrentStep = false;
  runtime.answerAttemptCount = 0;
  runtime.feedback = null;
  runtime.shuffledOptionsByStep = {};
  showDashboard();
  renderDashboard();
}

function attachInitialEvents() {
  document.querySelectorAll('[data-lang]').forEach((button) => {
    button.addEventListener('click', () => setLanguage(button.dataset.lang));
  });

  document.getElementById('start-random').addEventListener('click', () => {
    const firstScenario = scenarioCatalog[0];
    startScenario(firstScenario.id);
  });
  document.getElementById('continue-practice').addEventListener('click', resumePractice);

  document.getElementById('share-progress').addEventListener('click', handleShareProgress);
  document.getElementById('completion-share').addEventListener('click', handleShareProgress);
  document.getElementById('confirm-share').addEventListener('click', confirmShare);
  document.getElementById('copy-share').addEventListener('click', copyShareSummary);
  document.getElementById('cancel-share').addEventListener('click', () => consentModal.classList.add('hidden'));
  document.getElementById('back-home').addEventListener('click', returnHome);
  document.getElementById('completion-home').addEventListener('click', returnHome);
  document.getElementById('start-teach-back').addEventListener('click', () => startTeachBack());
  document.getElementById('repeat-teach-back').addEventListener('click', () => startTeachBack());
  document.getElementById('repeat-practice').addEventListener('click', () => {
    if (runtime.currentScenarioId) startScenario(runtime.currentScenarioId);
  });
  document.getElementById('ask-hint').addEventListener('click', askHint);
  document.getElementById('reveal-answer').addEventListener('click', revealAnswer);
  document.getElementById('stuck-btn').addEventListener('click', requestStuckHelp);
  document.getElementById('close-dictionary').addEventListener('click', closeDictionary);
  document.getElementById('speak-dictionary').addEventListener('click', async () => {
    const text = dictBody.textContent || '';
    const language = currentLanguage() === 'ur' ? 'ur' : 'en';
    const played = await speech.speak(text, language);
    if (played === false && language === currentLanguage()) {
      showToast(t(language === 'ur' ? 'speechUnavailable' : 'speechFailed'));
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeDictionary();
      consentModal.classList.add('hidden');
    }
  });
}

attachInitialEvents();
renderDashboard();
setLanguage(state.language);
