import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { InterviewService } from 'src/app/services/Interview/interview.service';
import { Candidate } from 'src/app/models/Candidate/candidate';
import { Interview } from 'src/app/models/interview';

@Component({
  selector: 'app-schedule-interview',
  templateUrl: './schedule-interview.component.html',
  styleUrls: ['./schedule-interview.component.css'],
})
export class ScheduleInterviewComponent implements OnInit {
  @Input() candidate!: any;
  @Input() editMode = false;
  @Output() closed = new EventEmitter<boolean>(); // emit true if saved

  formData = {
    scheduledDateTime: '',
    interviewMode: 'Online',
    interviewer: '',
  };

  constructor(private interviewSrv: InterviewService) {}

  ngOnInit(): void {
    if (this.editMode && (this.candidate as any).interview) {
      const i = (this.candidate as any).interview as Interview;
      this.formData = {
        scheduledDateTime: this.toLocalISO(i.scheduledDateTime!),
        interviewMode: i.interviewMode,
        interviewer: i.interviewerId.toString(),
      };
    }
  }

  private toLocalISO(dt: Date | string): string {
    const d = new Date(dt);
    return new Date(d.getTime() - d.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 16);
  }

  saveInterview() {
    const payload: Interview = {
      candidateId: this.candidate.CandidateId!,
      scheduledDateTime: new Date(this.formData.scheduledDateTime),
      interviewMode: this.formData.interviewMode,
      interviewerId: Number(this.formData.interviewer),
      stageId: 2, // “Interview Scheduled”
      status: 'Scheduled',
      interviewId: 0,
    };

    const req$ = this.editMode
      ? this.interviewSrv.updateInterview(payload.interviewId, payload.status)
      : this.interviewSrv.scheduleInterview(payload);

    req$.subscribe({
      next: () => this.close(true),
      error: (e) => {
        console.error('Interview save failed', e);
        this.close(false);
      },
    });
  }

  close(refresh = false) {
    this.closed.emit(refresh);
  }
}
