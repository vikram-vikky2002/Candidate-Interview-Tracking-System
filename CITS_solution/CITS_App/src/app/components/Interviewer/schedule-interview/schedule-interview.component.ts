import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { InterviewService } from 'src/app/services/Interview/interview.service';
import { Interview } from 'src/app/models/interview';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-schedule-interview',
  templateUrl: './schedule-interview.component.html',
  styleUrls: ['./schedule-interview.component.css'],
})
export class ScheduleInterviewComponent implements OnInit {
  @Input() candidate!: any;
  @Input() editMode = false;
  @Output() closed = new EventEmitter<boolean>();
  interviewers: any[] = [];

  formData = {
    scheduledDateTime: '',
    stageId: 0,
    interviewMode: 'Online',
    interviewer: '',
  };
  stages: any[] = [];

  constructor(private interviewSrv: InterviewService, private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('https://localhost:5000/cits/interviewstage')
    .subscribe({
      next: (data) => this.stages = data,
      error: (e) => {
        console.warn('Could not load stages, using default.');
        // fallback to hardcoded
        this.stages = [
          { stageId: 1, stageName: 'Resume Screening' },
          { stageId: 2, stageName: 'Technical Round 1' },
          { stageId: 3, stageName: 'Technical Round 2' },
          { stageId: 4, stageName: 'HR Round' },
          { stageId: 5, stageName: 'Final Decision' },
        ];
      }
    });

    console.log('Received candidate in modal:', this.candidate);

    this.interviewSrv.getInterviewers().subscribe({
      next: res => this.interviewers = res,
      error: err => console.error('Failed to load interviewers', err)
    });

    if (this.editMode && (this.candidate as any).interview) {
      const i = (this.candidate as any).interview as Interview;
      this.formData = {
        scheduledDateTime: this.toLocalISO(i.scheduledDateTime!),
        interviewMode: i.interviewMode,
        interviewer: i.interviewerId.toString(),
        stageId: i.stageId,
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
      candidateId: this.candidate.candidateId,
      scheduledDateTime: new Date(this.formData.scheduledDateTime),
      interviewMode: this.formData.interviewMode,
      interviewerId: Number(this.formData.interviewer),
      stageId: this.formData.stageId,
      status: 'Scheduled',
      evaluationType: '',
      interviewId: 0,
      meetingLink:''
    };

    const req$ = this.interviewSrv.scheduleInterview(payload);

    console.log(payload);

    req$.subscribe({
      next: () => {
        alert("Interview Scheduled Successfully");
        this.close(true);
      },
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
