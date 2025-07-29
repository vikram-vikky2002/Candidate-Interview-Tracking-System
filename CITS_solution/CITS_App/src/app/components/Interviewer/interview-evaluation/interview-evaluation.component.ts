import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InterviewService } from '../../../services/Interview/interview.service';
import { Interview } from '../../../models/interview';
import { Evaluation } from '../../../models/Evaluation/Evaluation';

  @Component({
    selector: 'app-interview-evaluation',
    templateUrl: './interview-evaluation.component.html',
    styleUrls: ['./interview-evaluation.component.css']
  })
  export class InterviewEvaluationComponent implements OnInit {
    interviewId!: number;
    interview: Interview = {
 
      candidateId: 0,
      interviewerId: 0,
      scheduledDateTime: new Date(),
      status: '',
      meetingLink: '',
      interviewMode: '',
      stageId: 0,
      interviewId: 0

    }

  ;
    feedback: string = '';
    score: number = 0;
    loading = true;
    errorMsg: string | null = null;
    isCompleted: boolean = false;

    constructor(
      private route: ActivatedRoute,
      private interviewService: InterviewService,
      private router: Router
    ) { }
    ngOnInit(): void {
      this.interviewId = Number(this.route.snapshot.paramMap.get('interviewId'));

      this.interviewService.getInterviewById(this.interviewId).subscribe({
        next: (data) => {
          this.interview = data;
          this.isCompleted = this.interview.status === 'Completed';

          if (this.isCompleted) {
            // Fetch the evaluation data if interview is already completed
            this.interviewService.getEvaluationByInterviewId(this.interviewId).subscribe({
              next: (evaluation) => {
                console.log('Evaluation details:', evaluation);
                this.feedback = evaluation?.feedback ?? '';
                this.score = evaluation?.score ?? 0;
              },
              error: (err) => {
                console.error('No evaluation found for this interview:', err);
              }
            });

          }

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
      const evalue: Evaluation = {
        evaluationId: 0, 
        candidateId: this.interview.candidateId,
        interviewId: this.interviewId,
        evaluationType: 'Online', // Default type, adjust as necessary
        score: this.score,
        feedback: this.feedback,
        evaluatedAt: new Date().toISOString() // Current date and time
      };
      console.log('Submitting evaluation:', evalue);
      this.interviewService.submitEvaluation(evalue).subscribe({
        next: (ere) => {
          console.log('Evaluation submitted:', ere);
          this.interviewService.updateInterview(this.interviewId, 'Completed').subscribe({
            next: (res) => {
              console.log('Interview status updated:', res);
              alert('Evaluation submitted and interview marked as completed!');
              this.router.navigate(['/interviewer-calendar']);
            },
            error: (err) => {
              console.error('Failed to update interview status:', err);
              alert('Evaluation saved, but failed to update interview status.');
            }
          });
        },
        error: (err) => {
          console.error('Error submitting evaluation:', err);
          alert('Failed to submit evaluation.')
        }
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
