// models/interview.model.ts
export interface Interview {
  interviewId: number;
  candidateId: number;
  interviewerName: string;
  scheduledDate: string;
  status: string; // e.g., "Passed", "Failed", "Pending"
}
