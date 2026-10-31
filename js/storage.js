const STORAGE_PREFIX = 'ek-link-ek-kaam';

export function getGuideProgressKey(guideId) {
  return `${STORAGE_PREFIX}.guide-progress.${guideId}`;
}

export function getGuideProgress(guideId) {
  const serialized = localStorage.getItem(getGuideProgressKey(guideId));
  if (!serialized) return {};
  try {
    const progress = JSON.parse(serialized);
    return progress && typeof progress === 'object' && !Array.isArray(progress) ? progress : {};
  } catch (error) {
    console.warn(`Could not read learning progress for guide "${guideId}".`, error);
    return {};
  }
}

export function saveGuideProgress(guideId, progress) {
  localStorage.setItem(getGuideProgressKey(guideId), JSON.stringify(progress));
}

export function getStepProgress(guideId, stepId) {
  const progress = getGuideProgress(guideId);
  const step = progress[stepId];
  const level = Number(step?.level);
  return {
    level: Number.isInteger(level) && level >= 1 && level <= 3 ? level : 3,
    helpRequested: Boolean(step?.helpRequested)
  };
}

export function updateStepProgress(guideId, stepId, patch) {
  const progress = getGuideProgress(guideId);
  const existing = getStepProgress(guideId, stepId);
  const level = Number(patch.level ?? existing.level);
  if (!Number.isInteger(level) || level < 1 || level > 3) {
    throw new Error('Assistance level must be between 1 and 3.');
  }
  progress[stepId] = {
    ...existing,
    ...patch,
    level
  };
  saveGuideProgress(guideId, progress);
  return progress[stepId];
}

export function getStepLevel(guideId, stepId) {
  return getStepProgress(guideId, stepId).level;
}

export function setStepLevel(guideId, stepId, level) {
  return updateStepProgress(guideId, stepId, { level });
}

export function resetGuideProgress(guideId) {
  localStorage.removeItem(getGuideProgressKey(guideId));
}
