import { Component, OnInit } from '@angular/core';
import { SkillsService } from '../../../services/Skills/skills.service';
import { Skill } from '../../../models/Skills/Skills';

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

  constructor(private skillsService: SkillsService) { }

  ngOnInit(): void {
    this.loadSkills();
  }

  loadSkills(): void {
    this.skillsService.getAllSkills().subscribe(res => {
      this.skills = res;
      console.log(res)
    });
  }

  addSkill(): void {
    if (this.newSkillName.trim()) {
      this.skillsService.addSkill(this.newSkillName).subscribe((res) => {
        console.log(res)
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
