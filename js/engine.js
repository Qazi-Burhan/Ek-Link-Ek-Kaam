import { parseGuideFromHash } from './encode.js';
import { getStepProgress, resetGuideProgress, updateStepProgress } from './storage.js';
import { SpeechController } from './speech.js';
import { getLanguage, initI18n, localized, localizedLanguage, t } from './i18n.js';
import { openWhatsAppMessage } from './whatsapp.js';

const player = document.getElementById('player-view');
const titleNode = document.getElementById('guide-title');
const helpModal = document.getElementById('help-modal');
const helpMessage = document.getElementById('help-message');
const statusNode = document.getElementById('player-status');
const speech = new SpeechController();

let guide = null;
let currentIndex = 0;
let independentCount = 0;
let reveal = null;
let pendingHelp = null;
let completedInRun = new Set();
let helpTrigger = null;
let playerErrorKey = null;

const node = (tag, className, text) => {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
};

function sessionKey() {
  return `ek-link-ek-kaam.run.${guide.id}`;
}

function saveRun() {
  try {
    sessionStorage.setItem(sessionKey(), JSON.stringify({
      index: currentIndex,
      independentCount,
      completedStepIds: [...completedInRun]
    }));
  } catch (error) {
    console.warn('Could not save this guide session.', error);
    showStatus(t('error'));
  }
}

function loadRun() {
  const saved = sessionStorage.getItem(sessionKey());
  if (!saved) return;
  try {
    const state = JSON.parse(saved);
    currentIndex = Number.isInteger(state.index) && state.index >= 0 && state.index <= guide.steps.length
      ? state.index
      : 0;
    independentCount = Number.isInteger(state.independentCount) && state.independentCount >= 0
      ? Math.min(state.independentCount, guide.steps.length)
      : 0;
    completedInRun = new Set(Array.isArray(state.completedStepIds) ? state.completedStepIds : []);
  } catch (error) {
    console.warn('Could not restore this guide session.', error);
    currentIndex = 0;
    independentCount = 0;
    completedInRun = new Set();
  }
}

function showStatus(message) {
  if (statusNode) statusNode.textContent = message;
}

function clearStatus() {
  showStatus('');
}

function currentStep() {
  return guide?.steps[currentIndex] || null;
}

function setStepState(stepId, level, helpRequested) {
  updateStepProgress(guide.id, stepId, { level, helpRequested });
}

function button(key, className, action) {
  const element = node('button', `action-btn ${className}`, t(key));
  element.type = 'button';
  element.dataset.action = action;
  return element;
}

function helpLevelLabel(level) {
  if (level === 3) return t('fullHelp');
  if (level === 2) return t('hintMode');
  return t('recallMode');
}

function showError(messageKey) {
  playerErrorKey = messageKey;
  document.title = `Ek Link, Ek Kaam — ${t('playGuide')}`;
  player.replaceChildren();
  const error = node('div', 'empty-state', t(messageKey));
  error.setAttribute('role', 'alert');
  const home = node('a', 'btn btn-primary', t('backHome'));
  home.href = './index.html';
  error.append(document.createElement('br'), home);
  player.appendChild(error);
  document.getElementById('reset-progress').classList.add('hidden');
}

function makeProgressBar(percent) {
  const bar = node('div', 'progress-bar');
  bar.setAttribute('role', 'progressbar');
  bar.setAttribute('aria-label', t('guideProgress'));
  bar.setAttribute('aria-valuemin', '0');
  bar.setAttribute('aria-valuemax', '100');
  bar.setAttribute('aria-valuenow', String(Math.round(percent)));
  const fill = node('div', 'progress-bar-fill');
  fill.style.width = `${percent}%`;
  bar.appendChild(fill);
  return bar;
}

function showHelpConsent(step, trigger) {
  pendingHelp = step;
  helpTrigger = trigger;
  helpMessage.textContent = t('helpMessage', {
    guide: localized(guide.title),
    step: localized(step.title)
  });
  helpMessage.dir = 'auto';
  helpModal.classList.remove('hidden');
  helpModal.setAttribute('aria-hidden', 'false');
  document.getElementById('send-help').focus();
}

