export interface Interview {
    interviewId: number;
    candidateId: number;
    scheduledDateTime?: Date | null;
    interviewMode: string;
    interviewerId: number;
    stageId: number;
    evaluationType: string;
    status: string;
  meetingLink?: string;


}
//"interviewId": 2,
//  "candidateId": 2,
//    "scheduledDateTime": "2025-08-16T11:00:00",
//      "interviewMode": "Offline",
//        "interviewerId": 2,
//          "stageId": 1,
//            "status": "Completed"
//  },
