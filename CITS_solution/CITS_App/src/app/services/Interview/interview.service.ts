import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Interview } from '../../models/interview';

@Injectable({
  providedIn: 'root'
})
export class InterviewService {

  private _apiUrl = 'https://localhost:7181/api/interview';

  constructor(private _http: HttpClient) { }

  getAllInterviews() : Observable<any[]> {
    return this._http.get<any[]>(`${this._apiUrl}/GetAllInterviews`);
  }

  getUpcomingInterviews() : Observable<any[]> {
    return this._http.get<any[]>(`${this._apiUrl}/GetUpcoming`);
  }

  getInterviewByInterviewerId(interviewerId: number) : Observable<any> {
    return this._http.get<any>(`${this._apiUrl}/GetByInterviewer?interviewerId=${interviewerId}`);
  }

  getInterviewByCandidateId(candidateId: number) : Observable<any> {
    return this._http.get<any>(`${this._apiUrl}/GetByCandidateId?candidateId=${candidateId}`);
  }

  scheduleInterview(interview: Interview) : Observable<any> {
    return this._http.post<any>(`${this._apiUrl}/Schedule`, interview);
  }

  updateInterview(interviewId: number, status: string) : Observable<any> {
    return this._http.post<any>(`${this._apiUrl}/UpdateStatus?interviewId=${interviewId}&status=${status}`, null);
  }

}
