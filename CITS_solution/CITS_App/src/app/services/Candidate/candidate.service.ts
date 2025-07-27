import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Candidate } from '../../models/Candidate/candidate';
import { Education } from '../../models/Education/Education';
import { Skill } from '../../models/Skills/Skills';
import { CandidateSkill } from 'src/app/models/Skills/CandidateSkill';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {
  private _apiUrl = 'https://localhost:5000/cits';

  constructor(private http: HttpClient) { }

  addCandidate(candidate: Candidate): Observable<any> {
    return this.http.post<any>(`${this._apiUrl}/candidate`, candidate);
  }

  addEducation(education: Education): Observable<any> {
    return this.http.post<any>(`${this._apiUrl}/education/add`, education);
  }

  addSkill(skill: Skill): Observable<any> {
    return this.http.post<any>(`${this._apiUrl}/skills/add`, skill);
  }

  assignSkill(CandidateSkill: CandidateSkill): Observable<  any> {
    return this.http.post<any>(`${this._apiUrl}/skills/assign`, CandidateSkill);
  }

}
