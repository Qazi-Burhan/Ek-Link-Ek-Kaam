export const STORAGE_KEY = 'ammi-practice-phone:v1';

export function getDefaultState() {
  return {
    language: 'ur',
    scenarios: {}
  };
}

export function loadState() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return getDefaultState();
    const parsed = JSON.parse(stored);
    return {
      language: parsed.language === 'en' ? 'en' : 'ur',
      scenarios: parsed.scenarios || {}
    };
  } catch (error) {
    console.warn('Could not load practice state.', error);
    return getDefaultState();
  }
}

export function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.warn('Could not save practice state.', error);
  }
}

export function ensureScenarioState(state, scenarioId) {
  if (!state.scenarios[scenarioId]) {
    state.scenarios[scenarioId] = {
      attempts: 0,
      completed: false,
      steps: {}
    };
  }
  return state.scenarios[scenarioId];
}

export function getScenarioState(state, scenarioId) {
  return ensureScenarioState(state, scenarioId);
}

export function getStepState(state, scenarioId, stepId) {
  const scenario = ensureScenarioState(state, scenarioId);
  if (!scenario.steps[stepId]) {
    scenario.steps[stepId] = {
      helpLevel: 3,
      attempts: 0,
      helpRequests: 0,
      completed: false,
      successCount: 0,
      lastOutcome: 'pending'
    };
  }
  return scenario.steps[stepId];
}

export function recordScenarioAttempt(state, scenarioId) {
  const scenario = ensureScenarioState(state, scenarioId);
  scenario.attempts += 1;
  return scenario;
}

export function recordStepSuccess(state, scenarioId, stepId) {
  const step = getStepState(state, scenarioId, stepId);
  step.attempts += 1;
  step.successCount += 1;
  step.completed = true;
  step.lastOutcome = 'success';
  step.helpLevel = step.helpLevel === 3 ? 2 : 1;
  return step;
}

export function recordHelpRequest(state, scenarioId, stepId, type) {
  const step = getStepState(state, scenarioId, stepId);
  step.helpRequests += 1;
  step.attempts += 1;
  step.lastOutcome = type;
  step.helpLevel = 3;
  return step;
}

export function markScenarioComplete(state, scenarioId) {
  const scenario = ensureScenarioState(state, scenarioId);
  scenario.completed = true;
  return scenario;
}

export function buildSummary(state) {
  const scenarios = Object.values(state.scenarios || {});
  let completedScenarios = 0;
  let totalAttempts = 0;
  let independentSteps = 0;
  let scenariosNeedPractice = 0;

  scenarios.forEach((scenario) => {
    totalAttempts += Number(scenario.attempts || 0);
    if (scenario.completed) completedScenarios += 1;
    if (!scenario.completed) scenariosNeedPractice += 1;

    Object.values(scenario.steps || {}).forEach((step) => {
      if ((step.successCount || 0) > 0 && (step.helpLevel || 3) === 1) {
        independentSteps += 1;
      }
    });
  });

  return {
    completedScenarios,
    attempts: totalAttempts,
    independentSteps,
    needPractice: scenariosNeedPractice
  };
}
