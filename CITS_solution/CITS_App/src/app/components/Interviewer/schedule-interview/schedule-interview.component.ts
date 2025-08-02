import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { InterviewService } from 'src/app/services/Interview/interview.service';
import { Interview } from 'src/app/models/interview';
import { HttpClient } from '@angular/common/http';
import { GoogleCalendarService } from 'src/app/services/google-calendar.service';
import { AsyncPipe, NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CandidateService } from 'src/app/services/Candidate/candidate.service';

@Component({
  selector: 'app-schedule-interview',
  // template: `
  //       <div id="app" class="bg-white rounded-xl shadow-lg p-8 w-full max-w-md space-y-6 text-center">
  //           <h1 class="text-3xl font-bold text-gray-800">Schedule Interview</h1>
  //           <p class="text-gray-600">This app creates a Google Meet link on your calendar.</p>

  //           <!-- Loading indicator -->
  //           <div *ngIf="isLoading$ | async" class="flex items-center justify-center p-4">
  //               <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
  //               <p class="ml-4 text-gray-600 font-medium">Authenticating...</p>
  //           </div>

  //           <!-- Input Form -->
  //           <div *ngIf="(authState$ | async) && !(isLoading$ | async)" class="space-y-4">
  //               <input
  //                   type="text"
  //                   [(ngModel)]="summary"
  //                   placeholder="Event Title (e.g., Interview with Jane Doe)"
  //                   class="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
  //               />
  //               <textarea
  //                   [(ngModel)]="description"
  //                   placeholder="Event Description"
  //                   rows="3"
  //                   class="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
  //               ></textarea>
  //               <input
  //                   type="text"
  //                   [(ngModel)]="attendeesInput"
  //                   placeholder="Attendees (e.g., email1@example.com, email2@example.com)"
  //                   class="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
  //               />
  //           </div>

            // <!-- Create Button -->
            // <button
            //     *ngIf="(authState$ | async) && !(isLoading$ | async)"
            //     id="create-button"
            //     (click)="createMeetLink()"
            //     class="w-full bg-green-500 text-white font-medium py-3 px-6 rounded-lg shadow-md hover:bg-green-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
            //     Create Google Meet Link
            // </button>
            
            // <!-- Re-authenticate Button if needed -->
            // <button
            //     *ngIf="!(authState$ | async) && !(isLoading$ | async)"
            //     id="auth-button"
            //     (click)="signIn()"
            //     class="w-full bg-blue-600 text-white font-medium py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            //     Re-authenticate with Google
            // </button>

  //           <!-- Message and Link Display -->
  //           <div *ngIf="(meetLink$ | async) || (errorMessage$ | async)" class="bg-gray-50 rounded-lg p-4 text-left">
  //               <p *ngIf="meetLink$ | async" id="status-message" class="text-green-700 font-semibold">Google Meet link generated successfully!</p>
  //               <a *ngIf="meetLink$ | async" [href]="meetLink$ | async" target="_blank" class="block mt-2 text-blue-600 hover:underline break-all">{{ meetLink$ | async }}</a>
  //               <p *ngIf="eventId$ | async" id="event-id" class="text-xs text-gray-500 mt-2">Event ID: {{ eventId$ | async }}</p>
                
  //               <p *ngIf="errorMessage$ | async" id="error-message" class="text-red-600 font-semibold">{{ errorMessage$ | async }}</p>
  //           </div>

  //           <p class="text-sm text-gray-500 mt-4">This example uses a temporary access token and does not persist data. You can adapt the service to your needs.</p>
  //       </div>
  //   `,
  //   styles: [`
  //       @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
  //       body {
  //           font-family: 'Inter', sans-serif;
  //       }
  //   `],
  templateUrl: './schedule-interview.component.html',
  styleUrls: ['./schedule-interview.component.css'],
  standalone: true,
  imports: [AsyncPipe, FormsModule, NgIf, NgFor]
})
export class ScheduleInterviewComponent implements OnInit {

  authState$ = this.googleCalendarService.authState$;
  meetLink$ = this.googleCalendarService.meetLink$;
  eventId$ = this.googleCalendarService.eventId$;
  errorMessage$ = this.googleCalendarService.errorMessage$;
  isLoading$ = this.googleCalendarService.isLoading$;

  // Form inputs
  summary: string = '';
  description: string = '';


  signIn(): void {
      this.googleCalendarService.signIn();
  }

  createMeetLink(): void {
      // const attendees = this.attendeesInput.split(',').map(email => email.trim()).filter(email => email);
      this.googleCalendarService.createMeetEvent(this.summary, this.description, [this.candidate.email]);
      this.googleCalendarService.meetLink$.subscribe({
        next: (link) => this.meetingLink = link!,
        error: (e) => console.error('Failed to get meet link', e)
      });
  }


  @Input() candidate!: any;
  @Input() editMode = false;
  @Output() closed = new EventEmitter<boolean>();
  interviewers: any[] = [];

  formData = {
    scheduledDateTime: '',
    stageId: 0,
    interviewMode: 'Online',
    interviewer: ''
  };

  meetingLink: string | null = null;
  
  stages: any[] = [];

  constructor(private candidateService: CandidateService, private interviewSrv: InterviewService, private http: HttpClient, private googleCalendarService: GoogleCalendarService) {}

  ngOnInit(): void {
    this.http.get<any[]>('https://localhost:5000/cits/interviewstage')
    .subscribe({
      next: (data) => {
        this.stages = data;
        console.log('Stages loaded:', this.stages);
      },
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
        stageId: i.stageId
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
      meetingLink: this.meetingLink!
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
