export const GUIDE_VERSION = 2;
const MAX_COMPRESSED_LENGTH = 16000;
const MAX_GUIDE_JSON_LENGTH = 24000;

function localizedField(value) {
  if (typeof value === 'string') return { en: value, ur: value };
  if (!value || typeof value !== 'object') return { en: '', ur: '' };
  return {
    en: String(value.en || ''),
    ur: String(value.ur || '')
  };
}

function normalizeGuide(guide) {
  if (!guide || typeof guide !== 'object' || !Array.isArray(guide.steps)) {
    throw new Error('Guide data is incomplete.');
  }
  return {
    version: GUIDE_VERSION,
    id: String(guide.id || `guide-${Date.now()}`),
    title: localizedField(guide.title),
    description: localizedField(guide.description),
    steps: guide.steps.map((step, index) => ({
      id: String(step.id || `step-${index + 1}`),
      title: localizedField(step.title),
      instruction: localizedField(step.instruction),
      hint: localizedField(step.hint),
      image: String(step.image || '📌')
    })),
    createdAt: String(guide.createdAt || new Date().toISOString())
  };
}

export function encodeGuideForUrl(guide) {
  if (!window.LZString?.compressToEncodedURIComponent) {
    throw new Error('The link-compression library did not load. Reload and try again.');
  }
  const normalized = normalizeGuide(guide);
  validateGuideData(normalized);
  const encoded = window.LZString.compressToEncodedURIComponent(JSON.stringify(normalized));
  if (!encoded || encoded.length > MAX_COMPRESSED_LENGTH) {
    throw new Error('This guide is too large to share in a link.');
  }
  return encoded;
}

export function decodeGuideFromUrl(encoded) {
  if (!encoded || typeof encoded !== 'string') {
    throw new Error('Missing guide data.');
  }
  if (encoded.length > MAX_COMPRESSED_LENGTH) {
    throw new Error('This guide link is too large.');
  }
  if (!window.LZString?.decompressFromEncodedURIComponent) {
    throw new Error('The link-compression library did not load. Reload and try again.');
  }

  const decompressed = window.LZString.decompressFromEncodedURIComponent(encoded);
  if (!decompressed || decompressed.length > MAX_GUIDE_JSON_LENGTH) {
    throw new Error('Guide data is empty or too large.');
  }

  let parsed;
  try {
    parsed = JSON.parse(decompressed);
  } catch {
    throw new Error('Guide data is invalid or corrupted.');
  }
  return validateGuideData(parsed);
}

export function parseGuideFromHash() {
  const hash = window.location.hash.replace(/^#/, '');
  if (!hash) return null;

  const match = hash.match(/(?:^|&)guide=([^&]*)/);
  if (!match) return { error: 'Guide data was not found in this link.' };

  try {
    return decodeGuideFromUrl(decodeURIComponent(match[1]));
  } catch (error) {
    return { error: error.message || 'Guide data is invalid or corrupted.' };
  }
}

export function buildGuideShareUrl(guide) {
  const currentUrl = new URL(window.location.href);
  currentUrl.pathname = currentUrl.pathname.replace(/\/(?:index|create)\.html$/i, '/play.html');
  currentUrl.hash = `guide=${encodeGuideForUrl(guide)}`;
  return currentUrl.toString();
}

export function validateGuideData(data) {
  if (!data || typeof data !== 'object') {
    throw new Error('Guide data not found.');
  }
  if (Number(data.version) !== 1 && Number(data.version) !== GUIDE_VERSION) {
    throw new Error('Unsupported guide version.');
  }
  if (!data.id || !data.title || !Array.isArray(data.steps)) {
    throw new Error('Guide is incomplete.');
  }
  if (data.steps.length < 2 || data.steps.length > 15) {
    throw new Error('Guide must contain between 2 and 15 steps.');
  }

  const normalized = normalizeGuide(data);
  if (!normalized.title.en.trim() && !normalized.title.ur.trim()) {
    throw new Error('Guide title is required.');
  }
  const invalidStep = normalized.steps.some((step) =>
    (!step.title.en.trim() && !step.title.ur.trim()) ||
    (!step.instruction.en.trim() && !step.instruction.ur.trim())
  );
  if (invalidStep) {
    throw new Error('Every step needs a title and instruction in at least one language.');
  }
  if (JSON.stringify(normalized).length > MAX_GUIDE_JSON_LENGTH) {
    throw new Error('Guide is too large to share safely.');
  }
  return normalized;
}
