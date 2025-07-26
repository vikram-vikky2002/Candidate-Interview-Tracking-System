import { NgModule } from '@angular/core';
import { DashboardStatsComponent } from './components/Utility/dashboard-stats/dashboard-stats.component';
import { CandidateProgressComponent } from './components/Utility/candidate-progress/candidate-progress.component';
import { RouterModule, Routes } from '@angular/router';
import { EducationListComponent } from './components/Education/education-list/education-list.component';
import { AddEducationComponent } from './components/Education/add-education/add-education.component';
import { SkillsListComponent } from './components/Skills/skill-list/skill-list.component';
import { AssignSkillComponent } from './components/Skills/assign-skill/assign-skill.component';
import { SearchInterviewsComponent } from './components/Utility/search-interviews/search-interviews.component';

const routes: Routes = [
  { path: 'education-list', component: EducationListComponent },
  { path: 'add-education', component: AddEducationComponent },
  { path: 'skills-list', component: SkillsListComponent },
  { path: 'assign-skill', component: AssignSkillComponent },
  { path: 'candidate-progress', component: CandidateProgressComponent },
  { path: 'dashboard-stats', component: DashboardStatsComponent },
  { path: 'interview-search', component: SearchInterviewsComponent },

  // Optional: default redirect
  { path: '', redirectTo: '/dashboard-stats', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard-stats' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
