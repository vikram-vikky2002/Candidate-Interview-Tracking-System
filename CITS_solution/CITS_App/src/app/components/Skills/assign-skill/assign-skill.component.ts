import { Component } from '@angular/core';
import { SkillsService } from '../../../services/Skills/skills.service';

@Component({
  selector: 'app-assign-skill',
  templateUrl: './assign-skill.component.html',
  styleUrls: ['./assign-skill.component.css']
})
export class AssignSkillComponent {
  candidateId: number = 0;
  skillId: number = 0;

  constructor(private skillsService: SkillsService) { }

  assign() {
    this.skillsService.assignSkillToCandidate(this.candidateId, this.skillId).subscribe(() => {
      alert('Skill assigned to candidate');
    });
  }

  remove() {
    this.skillsService.removeSkillFromCandidate(this.candidateId, this.skillId).subscribe(() => {
      alert('Skill removed from candidate');
    });
  }
}
