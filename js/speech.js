export class SpeechController {
  constructor() {
    this.enabled = 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
  }

  speak(text, language = 'ur') {
    if (!this.enabled || !text) return false;

    const voices = window.speechSynthesis.getVoices();
    const languagePrefix = language === 'ur' ? 'ur' : 'en';
    const voice = voices.find((candidate) =>
      candidate.lang.toLowerCase().startsWith(languagePrefix)
    );
    if (!voice) return false;

    try {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = voice;
      utterance.lang = voice.lang;
      utterance.rate = 0.9;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
      return true;
    } catch (error) {
      console.warn('Speech could not be started on this device.', error);
      return false;
    }
  }

  stop() {
    if (this.enabled) {
      window.speechSynthesis.cancel();
    }
  }
}
