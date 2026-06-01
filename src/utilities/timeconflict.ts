const days = ["M", "Tu", "W", "Th", "F"];

const toMinutes = (time: string) => {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
};

const parseMeets = (meets: string) => {
  if (!meets) return null;
  const [dayPart, timePart] = meets.split(" ");
  const meetDays = days.filter(d => dayPart.includes(d));
  const [start, end] = timePart.split("-").map(toMinutes);
  return { days: meetDays, start, end };
};

type Course = { term: string; meets: string };

export const hasConflict = (a: Course, b: Course) => {
  if (a.term !== b.term) return false;
  const ma = parseMeets(a.meets);
  const mb = parseMeets(b.meets);
  if (!ma || !mb) return false;
  const sameDay = ma.days.some(d => mb.days.includes(d));
  const overlap = ma.start < mb.end && mb.start < ma.end;
  return sameDay && overlap;
};