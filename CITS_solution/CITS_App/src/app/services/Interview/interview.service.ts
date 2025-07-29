import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Evaluation } from '../../models/Evaluation/Evaluation';
import { Interview } from '../../models/interview';

@Injectable({
  providedIn: 'root'
})
export class InterviewService {

  private _apiUrl = 'https://localhost:7181/api/Interview';

  constructor(private _http: HttpClient) { }

  getAllInterviews(): Observable<Interview[]> {
    return this._http.get<Interview[]>(`${this._apiUrl}/GetAllInterviews`);
  }

  getUpcomingInterviews(): Observable<Interview[]> {
    return this._http.get<Interview[]>(`${this._apiUrl}/GetUpcoming`);
  }

  getInterviewByInterviewerId(interviewerId: number): Observable<Interview[]> {
    return this._http.get<Interview[]>(`${this._apiUrl}/GetByInterviewer?interviewerId=${interviewerId}`);
  }

  getInterviewByCandidateId(candidateId: number): Observable<Interview[]> {
    return this._http.get<Interview[]>(`${this._apiUrl}/GetByCandidateId?candidateId=${candidateId}`);
  }

  // *** New method to get a single interview by interviewId ***
  getInterviewById(interviewId: number): Observable<Interview> {
    const og = this._http.get<Interview>(`https://localhost:7181/api/Interview/GetInterviewById/${interviewId}`);
    console.log('this is ',og)
    return og;
  }

  scheduleInterview(interview: Interview): Observable<any> {
    return this._http.post<any>(`${this._apiUrl}/Schedule`, interview);
  }

  updateInterview(interviewId: number, status: string): Observable<any> {
    return this._http.put<any>(
      `https://localhost:7181/api/Interview/UpdateStatus?interviewId=${interviewId}&status=${status}`,
      null
    );
  }

  // *** New method to submit evaluation ***
  submitEvaluation(evaluet: Evaluation): Observable<any> {
    const evalue: Evaluation = {
      evaluationId: 0,
      candidateId: evaluet.candidateId,
      interviewId: evaluet.interviewId,
      evaluationType: evaluet.evaluationType, // Assuming a default type
      score: evaluet.score,
      feedback: evaluet.feedback,
      evaluatedAt: new Date().toISOString() // Current date and time
    };
    console.log('Submitting evaluation:', evalue);
    return this._http.post<any>(`https://localhost:7181/api/Evaluation/AddEvaluation`, evalue);
  }
  getEvaluationByInterviewId(interviewId: number): Observable<Evaluation | null> {
    return this._http.get<Evaluation>(`https://localhost:7181/api/Evaluation/GetEvaluationByInterviewId/${interviewId}`);
  }



  // 🔶 Get evaluations by candidateId
  getEvaluationsByCandidateId(candidateId: number): Observable<Evaluation[]> {
    return this._http.get<Evaluation[]>(
      `https://localhost:7181/api/Evaluation/GetEvaluationsByCandidateId/${candidateId}`
    );
  }

  // 🔶 Get evaluations by interviewerId
  getEvaluationsByInterviewerId(interviewerId: number): Observable<Evaluation[]> {
    return this._http.get<Evaluation[]>(
      `https://localhost:7181/api/Evaluation/GetEvaluationsByInterviewerId/${interviewerId}`
    );
  }
}
