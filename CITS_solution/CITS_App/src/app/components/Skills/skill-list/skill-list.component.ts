import { Component, OnInit } from '@angular/core';
import { SkillsService } from '../../../services/Skills/skills.service';
import { Skill } from '../../../models/Skills/Skills';
import { CandidateService } from '../../../services/Candidate/candidate.service'; // ← Import this
import { Candidate } from '../../../models/Candidate/candidate';

@Component({
  selector: 'app-skill-list',
  templateUrl: './skill-list.component.html',
  styleUrls: ['./skill-list.component.css']
})
export class SkillsListComponent implements OnInit {
  skills: Skill[] = [];
  displayedColumns: string[] = ['skillId', 'skillName'];
  newSkillName: string = '';
  candidateId: number | null = null;

  candidates: Candidate[] = []; // ← Holds dropdown data

  constructor(
    private skillsService: SkillsService,
    private candidateService: CandidateService // ← Inject service
  ) { }

  ngOnInit(): void {
    this.loadSkills();
    this.loadCandidates(); // ← Load candidate options
  }

  loadSkills(): void {
    this.skillsService.getAllSkills().subscribe(res => {
      this.skills = res;
    });
  }

  loadCandidates(): void {
    this.candidateService.getAllCandidates().subscribe(res => {
      this.candidates = res;
    });
  }

  addSkill(): void {
    if (this.newSkillName.trim()) {
      this.skillsService.addSkill(this.newSkillName).subscribe(() => {
        alert('Skill added successfully');
        this.newSkillName = '';
        this.loadSkills();
      });
    }
  }

  searchSkillsByCandidate(): void {
    if (this.candidateId !== null) {
      this.skillsService.getSkillsByCandidateId(this.candidateId).subscribe(res => {
        this.skills = res;
      });
    }
  }
}
