export const STORAGE_KEY = 'ammi-practice-phone:v1';

export function getDefaultState() {
  return {
    language: 'ur',
    lastScenarioId: null,
    activeSession: null,
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
      lastScenarioId: typeof parsed.lastScenarioId === 'string' ? parsed.lastScenarioId : null,
      activeSession: parsed.activeSession && typeof parsed.activeSession === 'object'
        ? parsed.activeSession
        : null,
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
      steps: {},
      teachBackCompleted: false,
      teachBackAttempts: 0,
      messagePractice: {
        completedIds: [],
        independentIds: []
      }
    };
  }
  const scenario = state.scenarios[scenarioId];
  scenario.steps ||= {};
  scenario.teachBackCompleted = Boolean(scenario.teachBackCompleted);
  scenario.teachBackAttempts = Number(scenario.teachBackAttempts || 0);
  scenario.messagePractice ||= { completedIds: [], independentIds: [] };
  scenario.messagePractice.completedIds ||= [];
  scenario.messagePractice.independentIds ||= [];
  return scenario;
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
      independentSuccessCount: 0,
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

export function recordStepAttempt(state, scenarioId, stepId) {
  const step = getStepState(state, scenarioId, stepId);
  step.attempts += 1;
  return step;
}

export function recordStepSuccess(state, scenarioId, stepId, independent = false) {
  const step = getStepState(state, scenarioId, stepId);
  step.successCount += 1;
  step.completed = true;
  step.lastOutcome = 'success';
  if (independent) {
    step.independentSuccessCount = (step.independentSuccessCount || 0) + 1;
    step.helpLevel = Math.max(1, step.helpLevel - 1);
  }
  return step;
}

export function recordHelpRequest(state, scenarioId, stepId, type) {
  const step = getStepState(state, scenarioId, stepId);
  step.helpRequests += 1;
  step.lastOutcome = type;
  step.helpLevel = 3;
  return step;
}

export function markScenarioComplete(state, scenarioId) {
  const scenario = ensureScenarioState(state, scenarioId);
  scenario.completed = true;
  return scenario;
}

export function recordTeachBackAttempt(state, scenarioId) {
  const scenario = ensureScenarioState(state, scenarioId);
  scenario.teachBackAttempts += 1;
  return scenario;
}

export function markTeachBackComplete(state, scenarioId) {
  const scenario = ensureScenarioState(state, scenarioId);
  scenario.teachBackCompleted = true;
  return scenario;
}

export function recordMessageExampleComplete(state, scenarioId, messageId, independent) {
  const scenario = ensureScenarioState(state, scenarioId);
  const progress = scenario.messagePractice;
  if (!progress.completedIds.includes(messageId)) {
    progress.completedIds.push(messageId);
  }
  if (independent && !progress.independentIds.includes(messageId)) {
    progress.independentIds.push(messageId);
  }
  return progress;
}

export function buildSummary(state) {
  const scenarios = Object.values(state.scenarios || {});
  let completedScenarios = 0;
  let completedTeachBacks = 0;
  let totalAttempts = 0;
  let independentSteps = 0;
  let scenariosNeedPractice = 0;

  scenarios.forEach((scenario) => {
    totalAttempts += Number(scenario.attempts || 0);
    if (scenario.completed) completedScenarios += 1;
    if (scenario.teachBackCompleted) completedTeachBacks += 1;
    if (!scenario.completed) scenariosNeedPractice += 1;

    Object.values(scenario.steps || {}).forEach((step) => {
      if ((step.independentSuccessCount || 0) > 0) {
        independentSteps += 1;
      }
    });
  });

  return {
    completedScenarios,
    completedTeachBacks,
    attempts: totalAttempts,
    independentSteps,
    needPractice: scenariosNeedPractice
  };
}
