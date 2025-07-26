export interface Interview {
    interviewId: number;
    candidateId: number;
    scheduledDateTime?: Date | null;
    interviewMode: string;
    interviewerId: number;
    stageId: number;
    status: string;
}