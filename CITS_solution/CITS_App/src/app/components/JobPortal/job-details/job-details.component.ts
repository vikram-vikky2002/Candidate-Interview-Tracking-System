import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Job } from '../../../models/JobPortal/job';
import { JobService } from '../../../services/JobPortal/job.service';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent implements OnInit {
  job: Job | undefined;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private jobService: JobService
  ) { }

  ngOnInit(): void {
    this.loadJobDetails();
  }

  private loadJobDetails(): void {
    const jobId = Number(this.route.snapshot.paramMap.get('id'));
    
    if (jobId) {
      this.job = this.jobService.getJobById(jobId);
      this.loading = false;
      
      if (!this.job) {
        // Redirect to jobs listing if job not found
        this.router.navigate(['/']);
      }
    } else {
      this.loading = false;
      this.router.navigate(['/']);
    }
  }

  applyNow(): void {
    if (this.job) {
      this.router.navigate(['/apply', this.job.id]);
    }
  }

  goBack(): void {
    this.location.back();
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}