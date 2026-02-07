
export interface Candidate {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  isTarget: boolean;
  location: string;
  passions: string[];
}

export interface ValuePoint {
  id: string;
  label: string;
  anecdote: string[];
}

export enum AppPhase {
  LANDING = 'landing',
  MATCHING = 'matching',
  GRAZIA_DETAIL = 'detail',
  FINAL = 'final'
}
