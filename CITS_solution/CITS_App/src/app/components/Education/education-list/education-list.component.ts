import { Component, OnInit } from '@angular/core';
import { EducationService } from '../../../services/Education/education.service';

@Component({
  selector: 'app-education-list',
  templateUrl: './education-list.component.html',
  styleUrls: ['./education-list.component.css']
})
export class EducationListComponent implements OnInit {
  educations: any[] = [];
  candidateId: number = 0;
  displayedColumns: string[] = ['educationId', 'candidateId', 'degree', 'university', 'grade', 'startDate', 'endDate'];

  constructor(private educationService: EducationService) { }

  ngOnInit(): void { }

  fetchEducation() {
    this.educationService.getEducationByCandidateId(this.candidateId).subscribe(res => {
      this.educations = res;
    });
  }
}
