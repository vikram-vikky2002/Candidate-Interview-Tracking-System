import { NgModule } from '@angular/core';
import { DashboardStatsComponent } from './components/Utility/dashboard-stats/dashboard-stats.component';
import { CandidateProgressComponent } from './components/Utility/candidate-progress/candidate-progress.component';
import { RouterModule, Routes } from '@angular/router';
import { EducationListComponent } from './components/Education/education-list/education-list.component';
import { AddEducationComponent } from './components/Education/add-education/add-education.component';
import { SkillsListComponent } from './components/Skills/skill-list/skill-list.component';
import { AssignSkillComponent } from './components/Skills/assign-skill/assign-skill.component';
import { SearchInterviewsComponent } from './components/Utility/search-interviews/search-interviews.component';
import { LayoutComponent } from './components/layout/layout.component';


const routes: Routes = [
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
      { path: '', redirectTo: 'dashboard-stats', pathMatch: 'full' } // default route
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
