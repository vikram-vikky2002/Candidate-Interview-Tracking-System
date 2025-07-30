import { Component, OnInit } from '@angular/core';
import { UtilityService } from '../../../services/Utility/utility.service';
import { Router } from '@angular/router';
import { InterviewService } from '../../../services/Interview/interview.service';
import { Interview } from '../../../models/interview';

@Component({
  selector: 'app-dashboard-stats',
  templateUrl: './dashboard-stats.component.html',
  styleUrls: ['./dashboard-stats.component.css']
})
export class DashboardStatsComponent implements OnInit {
  stats: any = {
    totalCandidates: 0,
    interviewsScheduled: 0,
    selectedCandidates: 0,
    rejectedCandidates: 0
  };

  roleId: number = 0;
  isInterviewer: boolean = false;
  todayInterviews: Interview[] = [];

  constructor(private utilityService: UtilityService, private _router: Router, private interviewService: InterviewService) { }

  ngOnInit() {
    this.roleId = Number(localStorage.getItem('roleId'));
    this.isInterviewer = this.roleId === 2;

    if (this.isInterviewer) {
      const interviewerId = Number(localStorage.getItem('userId'));
      this.loadTodaySchedule(interviewerId);
      console.log('Interviewer ID:', interviewerId)
    } else {
      this.loadStats();
    }
    console.log(this.isInterviewer, this.roleId)
  }

  loadStats() {
    this.utilityService.getDashboardStats().subscribe({
      next: data => {
        this.stats = data;
      },
      error: err => console.error('Error fetching stats', err)
    });
  }
  loadTodaySchedule(interviewerId: number) {
    this.interviewService.getInterviewByInterviewerId(interviewerId).subscribe({
      next: (interviews) => {
        const today = new Date();
        const todayYear = today.getFullYear();
        const todayMonth = today.getMonth();
        const todayDate = today.getDate();

        this.todayInterviews = interviews.filter(interview => {
          const dateVal = interview.scheduledDateTime;
          if (!dateVal) return false;

          const scheduled = new Date(dateVal);
          return (
            scheduled.getFullYear() === todayYear &&
            scheduled.getMonth() === todayMonth &&
            scheduled.getDate() === todayDate
          );
        });
        console.log(interviews)
        console.log('Today\'s Interviews:', this.todayInterviews);
      },
      error: err => console.error('Error loading today’s schedule', err)
    });
  }




  goToCandidates() {
    this._router.navigate(['/candidate-list']);
  }

  getPercentage(value: number): number {
    return this.stats.totalCandidates ? Math.round((value / this.stats.totalCandidates) * 100) : 0;
  }
}
