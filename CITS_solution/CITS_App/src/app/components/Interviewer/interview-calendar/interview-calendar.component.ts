import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Interview } from '../../../models/interview';
import { InterviewService } from '../../../services/interview.service';

@Component({
  selector: 'app-interview-calendar',
  templateUrl: './interview-calendar.component.html',
  styleUrls: ['./interview-calendar.component.css']
})
export class InterviewCalendarComponent implements OnInit {
  currentMonth: Date = new Date();
  daysInMonth: { date: Date; interviews: Interview[] }[] = [];
  emptyLeadingDays: any[] = [];
  selectedDate: Date | null = null;
  today: Date = new Date();

  constructor(private interviewService: InterviewService, private router: Router) { }

  ngOnInit(): void {
    this.generateCalendar();
  }

  generateCalendar(): void {
    const year = this.currentMonth.getFullYear();
    const month = this.currentMonth.getMonth();
    const numberOfDays = new Date(year, month + 1, 0).getDate();

    const firstDayWeekday = new Date(year, month, 1).getDay();
    this.emptyLeadingDays = new Array(firstDayWeekday);

    this.daysInMonth = [];
    for (let i = 1; i <= numberOfDays; i++) {
      this.daysInMonth.push({ date: new Date(year, month, i), interviews: [] });
    }

    this.interviewService.getAllInterviews().subscribe((interviews) => {
      interviews.forEach((interview) => {
        if (interview.scheduledDateTime != null) {
          const interviewDate = new Date(interview.scheduledDateTime);
          if (interviewDate.getFullYear() === year && interviewDate.getMonth() === month) {
            const day = this.daysInMonth.find((d) => d.date.getDate() === interviewDate.getDate());
            if (day) {
              day.interviews.push(interview);
            }
          }
        }
      });
    });
  }

  goToPreviousMonth(): void {
    this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() - 1, 1);
    this.generateCalendar();
    this.selectedDate = null;
  }

  goToNextMonth(): void {
    this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1, 1);
    this.generateCalendar();
    this.selectedDate = null;
  }

  onDayClick(day: { date: Date; interviews: Interview[] }): void {
    this.selectedDate = day.date;
    if (day.interviews.length > 0) {
      this.openEvaluation(day.interviews[0].interviewId);
    }
  }

  openEvaluation(interviewId: number | string): void {
    this.router.navigate(['/evaluate', interviewId]);
  }

  goToMeeting(link: string) {
    window.open(link, '_blank');
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('en-IN', { weekday: 'short', day: '2-digit', month: 'short' });
  }
}
