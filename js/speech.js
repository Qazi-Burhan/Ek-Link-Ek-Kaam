import { getLanguage } from './i18n.js';

export class SpeechController {
  constructor() {
    this.speech = 'speechSynthesis' in window ? window.speechSynthesis : null;
    this.voice = null;
    this.isSpeaking = false;
    this.stateListener = null;
  }

  getPreferredVoice(language = getLanguage()) {
    if (!this.speech || !('SpeechSynthesisUtterance' in window)) return null;
    const voices = this.speech.getVoices();
    const preferred = language === 'ur'
      ? voices.find((voice) => /^ur(?:-|$)/i.test(voice.lang)) ||
        voices.find((voice) => /^hi(?:-|$)/i.test(voice.lang))
      : voices.find((voice) => /^en(?:-|$)/i.test(voice.lang));
    this.voice = preferred || null;
    return this.voice;
  }

  stop() {
    this.speech?.cancel();
    this.setSpeaking(false);
  }

  speak(text, language = getLanguage()) {
    const voice = this.getPreferredVoice(language);
    if (!voice || !this.speech || !text) return false;

    this.stop();
    try {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = voice;
      utterance.lang = voice.lang;
      utterance.rate = 0.9;
      utterance.onstart = () => this.setSpeaking(true);
      utterance.onend = () => this.setSpeaking(false);
      utterance.onerror = () => this.setSpeaking(false);
      this.speech.speak(utterance);
      return true;
    } catch (error) {
      console.warn('Speech could not be started on this device.', error);
      this.setSpeaking(false);
      return false;
    }
  }

  setSpeaking(isSpeaking) {
    this.isSpeaking = isSpeaking;
    this.stateListener?.(isSpeaking);
  }

  onSpeakingChange(callback) {
    this.stateListener = callback;
  }

  onVoicesChanged(callback) {
    if (this.speech) {
      this.speech.addEventListener('voiceschanged', callback);
    }
  }
}
