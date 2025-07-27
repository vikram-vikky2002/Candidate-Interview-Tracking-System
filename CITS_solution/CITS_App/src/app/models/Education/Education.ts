// models/education.model.ts
export interface Education {
  educationId: number;
  candidateId: number;
  degree: string;
  university: string;
  startDate: string;   // Format: 'YYYY-MM-DD'
  endDate: string;     // Format: 'YYYY-MM-DD'
  grade: string;
}
