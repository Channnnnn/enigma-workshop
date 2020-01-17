export function formatTimer(milliseconds) {
  const seconds = milliseconds / 1000
  const mm = seconds / 60 | 0
  const ss = seconds - (mm * 60) | 0
  const format = t => t.toString().padStart(2, '0');
  return format(mm) + ':' + format(ss);
}