import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { CandidateProgressComponent } from './components/Utility/candidate-progress/candidate-progress.component';
import { DashboardStatsComponent } from './components/Utility/dashboard-stats/dashboard-stats.component';
import { SearchInterviewsComponent } from './components/Utility/search-interviews/search-interviews.component';
import { FormsModule } from '@angular/forms';
import { EducationListComponent } from './components/Education/education-list/education-list.component';
import { AddEducationComponent } from './components/Education/add-education/add-education.component';
import { SkillsListComponent } from './components/Skills/skill-list/skill-list.component';
import { AssignSkillComponent } from './components/Skills/assign-skill/assign-skill.component';

@NgModule({
  declarations: [
    AppComponent,
    CandidateProgressComponent,
    DashboardStatsComponent,
    SearchInterviewsComponent,
    EducationListComponent,
    AddEducationComponent,
    SkillsListComponent,
    AssignSkillComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
