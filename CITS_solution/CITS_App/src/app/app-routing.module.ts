import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './components/layout/layout.component';
import { DashboardStatsComponent } from './components/Utility/dashboard-stats/dashboard-stats.component';
import { CandidateProgressComponent } from './components/Utility/candidate-progress/candidate-progress.component';
import { EducationListComponent } from './components/Education/education-list/education-list.component';
import { AddEducationComponent } from './components/Education/add-education/add-education.component';
import { SkillsListComponent } from './components/Skills/skill-list/skill-list.component';
import { AssignSkillComponent } from './components/Skills/assign-skill/assign-skill.component';
import { SearchInterviewsComponent } from './components/Utility/search-interviews/search-interviews.component';
import { JobListingComponent } from './components/JobPortal/job-listing/job-listing.component';
import { JobDetailsComponent } from './components/JobPortal/job-details/job-details.component';
import { JobApplicationComponent } from './components/JobPortal/job-application/job-application.component';
import { InterviewEvaluationComponent } from './components/Interviewer/interview-evaluation/interview-evaluation.component';
import { InterviewCalendarComponent } from './components/Interviewer/interview-calendar/interview-calendar.component';
import { CandidatesListComponent } from './components/Candidates/candidate-list/candidate-list.component';
import { ScheduleInterviewComponent } from './components/Interviewer/schedule-interview/schedule-interview.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },  // 🔥 Separate login outside layout

  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'candidate-progress', component: CandidateProgressComponent },
      { path: 'dashboard-stats', component: DashboardStatsComponent },
      { path: 'search-interviews', component: SearchInterviewsComponent },
      { path: 'education-list', component: EducationListComponent },
      { path: 'add-education', component: AddEducationComponent },
      { path: 'skills-list', component: SkillsListComponent },
      { path: 'assign-skill', component: AssignSkillComponent },
      { path: 'jobs', component: JobListingComponent },
      { path: 'scheduleInterview', component: ScheduleInterviewComponent },
      { path: 'candidate-list', component: CandidatesListComponent },
      { path: 'job/:id', component: JobDetailsComponent },
      { path: 'apply/:id', component: JobApplicationComponent },
      { path: 'evaluate/:interviewId', component: InterviewEvaluationComponent },
      { path: 'interviewer-calendar', component: InterviewCalendarComponent },
      { path: '', redirectTo: 'dashboard-stats', pathMatch: 'full' } // 👈 Default after login
    ]
  },

  { path: '**', redirectTo: 'login' } // Wildcard redirect
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
