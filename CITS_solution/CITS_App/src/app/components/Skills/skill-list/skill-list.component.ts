import { Component, OnInit } from '@angular/core';
import { SkillsService } from '../../../services/Skills/skills.service';

@Component({
  selector: 'app-skill-list',
  templateUrl: './skill-list.component.html',
  styleUrls: ['./skill-list.component.css']
})
export class SkillsListComponent implements OnInit {
  skills: any[] = [];
  displayedColumns: string[] = ['skillId', 'skillName'];

  constructor(private skillsService: SkillsService) { }

  ngOnInit(): void {
    this.skillsService.getAllSkills().subscribe(res => {
      this.skills = res;
    });
  }
}
