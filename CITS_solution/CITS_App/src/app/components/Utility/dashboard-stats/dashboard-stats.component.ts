import { Component, OnInit } from '@angular/core';
import { UtilityService } from '../../../services/Utility/utility.service';
import { Router } from '@angular/router';

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
  }
//  "totalCandidates": 2,
//  "interviewsScheduled": 0,
//  "selectedCandidates": 0,
//  "rejectedCandidates": 0
//}
  constructor(private utilityService: UtilityService, private _router: Router) { }

  ngOnInit() {
    this.utilityService.getDashboardStats().subscribe({
      next: data => {
        this.stats = data
        console.log(data)
      },
      error: err => console.error('Error fetching stats', err)
    });
  }

  goToCandidates() {
    this._router.navigate(['/candidate-list']);
  }
}
