const VOICE_LOAD_TIMEOUT_MS = 2000;
const SPEECH_START_TIMEOUT_MS = 4000;
const URDU_TEXT_PATTERN = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/;

export class SpeechController {
  constructor() {
    const synthesis = typeof window !== 'undefined'
      && 'speechSynthesis' in window
      && 'SpeechSynthesisUtterance' in window
      ? window.speechSynthesis
      : null;
    this.synthesis = synthesis
      && typeof synthesis.getVoices === 'function'
      && typeof synthesis.speak === 'function'
      && typeof synthesis.cancel === 'function'
      ? synthesis
      : null;
    this.requestId = 0;
  }

  async speak(text, language = 'ur') {
    if (!this.synthesis || !text) return false;
    if (language === 'ur' && !URDU_TEXT_PATTERN.test(text)) return false;

    const requestId = ++this.requestId;
    try {
      this.synthesis.cancel();
    } catch (error) {
      console.warn('Speech could not be stopped on this device.', error);
      return false;
    }

    const voices = await this.getVoices();
    if (requestId !== this.requestId) return null;

    const voice = language === 'ur'
      ? voices.find((candidate) => /^ur-pk$/i.test(candidate.lang))
        || voices.find((candidate) => /^ur(?:-|$)/i.test(candidate.lang))
      : voices.find((candidate) => /^en(?:-|$)/i.test(candidate.lang));
    if (!voice) return false;

    try {
      const utterance = new window.SpeechSynthesisUtterance(text);
      utterance.voice = voice;
      utterance.lang = language === 'ur' ? 'ur-PK' : voice.lang;
      utterance.rate = 0.9;

      return await new Promise((resolve) => {
        let settled = false;
        const finish = (result) => {
          if (settled) return;
          settled = true;
          clearTimeout(timeout);
          resolve(result);
        };
        const timeout = setTimeout(() => {
          if (requestId === this.requestId) {
            this.synthesis.cancel();
          }
          finish(false);
        }, SPEECH_START_TIMEOUT_MS);

        utterance.onstart = () => finish(requestId === this.requestId ? true : null);
        utterance.onerror = (event) => {
          if (requestId === this.requestId) {
            console.warn('Speech playback failed.', event.error || event);
            finish(false);
          } else {
            finish(null);
          }
        };

        try {
          this.synthesis.speak(utterance);
        } catch (error) {
          console.warn('Speech could not be started on this device.', error);
          finish(false);
        }
      });
    } catch (error) {
      console.warn('Speech could not be prepared on this device.', error);
      return requestId === this.requestId ? false : null;
    }
  }

  async getVoices() {
    const availableVoices = this.readVoices();
    if (availableVoices.length) return availableVoices;

    return new Promise((resolve) => {
      let settled = false;
      const finish = (voices) => {
        if (settled) return;
        settled = true;
        clearTimeout(timeout);
        try {
          this.synthesis.removeEventListener?.('voiceschanged', onVoicesChanged);
        } catch (error) {
          console.warn('Speech voice updates could not be stopped.', error);
        }
        resolve(voices);
      };
      const onVoicesChanged = () => {
        const voices = this.readVoices();
        if (voices.length) finish(voices);
      };
      const timeout = setTimeout(() => finish(this.readVoices()), VOICE_LOAD_TIMEOUT_MS);

      try {
        this.synthesis.addEventListener?.('voiceschanged', onVoicesChanged);
      } catch (error) {
        console.warn('Speech voice updates are unavailable.', error);
      }
    });
  }

  readVoices() {
    try {
      return this.synthesis.getVoices();
    } catch (error) {
      console.warn('Speech voices could not be loaded.', error);
      return [];
    }
  }

  stop() {
    this.requestId += 1;
    try {
      this.synthesis?.cancel();
    } catch (error) {
      console.warn('Speech could not be stopped on this device.', error);
    }
  }
}
