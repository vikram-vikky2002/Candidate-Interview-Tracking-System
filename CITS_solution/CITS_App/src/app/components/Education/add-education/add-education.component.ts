import { Component } from '@angular/core';
import { Education } from '../../../models/Education/Education';
import { EducationService } from '../../../services/Education/education.service';

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
    university: '',
    startDate: '', 
    endDate: '',
    grade:''
  };

  constructor(private educationService: EducationService) { }

  addEducation() {
    this.educationService.addEducation(this.education).subscribe(() => {
      alert('Education added successfully');
    });
  }
}
