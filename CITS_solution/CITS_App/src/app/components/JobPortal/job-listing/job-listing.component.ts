import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Job, JobFilter } from '../../../models/JobPortal/job';
import { JobService } from '../../../services/JobPortal/job.service';

@Component({
  selector: 'app-job-listing',
  templateUrl: './job-listing.component.html',
  styleUrls: ['./job-listing.component.css']
})
export class JobListingComponent implements OnInit, OnDestroy {
  filteredJobs$: Observable<Job[]>;
  searchFilter: JobFilter = {
    searchTitle: '',
    searchLocation: '',
    jobType: '',
    experienceLevel: ''
  };

  private destroy$ = new Subject<void>();
  private filterSubject = new Subject<JobFilter>();

  constructor(
    private jobService: JobService,
    private router: Router
  ) {
    this.filteredJobs$ = this.jobService.filteredJobs$;
  }

  ngOnInit(): void {
    // Reset filters on component init
    this.jobService.resetFilters();

    // Set up debounced filtering
    this.filterSubject.pipe(
      debounceTime(300),
      distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
      takeUntil(this.destroy$)
    ).subscribe(filter => {
      this.jobService.filterJobs(filter);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onFilterChange(): void {
    this.filterSubject.next({ ...this.searchFilter });
  }

  viewJobDetails(jobId: number): void {
    this.router.navigate(['/job', jobId]);
  }

  onJobCardKeyPress(event: KeyboardEvent, jobId: number): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.viewJobDetails(jobId);
    }
  }

  trackByJobId(index: number, job: Job): number {
    return job.id;
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