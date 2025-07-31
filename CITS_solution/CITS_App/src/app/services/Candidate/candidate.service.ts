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

  getAllCandidates(): Observable<any[]> {
    return this.http.get<Candidate[]>(`${this._apiUrl}/candidate`);
  }

  getCandidateById(id: number): Observable<any> {
    return this.http.get<any>(`${this._apiUrl}/candidate/${id}`);
  }

  updateCandidateStatus(id: number, status: string): Observable<any> {
    var body = { "candidateId": id, "status": status };
    console.log(body);
    return this.http.put<any>(`${this._apiUrl}/candidate/status`, body);
  }

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

  getSkillsByCandidateId(id: number): Observable<any> {
    return this.http.get<any>(`${this._apiUrl}/candidate/skills/${id}`);
  }

  getEducationByCandidateId(id: number): Observable<any> {
    return this.http.get<any>(`${this._apiUrl}/education/candidate/${id}`);
  }

  getInterviewByCandidateId(id: number): Observable<any> {
    return this.http.get<any>(`${this._apiUrl}/interview/by-candidate?candidateId=${id}`);
  }

  getInterviewStage(id: number): Observable<any> {
    return this.http.get<any>(`${this._apiUrl}/interview/getInterviewStageName?stageId=${id}`);
  }

  getEvaluationByInterviewId(id: number): Observable<any> {
    return this.http.get<any>(`${this._apiUrl}/evaluation/interview/${id}`);
  }

  getInterviewerName(id: number): Observable<any> {
    return this.http.get<any>(`${this._apiUrl}/username/${id}`);
  }

}
