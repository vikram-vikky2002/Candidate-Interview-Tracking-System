import { Component, OnInit } from '@angular/core';
import { SkillsService } from '../../../services/Skills/skills.service';
import { Skill } from '../../../models/Skills/Skills';
import { Candidate } from '../../../models/Candidate/candidate';
import { CandidateService } from '../../../services/Candidate/candidate.service';

@Component({
  selector: 'app-assign-skill',
  templateUrl: './assign-skill.component.html',
  styleUrls: ['./assign-skill.component.css']
})
export class AssignSkillComponent implements OnInit {
  candidateId: number = 0;
  skillId: number = 0;

  candidates: Candidate[] = [];
  skills: Skill[] = [];

  constructor(
    private skillsService: SkillsService,
    private candidateService: CandidateService
  ) { }

  ngOnInit() {
    this.skillsService.getAllSkills().subscribe((data) => {
      this.skills = data;
    });

    this.candidateService.getAllCandidates().subscribe((data) => {
      console.log(data);
      this.candidates = data;
      console.log(this.candidates);
    });
  }

  assign() {
    if (!this.candidateId || !this.skillId) return alert("Select both fields.");
    this.skillsService.assignSkillToCandidate(this.candidateId, this.skillId).subscribe(() => {
      alert('✅ Skill assigned to candidate');
    });
  }

  remove() {
    if (!this.candidateId || !this.skillId) return alert("Select both fields.");
    this.skillsService.removeSkillFromCandidate(this.candidateId, this.skillId).subscribe(() => {
      alert('🗑️ Skill removed from candidate');
    });
  }
}
