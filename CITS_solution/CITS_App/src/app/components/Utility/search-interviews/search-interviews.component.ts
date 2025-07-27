import { Component } from '@angular/core';
import { UtilityService } from '../../../services/Utility/utility.service';

@Component({
  selector: 'app-search-interviews',
  templateUrl: './search-interviews.component.html',
  styleUrls: ['./search-interviews.component.css']
})
export class SearchInterviewsComponent {
  from: string = '';
  to: string = '';
  interviewerEmail: string = '';
  interviews: any[] = [];

  constructor(private utilityService: UtilityService) { }

  search() {
    this.utilityService.searchInterviews(this.from, this.to, this.interviewerEmail).subscribe({
      next: data => this.interviews = data,
      error: err => console.error('Error fetching interviews', err)
    });
  }
}

