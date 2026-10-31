import { getStepState, markScenarioComplete, recordHelpRequest, recordScenarioAttempt, recordStepSuccess } from './storage.js';

export function getStepLevel(state, scenarioId, stepId) {
  const step = getStepState(state, scenarioId, stepId);
  return Number(step.helpLevel || 3);
}

export function startScenario(state, scenarioId) {
  recordScenarioAttempt(state, scenarioId);
  return state.scenarios[scenarioId];
}

export function completeCurrentStep(state, scenarioId, stepId) {
  recordStepSuccess(state, scenarioId, stepId);
  return getStepLevel(state, scenarioId, stepId);
}

export function helpRequested(state, scenarioId, stepId, type) {
  recordHelpRequest(state, scenarioId, stepId, type);
  return getStepLevel(state, scenarioId, stepId);
}

export function completeScenario(state, scenarioId) {
  markScenarioComplete(state, scenarioId);
}

export function buildHelperText(step, lang, level, answerVisible) {
  const context = lang === 'ur' ? step.contextUr : step.contextEn;
  const hint = lang === 'ur' ? step.hintUr : step.hintEn;
  const answer = lang === 'ur' ? step.answerUr : step.answerEn;

  if (level === 3) {
    return answerVisible ? answer : context;
  }

  if (level === 2) {
    return answerVisible ? answer : (lang === 'ur'
      ? 'آرام سے جواب دیکھیں۔ ضرورت ہو تو اشارہ لے سکتے ہیں۔'
      : 'Take your time with the options. You can ask for a hint if needed.');
  }

  return answerVisible ? answer : (lang === 'ur' ? 'اب آپ کیا کریں گے؟' : 'What will you do next?');
}

export function shuffleOptions(options, random = Math.random) {
  const shuffled = [...options];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }

  if (shuffled.length > 1 && shuffled.every((option, index) => option.id === options[index].id)) {
    [shuffled[0], shuffled[1]] = [shuffled[1], shuffled[0]];
  }

  return shuffled;
}
