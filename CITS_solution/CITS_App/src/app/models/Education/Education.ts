// models/education.model.ts
export interface Education {
  EducationId?: number;
  CandidateId: number;
  Degree: string;
  Institute: string;
  Year: string;
}
