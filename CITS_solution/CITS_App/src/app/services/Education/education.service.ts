// services/education.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Education } from '../../models/Education/Education';

@Injectable({
  providedIn: 'root'
})
export class EducationService {
  private baseUrl = 'https://localhost:7181/api/Education'; // replace with actual port

  constructor(private http: HttpClient) { }

  getEducationByCandidateId(candidateId: number): Observable<Education[]> {
    return this.http.get<Education[]>(`${this.baseUrl}/candidate/${candidateId}`);
  }

  // ✅ Returns the created education object now
  addEducation(education: Education): Observable<Education> {
    return this.http.post<Education>(`${this.baseUrl}/add`, education);
  }

  // ✅ Returns true/false from backend (boolean deletion status)
  deleteEducation(educationId: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}/delete/${educationId}`);
  }
  updateEducation(education: Education): Observable<Education> {
    return this.http.put<Education>(`${this.baseUrl}/update/${education.EducationId}`, education);
  }
}
