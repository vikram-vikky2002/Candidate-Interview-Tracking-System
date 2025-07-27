// models/education.model.ts
export interface Education {
  educationId?: number;
  candidateId: number;
  degree: string;
  institute: string;
  year: string;
}
