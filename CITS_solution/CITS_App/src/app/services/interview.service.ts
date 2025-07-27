import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Interview } from '../models/interview';

@Injectable({
  providedIn: 'root'
})
export class InterviewService {

  private _apiUrl = 'https://localhost:7181/api/interview';

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
    return this._http.get<Interview>(`${this._apiUrl}/GetByInterviewId?interviewId=${interviewId}`);
  }

  scheduleInterview(interview: Interview): Observable<any> {
    return this._http.post<any>(`${this._apiUrl}/Schedule`, interview);
  }

  updateInterview(interviewId: number, status: string): Observable<any> {
    return this._http.post<any>(
      `${this._apiUrl}/UpdateStatus?interviewId=${interviewId}&status=${encodeURIComponent(status)}`,
      null
    );
  }

  // *** New method to submit evaluation ***
  submitEvaluation(interviewId: number, evaluation: { feedback: string; score: number }): Observable<any> {
    return this._http.post<any>(`${this._apiUrl}/SubmitEvaluation/${interviewId}`, evaluation);
  }
}
