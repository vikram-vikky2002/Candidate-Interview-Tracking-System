import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { Evaluation } from '../../models/Evaluation/Evaluation';
import { Interview } from '../../models/interview';


@Injectable({
  providedIn: 'root'
})
export class InterviewService {

  private _apiUrl = 'https://localhost:7181/api/Interview';

  constructor(private _http: HttpClient) { }

  // ✅ Get all interviews
  getAllInterviews(): Observable<Interview[]> {
    return this._http.get<Interview[]>(`${this._apiUrl}/GetAllInterviews`);
  }

  // ✅ Get upcoming interviews
  getUpcomingInterviews(): Observable<Interview[]> {
    return this._http.get<Interview[]>(`${this._apiUrl}/GetUpcoming`);
  }

  // ✅ Get interviews by interviewer ID

  getInterviewByInterviewerId(interviewerId: number): Observable<Interview[]> {
    console.log(interviewerId)  
    return this._http.get<Interview[]>('https://localhost:7181/api/Interview/GetByInterviewer?interviewerId=' + interviewerId).pipe(
    map(interviews =>
      interviews.map(i => ({
        ...i,
        scheduledDateTime: i.scheduledDateTime ? new Date(i.scheduledDateTime) : null
      }))
    ),
    tap(interviews => console.log('Fetched from API:', interviews)) // ✅ logs actual interview data
  );
}

  // ✅ Get interviews by candidate ID
  getInterviewByCandidateId(candidateId: number): Observable<Interview[]> {
    return this._http.get<Interview[]>(`${this._apiUrl}/GetByCandidateId?candidateId=${candidateId}`).pipe(
      map(interviews =>
        interviews.map(i => ({
          ...i,
          scheduledDateTime: i.scheduledDateTime ? new Date(i.scheduledDateTime) : null
        }))
      )
    );
  }

  // ✅ Get interview by ID (fixed logging and conversion)
  getInterviewById(interviewId: number): Observable<Interview> {
    return this._http.get<Interview>(`${this._apiUrl}/GetInterviewById/${interviewId}`).pipe(
      map(i => ({
        ...i,
        scheduledDateTime: i.scheduledDateTime ? new Date(i.scheduledDateTime) : null
      }))
    );
  }

  // ✅ Schedule an interview
  scheduleInterview(interview: Interview): Observable<any> {
    return this._http.post<any>(`${this._apiUrl}/Schedule`, interview);
  }

  // ✅ Update interview status
  updateInterview(interviewId: number, status: string): Observable<any> {
    return this._http.put<any>(
      `${this._apiUrl}/UpdateStatus?interviewId=${interviewId}&status=${status}`,
      null
    );
  }

  // ✅ Submit evaluation
  submitEvaluation(evaluet: Evaluation): Observable<any> {
    const evalue: Evaluation = {
      evaluationId: 0,
      candidateId: evaluet.candidateId,
      interviewId: evaluet.interviewId,
      evaluationType: evaluet.evaluationType,
      score: evaluet.score,
      feedback: evaluet.feedback,
      evaluatedAt: new Date().toISOString()
    };

    console.log('Submitting evaluation:', evalue);
    return this._http.post<any>(`https://localhost:7181/api/Evaluation/AddEvaluation`, evalue);
  }

  // ✅ Get evaluation by interview ID
  getEvaluationByInterviewId(interviewId: number): Observable<Evaluation | null> {
    return this._http.get<Evaluation>(`https://localhost:7181/api/Evaluation/GetEvaluationByInterviewId/${interviewId}`);
  }

  // ✅ Get evaluations by candidate ID
  getEvaluationsByCandidateId(candidateId: number): Observable<Evaluation[]> {
    return this._http.get<Evaluation[]>(`https://localhost:7181/api/Evaluation/GetEvaluationsByCandidateId/${candidateId}`);
  }

  // ✅ Get evaluations by interviewer ID
  getEvaluationsByInterviewerId(interviewerId: number): Observable<Evaluation[]> {
    return this._http.get<Evaluation[]>(`https://localhost:7181/api/Evaluation/GetEvaluationsByInterviewerId/${interviewerId}`);
  }
}
