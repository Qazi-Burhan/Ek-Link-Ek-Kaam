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
  const instruction = lang === 'ur' ? step.instructionUr : step.instructionEn;
  const hint = lang === 'ur' ? step.hintUr : step.hintEn;
  const answer = lang === 'ur' ? step.answerUr : step.answerEn;

  if (level === 3) {
    return answerVisible ? `${instruction} ${answer}` : instruction;
  }

  if (level === 2) {
    return hint || instruction;
  }

  return answerVisible ? `${lang === 'ur' ? 'Ab aap kya karengi?' : 'What will you do next?'} ${answer}` : (lang === 'ur' ? 'Ab aap kya karengi?' : 'What will you do next?');
}

export function getTargetActionLabel(step, lang) {
  const target = step.options.find((option) => option.id === step.correctAction);
  if (!target) return '';
  return lang === 'ur' ? target.labelUr : target.labelEn;
}
