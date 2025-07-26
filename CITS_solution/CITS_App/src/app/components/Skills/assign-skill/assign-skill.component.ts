import { Component, OnInit } from '@angular/core';
import { SkillsService } from '../../../services/Skills/skills.service';
import { Skill } from '../../../models/Skills/Skills';

@Component({
  selector: 'app-assign-skill',
  templateUrl: './assign-skill.component.html',
  styleUrls: ['./assign-skill.component.css']
})
export class AssignSkillComponent implements OnInit {
  candidateId: number = 0;
  skillId: number = 0;
  skills: Skill[] = [];

  constructor(private skillsService: SkillsService) { }

  ngOnInit() {
    this.skillsService.getAllSkills().subscribe((data) => {
      this.skills = data;
    });
  }

  assign() {
    this.skillsService.assignSkillToCandidate(this.candidateId, this.skillId).subscribe(() => {
      alert('✅ Skill assigned to candidate');
    });
  }

  remove() {
    this.skillsService.removeSkillFromCandidate(this.candidateId, this.skillId).subscribe(() => {
      alert('🗑️ Skill removed from candidate');
    });
  }
}
