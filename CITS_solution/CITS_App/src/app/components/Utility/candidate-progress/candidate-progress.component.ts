import { Component } from '@angular/core';
import { UtilityService } from '../../../services/Utility/utility.service';

@Component({
  selector: 'app-candidate-progress',
  templateUrl: './candidate-progress.component.html',
  styleUrls: ['./candidate-progress.component.css']
})
export class CandidateProgressComponent {
  candidateId: number = 0;
  progress: any = null;

  constructor(private utilityService: UtilityService) { }

  getProgress() {
    this.utilityService.getCandidateProgress(this.candidateId).subscribe({
      next: data => this.progress = data,
      error: err => {
        console.error('Error fetching candidate progress', err);
        this.progress = null;
      }
    });
  }
}

