// models/evaluation.model.ts
export interface Evaluation {
  evaluationId: number;
  candidateId: number;
  interviewId: number;
  evaluationType?: string | null;
  score: number | null;
  feedback: string | null;
  evaluatedAt?: Date | string | null; // use string if it comes as ISO string from API
}
/*  public int InterviewId { get; set; }

    public int CandidateId { get; set; }

    public DateTime ? ScheduledDateTime { get; set; }

    public string InterviewMode { get; set; } = null!;

    public int InterviewerId { get; set; }

    public int StageId { get; set; }

    public string Status { get; set; } = null!;*/
