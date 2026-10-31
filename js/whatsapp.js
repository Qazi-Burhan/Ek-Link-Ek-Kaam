export function createWhatsAppUrl(message) {
  return `https://wa.me/?text=${encodeURIComponent(message)}`;
}

export function openWhatsAppMessage(message) {
  return window.open(createWhatsAppUrl(message), '_blank', 'noopener,noreferrer');
}
