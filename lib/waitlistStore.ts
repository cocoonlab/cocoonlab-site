export type WaitlistEntry = {
  id: string;
  createdAt: string;
  email: string;
  firmName: string;
  location: string;
  teamSize: string;
  useCase: string;
};

const entries: WaitlistEntry[] = [];

export function addWaitlistEntry(
  data: Omit<WaitlistEntry, "id" | "createdAt">
): WaitlistEntry {
  const entry: WaitlistEntry = {
    id: Math.random().toString(36).slice(2),
    createdAt: new Date().toISOString(),
    ...data
  };
  entries.push(entry);
  return entry;
}

export function getWaitlistEntries() {
  return entries;
}
