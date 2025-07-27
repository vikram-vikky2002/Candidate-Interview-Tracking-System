import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { JobListingComponent } from './components/JobPortal/job-listing/job-listing.component';
import { JobDetailsComponent } from './components/JobPortal/job-details/job-details.component';
import { JobApplicationComponent } from './components/JobPortal/job-application/job-application.component';
import { JobService } from './services/JobPortal/job.service';

// Your Components
import { CandidateProgressComponent } from './components/Utility/candidate-progress/candidate-progress.component';
import { DashboardStatsComponent } from './components/Utility/dashboard-stats/dashboard-stats.component';
import { SearchInterviewsComponent } from './components/Utility/search-interviews/search-interviews.component';
import { EducationListComponent } from './components/Education/education-list/education-list.component';
import { AddEducationComponent } from './components/Education/add-education/add-education.component';
import { SkillsListComponent } from './components/Skills/skill-list/skill-list.component';
import { AssignSkillComponent } from './components/Skills/assign-skill/assign-skill.component';

// ✅ Angular Material Modules
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LayoutComponent } from './components/layout/layout.component';
import { InterviewEvaluationComponent } from './components/Interviewer/interview-evaluation/interview-evaluation.component'; // optional: for alerts
import { InterviewCalendarComponent } from './components/Interviewer/interview-calendar/interview-calendar.component';
import { BrowserModule } from '@angular/platform-browser';
import { CandidateListComponent } from './components/Candidates/candidate-list/candidate-list.component';

@NgModule({
  declarations: [
    AppComponent,
    CandidateProgressComponent,
    DashboardStatsComponent,
    SearchInterviewsComponent,
    EducationListComponent,
    AddEducationComponent,
    SkillsListComponent,
    AssignSkillComponent,
    LayoutComponent,
    CandidateListComponent,
    JobListingComponent,
    JobDetailsComponent,
    JobApplicationComponent,
    InterviewEvaluationComponent,
    InterviewCalendarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,

    // ✅ Angular Material UI Modules
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSelectModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
