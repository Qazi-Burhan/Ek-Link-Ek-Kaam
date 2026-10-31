import { scenarioCatalog, dictionaryEntries } from './scenarios.js';
import { buildHelperText, getStepLevel, shuffleOptions } from './engine.js';
import { buildSummary, ensureScenarioState, getScenarioState, getStepState, loadState, recordHelpRequest, recordScenarioAttempt, recordStepAttempt, recordStepSuccess, saveState } from './storage.js';
import { SpeechController } from './speech.js';
import { translate } from './i18n.js';

const state = loadState();
const speech = new SpeechController();

const runtime = {
  currentScenarioId: null,
  currentStepIndex: 0,
  answerVisible: false,
  hintVisible: false,
  helpUsedForCurrentStep: false,
  answerAttemptCount: 0,
  feedback: null,
  shuffledOptionsByStep: {}
};

const dashboardView = document.getElementById('dashboard-view');
const scenarioView = document.getElementById('scenario-view');
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

function t(key) {
  return translate(key, currentLanguage());
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
  state.language = lang;
  saveState(state);
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ur' ? 'rtl' : 'ltr';
  document.querySelectorAll('[data-lang]').forEach((button) => {
    const active = button.dataset.lang === lang;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  syncStaticText();
  renderDashboard();
  if (runtime.currentScenarioId) {
    renderScenario();
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
      <button type="button" class="btn btn-primary scenario-start" data-scenario-id="${scenario.id}">${t('startPractice')}</button>
    `;
    article.querySelector('.scenario-start').addEventListener('click', () => startScenario(scenario.id));
    scenarioGrid.appendChild(article);
  });

  document.getElementById('privacy-toggle').textContent = t('privacy');
  document.getElementById('share-progress').textContent = t('shareToChild');
}

function startScenario(scenarioId) {
  const scenario = getScenarioById(scenarioId);
  if (!scenario) return;
  runtime.currentScenarioId = scenarioId;
  runtime.currentStepIndex = 0;
  runtime.answerVisible = false;
  runtime.hintVisible = false;
  runtime.helpUsedForCurrentStep = false;
  runtime.answerAttemptCount = 0;
  runtime.feedback = null;
  runtime.shuffledOptionsByStep = Object.fromEntries(
    scenario.steps.map((step) => [step.id, shuffleOptions(step.options)])
  );
  recordScenarioAttempt(state, scenarioId);
  saveState(state);
  renderScenario();
}

function finishScenario() {
  const scenario = getScenarioById(runtime.currentScenarioId);
  if (!scenario) return;
  ensureScenarioState(state, scenario.id);
  state.scenarios[scenario.id].completed = true;
  saveState(state);
  renderDashboard();
  runtime.currentScenarioId = null;
  runtime.currentStepIndex = 0;
  runtime.answerVisible = false;
  runtime.hintVisible = false;
  runtime.helpUsedForCurrentStep = false;
  runtime.answerAttemptCount = 0;
  runtime.feedback = null;
  runtime.shuffledOptionsByStep = {};
  showDashboard();
  showToast(currentLanguage() === 'ur' ? 'Shabash! Aap ne is scenario ko complete kar liya.' : 'Well done! You completed this scenario.');
}

function showDashboard() {
  dashboardView.classList.remove('hidden');
  scenarioView.classList.add('hidden');
}

function showScenario() {
  dashboardView.classList.add('hidden');
  scenarioView.classList.remove('hidden');
}

function currentScenario() {
  return getScenarioById(runtime.currentScenarioId);
}

function currentStep() {
  const scenario = currentScenario();
  if (!scenario) return null;
  return scenario.steps[runtime.currentStepIndex] || null;
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

    if (runtime.currentStepIndex + 1 < scenario.steps.length) {
      runtime.currentStepIndex += 1;
      runtime.answerVisible = false;
      runtime.hintVisible = false;
      runtime.helpUsedForCurrentStep = false;
      runtime.answerAttemptCount = 0;
      runtime.feedback = null;
      renderScenario();
      return;
    }

    state.scenarios[scenario.id].completed = true;
    saveState(state);
    finishScenario();
    return;
  }

  runtime.feedback = { type: 'incorrect' };
  const stepProgress = getStepState(state, scenario.id, step.id);
  stepProgress.lastOutcome = 'retry';
  saveState(state);
  showToast(currentLanguage() === 'ur'
    ? 'Koi baat nahi. Yeh practice hai—araam se dobara koshish karein.'
    : 'No worries. This is practice—take your time and try again.');
  renderScenario();
}

function askHint() {
  const step = currentStep();
  if (!step) return;
  recordHelpRequest(state, runtime.currentScenarioId, step.id, 'hint');
  runtime.helpUsedForCurrentStep = true;
  runtime.hintVisible = true;
  runtime.answerVisible = false;
  runtime.feedback = null;
  saveState(state);
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
  saveState(state);
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
  saveState(state);
  renderScenario();
}

function renderDictionary() {
  dictionaryList.innerHTML = '';
  Object.keys(dictionaryEntries).forEach((term) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'dictionary-term';
    button.textContent = term;
    button.addEventListener('click', () => openDictionary(term));
    dictionaryList.appendChild(button);
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
  scenarioHeader.innerHTML = `${scenario.icon} <span>${scenario.title[currentLanguage()]}</span>`;

  const helperText = getStepHelperText(step);
  helperCopy.textContent = helperText;

  const shuffledOptions = runtime.shuffledOptionsByStep[step.id] || step.options;
  const optionsHtml = shuffledOptions.map((option) => {
    return `
      <button type="button" class="choice-btn" data-choice="${option.id}">
        ${currentLanguage() === 'ur' ? option.labelUr : option.labelEn}
      </button>
    `;
  }).join('');

  const progressText = `Step ${runtime.currentStepIndex + 1} / ${scenario.steps.length}`;
  let feedbackText = '';
  if (runtime.feedback?.type === 'incorrect') {
    const correctOption = step.options.find((option) => option.id === step.correctAction);
    const explanation = currentLanguage() === 'ur' ? step.incorrectFeedbackUr : step.incorrectFeedbackEn;
    const correctLabel = currentLanguage() === 'ur' ? correctOption.labelUr : correctOption.labelEn;
    feedbackText = `${explanation} ${t('correctAnswer')} ${correctLabel}`;
  }

  practiceStage.innerHTML = `
    <div class="device-shell">
      <div class="device-header">
        <span>9:41</span>
        <span>📶</span>
        <span>🔋</span>
      </div>
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

function handleShareProgress() {
  consentModal.classList.remove('hidden');
}

function confirmShare() {
  const summary = buildSummary(state);
  const message = currentLanguage() === 'ur'
    ? `Aaj ${summary.completedScenarios} practice mukammal hui. ${summary.independentSteps} qadam baghair madad ke kiye gaye. Digital hunar seekhne ka safar jari hai!`
    : `${summary.completedScenarios} practice scenarios completed today. ${summary.independentSteps} steps were completed independently. The digital learning journey continues!`;

  const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
  consentModal.classList.add('hidden');
}

function attachInitialEvents() {
  document.querySelectorAll('[data-lang]').forEach((button) => {
    button.addEventListener('click', () => setLanguage(button.dataset.lang));
  });

  document.getElementById('start-random').addEventListener('click', () => {
    const firstScenario = scenarioCatalog[0];
    startScenario(firstScenario.id);
  });

  document.getElementById('share-progress').addEventListener('click', handleShareProgress);
  document.getElementById('confirm-share').addEventListener('click', confirmShare);
  document.getElementById('cancel-share').addEventListener('click', () => consentModal.classList.add('hidden'));
  document.getElementById('back-home').addEventListener('click', () => {
    runtime.currentScenarioId = null;
    runtime.currentStepIndex = 0;
    runtime.answerVisible = false;
    runtime.hintVisible = false;
    runtime.helpUsedForCurrentStep = false;
    runtime.answerAttemptCount = 0;
    runtime.feedback = null;
    runtime.shuffledOptionsByStep = {};
    showDashboard();
  });
  document.getElementById('ask-hint').addEventListener('click', askHint);
  document.getElementById('reveal-answer').addEventListener('click', revealAnswer);
  document.getElementById('stuck-btn').addEventListener('click', requestStuckHelp);
  document.getElementById('close-dictionary').addEventListener('click', closeDictionary);
  document.getElementById('speak-dictionary').addEventListener('click', () => {
    const text = dictBody.textContent || '';
    speech.speak(text, currentLanguage() === 'ur' ? 'ur-PK' : 'en-US');
  });

  document.getElementById('privacy-toggle').addEventListener('click', () => {
    showToast(t('safePractice'));
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
