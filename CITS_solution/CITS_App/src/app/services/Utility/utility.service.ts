// services/utility.service.ts
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { DashboardStats } from '../../models/Utility/DashboardStats';
import { CandidateProgress } from '../../models/Utility/CandidateProgress ';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  private baseUrl = 'https://localhost:7181/api/Utility'; // replace with actual port

  constructor(private http: HttpClient) { }

  getDashboardStats(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>(`${this.baseUrl}/dashboard`);
  }

  getCandidateProgress(candidateId: number): Observable<CandidateProgress> {
    return this.http.get<CandidateProgress>(`${this.baseUrl}/progress/${candidateId}`);
  }
  searchInterviews(from: string, to: string, interviewerEmail: string): Observable<any> {


    return this.http.get(`${this.baseUrl}/search-interviews?from=${from}&to=${to}&interviewerEmail=${interviewerEmail}`);
  }

}