function hideHelpConsent() {
  helpModal.classList.add('hidden');
  helpModal.setAttribute('aria-hidden', 'true');
  pendingHelp = null;
  if (helpTrigger?.isConnected) helpTrigger.focus();
  helpTrigger = null;
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

function renderCompletion() {
  speech.stop();
  saveRun();
  player.replaceChildren();

  const wrapper = node('section', 'completion-card');
  wrapper.setAttribute('aria-labelledby', 'completion-title');
  wrapper.appendChild(node('div', 'completion-emoji', '🎉'));
  const heading = node('h2', '', t('completionTitle'));
  heading.id = 'completion-title';
  wrapper.append(
    heading,
    node('p', 'muted', t('completionMessage'))
  );

  const summary = node('ul', 'summary-list');
  summary.append(
    node('li', '', t('completedSteps', { count: guide.steps.length, total: guide.steps.length })),
    node('li', '', t('independentSteps', { count: independentCount })),
    node('li', '', t('learningSummary'))
  );
  wrapper.appendChild(summary);

  const actions = node('div', 'completion-actions');
  const restart = node('button', 'btn btn-primary', t('restartGuide'));
  restart.type = 'button';
  restart.addEventListener('click', restartAttempt);
  const progressShare = node('button', 'btn btn-secondary', t('shareProgress'));
  progressShare.type = 'button';
  progressShare.addEventListener('click', () => {
    const message = t('completedSteps', {
      count: guide.steps.length,
      total: guide.steps.length
    }) + `\n${t('independentSteps', { count: independentCount })}`;
    openWhatsAppMessage(message);
  });
  const home = node('a', 'btn btn-ghost', t('home'));
  home.href = './index.html';
  actions.append(restart, progressShare, home);
  wrapper.appendChild(actions);
  player.appendChild(wrapper);
}

function restartAttempt() {
  try {
    sessionStorage.removeItem(sessionKey());
    currentIndex = 0;
    independentCount = 0;
    completedInRun = new Set();
    reveal = null;
    clearStatus();
    renderPlayback();
  } catch (error) {
    console.error('Could not reset learning progress.', error);
    showStatus(t('error'));
  }
}

function resetLearningProgress() {
  try {
    resetGuideProgress(guide.id);
    restartAttempt();
    showStatus(t('resetDone'));
  } catch (error) {
    console.error('Could not reset learning progress.', error);
    showStatus(t('error'));
  }
}

function showHintOrAnswer(step, level) {
  try {
    setStepState(step.id, 3, true);
    reveal = {
      type: level === 1 ? 'answer' : 'hint',
      text: level === 1
        ? localized(step.instruction)
        : localized(step.hint, localized(step.instruction)),
      language: level === 1
        ? localizedLanguage(step.instruction)
        : step.hint.en || step.hint.ur
          ? localizedLanguage(step.hint)
          : localizedLanguage(step.instruction)
    };
    speech.stop();
    renderPlayback();
    showStatus(t(level === 1 ? 'answerOpened' : 'hintOpened'));
  } catch (error) {
    console.error('Could not open step assistance.', error);
    showStatus(t('error'));
  }
}

function renderPlayback() {
  if (!guide) return;
  playerErrorKey = null;
  document.getElementById('reset-progress').classList.remove('hidden');
  if (currentIndex >= guide.steps.length) {
    renderCompletion();
    return;
  }
  speech.stop();
  clearStatus();
  const step = currentStep();
  let state;
  try {
    state = getStepProgress(guide.id, step.id);
  } catch (error) {
    console.error('Could not read local learning progress.', error);
    showError('error');
    return;
  }
  const level = state.level;
  const localizedTitle = localized(guide.title);
  titleNode.textContent = localizedTitle;
  titleNode.dir = 'auto';
  player.replaceChildren();

  const top = node('div', 'player-header');
  top.append(
    node('span', 'player-badge', t('stepOf', { current: currentIndex + 1, total: guide.steps.length })),
    node('span', 'player-badge', t('level', { level }))
  );
  const progress = makeProgressBar(((currentIndex + 1) / guide.steps.length) * 100);
  const area = node('section', 'player-step');
  area.setAttribute('aria-labelledby', 'current-instruction');

  const emoji = node('div', 'step-emoji', reveal ? step.image || '📌' : (level === 3 ? step.image || '📌' : level === 2 ? '💡' : '❓'));
  emoji.setAttribute('aria-hidden', 'true');
  const instruction = node('p', 'step-instruction',
    reveal || level === 3
      ? localized(step.instruction)
      : level === 2
        ? localized(step.title)
        : t('answerPrompt')
  );
  instruction.id = 'current-instruction';
  instruction.dir = 'auto';
  area.append(emoji, instruction);

  if (reveal) {
    const revealNode = node('div', 'hint-box', reveal.text);
    revealNode.dir = 'auto';
    area.appendChild(revealNode);
  }

  const mode = node('div', 'help-level-row');
  mode.append(node('span', '', '📘'), node('span', '', helpLevelLabel(level)));
  area.appendChild(mode);

  const actions = node('div', 'help-actions');
  const voice = speech.getPreferredVoice();
  if (voice) {
    const speak = button('speak', 'primary', 'speak');
    speak.addEventListener('click', () => {
      const text = reveal?.text || localized(step.instruction);
      const language = reveal?.language || localizedLanguage(step.instruction) || getLanguage();
      if (!speech.speak(text, language)) showStatus(t('voiceUnavailable'));
    });
    speech.onSpeakingChange((speaking) => {
      if (speak.isConnected) speak.textContent = speaking ? t('speaking') : t('speak');
    });
    actions.appendChild(speak);
  } else {
    area.appendChild(node('p', 'voice-note', t('voiceUnavailable')));
  }

  const revealKey = level === 1 ? 'showAnswer' : level === 2 ? 'showHint' : 'showFullHelp';
  const revealButton = button(revealKey, 'soft', 'reveal');
  revealButton.addEventListener('click', () => showHintOrAnswer(step, level));
  const done = button('done', 'primary', 'done');
  done.addEventListener('click', () => {
    try {
      const latest = getStepProgress(guide.id, step.id);
      if (!completedInRun.has(step.id)) {
        const helped = latest.helpRequested;
        const nextLevel = helped ? 3 : Math.max(1, latest.level - 1);
        setStepState(step.id, nextLevel, false);
        completedInRun.add(step.id);
        if (!helped) independentCount += 1;
      }
      currentIndex += 1;
      reveal = null;
      saveRun();
      renderPlayback();
    } catch (error) {
      console.error('Could not save learning progress.', error);
      showStatus(t('error'));
    }
  });
  const stuck = button('stuck', 'warn', 'help');
  stuck.addEventListener('click', () => {
    try {
      setStepState(step.id, 3, true);
      reveal = null;
      showHelpConsent(step, stuck);
    } catch (error) {
      console.error('Could not reset assistance level.', error);
      showStatus(t('error'));
    }
  });
  const back = button('back', 'ghost', 'back');
  back.disabled = currentIndex === 0;
  back.addEventListener('click', () => {
    if (currentIndex === 0) return;
    currentIndex -= 1;
    reveal = null;
    saveRun();
    renderPlayback();
  });
  actions.append(revealButton, done, stuck, back);
  area.appendChild(actions);

  player.append(top, progress, area);
}

function onSendHelp() {
  if (!pendingHelp) return;
  const message = t('helpMessage', {
    guide: localized(guide.title),
    step: localized(pendingHelp.title)
  });
  hideHelpConsent();
  openWhatsAppMessage(message);
  renderPlayback();
  showStatus(t('whatsappHelpReady'));
}

function init() {
  initI18n();
  window.addEventListener('app-language-change', () => {
    speech.stop();
    if (playerErrorKey) {
      showError(playerErrorKey);
      return;
    }
    if (guide) {
      titleNode.textContent = localized(guide.title);
      titleNode.dir = 'auto';
      document.title = `${localized(guide.title)} — Ek Link, Ek Kaam`;
      if (!helpModal.classList.contains('hidden') && pendingHelp) {
        helpMessage.textContent = t('helpMessage', {
          guide: localized(guide.title),
          step: localized(pendingHelp.title)
        });
        helpMessage.dir = 'auto';
      } else {
        renderPlayback();
      }
    }
  });
  const parsed = parseGuideFromHash();
  if (!parsed || parsed.error) {
    showError(parsed?.error === 'Unsupported guide version.' ? 'unsupportedVersion' : 'invalidGuide');
    return;
  }

  guide = parsed;
  document.title = `${localized(guide.title)} — Ek Link, Ek Kaam`;
  document.getElementById('send-help').addEventListener('click', onSendHelp);
  document.getElementById('cancel-help').addEventListener('click', hideHelpConsent);
  document.getElementById('help-modal').addEventListener('click', (event) => {
    if (event.target.id === 'help-modal') hideHelpConsent();
  });
  document.addEventListener('keydown', (event) => trapModalFocus(event, helpModal, hideHelpConsent));
  document.getElementById('reset-progress').addEventListener('click', () => {
    if (!window.confirm(t('resetConfirm'))) return;
    resetLearningProgress();
  });

  try {
    loadRun();
    renderPlayback();
  } catch (error) {
    console.error('Could not start the guide.', error);
    showError('error');
  }

  speech.onVoicesChanged(() => {
    if (currentStep()) renderPlayback();
  });
  window.addEventListener('beforeunload', () => speech.stop());
}

init();
