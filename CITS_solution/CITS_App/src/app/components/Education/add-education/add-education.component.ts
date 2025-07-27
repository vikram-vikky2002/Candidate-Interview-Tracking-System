import { Component } from '@angular/core';
import { Education } from '../../../models/Education/Education';
import { EducationService } from '../../../services/Education/education.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-education',
  templateUrl: './add-education.component.html',
  styleUrls: ['./add-education.component.css']
})
export class AddEducationComponent {
  education: Education = {
    educationId: 0,
    candidateId: 0,
    degree: '',
    institute: '',
    year: ''
  };

  constructor(private educationService: EducationService, private router: Router) { }

  addEducation() {
    this.educationService.addEducation(this.education).subscribe(() => {
      alert('Education added successfully');
      this.router.navigate(['/education-list']);
    });
  }

  cancel() {
    this.router.navigate(['/education-list']);
  }
}
