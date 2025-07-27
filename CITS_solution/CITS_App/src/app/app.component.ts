import { Component, OnInit } from '@angular/core';
import { InterviewService } from './services/Interview/interview.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'CITS_App';

  constructor(private _interviewService: InterviewService) { }

  ngOnInit(): void {
    this._interviewService.getAllInterviews().subscribe((interviews) => {
      console.log(interviews);
    });
  }
}
