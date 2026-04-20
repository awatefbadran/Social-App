export function getCurrentTime(isoDate) {
  const now = new Date();
  const past = new Date(isoDate);
  const diff = now - past; 

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return `${seconds} s`;
  if (minutes < 60) return `${minutes} m`;
  if (hours < 24) return `${hours} h`;
  return `${days} d`;
}


export function getAvatar(photo) {
    if (!photo || String(photo).includes("undefined")) {
        return null;
    }
    return photo;
}