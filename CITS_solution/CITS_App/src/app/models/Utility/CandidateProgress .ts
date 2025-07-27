// models/candidate-progress.model.ts
export interface CandidateProgress {
  candidateId: number;
  totalInterviews: number;
  passedCount: number;
  failedCount: number;
  pendingCount: number;
}
