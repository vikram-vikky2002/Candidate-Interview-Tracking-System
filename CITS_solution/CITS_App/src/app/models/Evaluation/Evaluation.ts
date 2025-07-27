// models/evaluation.model.ts
export interface Evaluation {
  evaluationId: number;
  candidateId: number;
  interviewId: number;
  evaluationType?: string | null;
  score?: number | null;
  feedback?: string | null;
  evaluatedAt?: Date | string | null; // use string if it comes as ISO string from API
}
