import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InterviewService } from '../../../services/interview.service';
import { Interview } from '../../../models/interview';

@Component({
  selector: 'app-interview-evaluation',
  templateUrl: './interview-evaluation.component.html',
  styleUrls: ['./interview-evaluation.component.css']
})
export class InterviewEvaluationComponent implements OnInit {
  interviewId!: number;
  interview?: Interview;
  feedback: string = '';
  score: number = 0;
  loading = true;
  errorMsg: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private interviewService: InterviewService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.interviewId = Number(this.route.snapshot.paramMap.get('interviewId'));
    this.interviewService.getInterviewById(this.interviewId).subscribe({
      next: (data: Interview) => {
        this.interview = data;
        this.loading = false;
      },
      error: () => {
        this.errorMsg = 'Interview not found.';
        this.loading = false;
      }
    });
  }

  submitEvaluation(): void {
    if (this.score < 0 || this.score > 10) {
      alert('Score must be between 0 and 10');
      return;
    }
    if (!this.feedback.trim()) {
      alert('Feedback cannot be empty');
      return;
    }
    this.interviewService.submitEvaluation(this.interviewId, { feedback: this.feedback, score: this.score }).subscribe({
      next: () => {
        alert('Evaluation submitted successfully!');
        this.router.navigate(['/calendar']); // Adjust route as necessary
      },
      error: () => alert('Failed to submit evaluation.')
    });
  }

  openMeetingLink(): void {
    if (this.interview?.meetingLink) {
      window.open(this.interview.meetingLink, '_blank');
    } else {
      alert('No meeting link available');
    }
  }
}
