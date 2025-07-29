// services/skills.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Skill } from '../../models/Skills/Skills';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {
  private baseUrl = 'https://localhost:7181/api/Skills'; // replace with actual port

  constructor(private http: HttpClient) { }

  getAllSkills(): Observable<Skill[]> {
    return this.http.get<Skill[]>(`${this.baseUrl}`);
  }

  getSkillsByCandidateId(cid: number): Observable<Skill[]> {
    return this.http.get<Skill[]>(`${this.baseUrl}/candidate/${cid}`);
  }

  addSkill(skillName: string): Observable<any> {
    console.log(`Adding skill: ${skillName}`);
    const skill = { skillId: 0, skillName: skillName }; 
    return this.http.post(`${this.baseUrl}/add`, skill);
  }

  assignSkillToCandidate(candidateId: number, skillId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/assign`, { candidateId, skillId });
  }


  removeSkillFromCandidate(candidateId: number, skillId: number): Observable<any> {

    return this.http.delete(`${this.baseUrl}/remove?candidate=${candidateId}&skillId=${skillId}`);
  }
}
