export class SpeechController {
  constructor() {
    this.enabled = 'speechSynthesis' in window;
  }

  speak(text, lang = 'ur-PK') {
    if (!this.enabled || !text) return false;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;
    const voices = window.speechSynthesis.getVoices();
    const preferred = voices.find((voice) => voice.lang.toLowerCase().startsWith(lang.split('-')[0].toLowerCase())) || voices[0];
    if (preferred) utterance.voice = preferred;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    return true;
  }

  stop() {
    if (this.enabled) {
      window.speechSynthesis.cancel();
    }
  }
}
