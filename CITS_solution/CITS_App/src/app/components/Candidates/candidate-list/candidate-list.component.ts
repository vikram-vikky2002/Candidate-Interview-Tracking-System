import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { Candidate } from 'src/app/models/Candidate/candidate';
import { CandidateService } from 'src/app/services/Candidate/candidate.service';
import { SkillsService } from 'src/app/services/Skills/skills.service';

interface Column {
  key: string;
  label: string;
  visible: boolean;
}

interface CandidateView extends Candidate {
  skills?: string[];
  hasInterview: boolean;
  interviewId?: number;
}

@Component({
  selector: 'app-candidates-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.css'],
})
export class CandidatesListComponent implements OnInit {
  /* ---------- table data ---------- */
  candidates: any[] = [];
  filteredCandidates: any[] = [];

  /* ---------- filters ---------- */
  filterForm!: FormGroup;
  statusOptions = ['In Progress', 'Selected', 'Rejected'];

  /* ---------- column chooser ---------- */
  allColumns: Column[] = [
    { key: 'fullName', label: 'Full Name', visible: true },
    { key: 'email', label: 'Email', visible: true },
    { key: 'phone', label: 'Phone', visible: false },
    { key: 'appliedFor', label: 'Applied For', visible: true },
    { key: 'experienceYears', label: 'Experience (yrs)', visible: true },
    { key: 'matchPercentage', label: 'Match %', visible: false },
    { key: 'createdAt', label: 'Applied At', visible: false },
    { key: 'skills', label: 'Skills', visible: true },
    { key: 'status', label: 'Status', visible: true },
  ];
  displayedColumns: Column[] = this.allColumns.filter((c) => c.visible);

  /* ---------- modal state ---------- */
  showDialog = false;
  selectedCandidate?: any;
  editInterview = false;

  constructor(
    private candidateSrv: CandidateService,
    private skillsSrv: SkillsService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.buildFilterForm();
    this.fetchCandidates();
  }

  /* ========== BUILD FORM ========== */
  private buildFilterForm() {
    this.filterForm = this.fb.group({
      name: [''],
      status: [''],
      job: [''],
    });
  }

  /* ========== LOAD DATA ========== */
  private fetchCandidates() {
    this.candidateSrv.getAllCandidates().subscribe((cand) => {
      console.log(cand);
      for (let i = 0; i < cand.length; i++) {
        cand[i].matchPercentage < 1 ? cand[i].matchPercentage *= 100 : cand[i].matchPercentage;
      }
      const skillCalls = cand.map((c) =>
        this.skillsSrv.getSkillsByCandidateId(c.candidateId)
      );
      forkJoin(skillCalls).subscribe((skillArrays) => {
        this.candidates = cand.map((c, idx) => ({
          ...c,
          skills: skillArrays[idx].map((s: any) => s.skillName),
          hasInterview: !!c.CurrentStageId && c.CurrentStageId > 1,
        }));
        this.filteredCandidates = [...this.candidates];
      });
    });
  }

  /* ========== FILTERS ========== */
  applyFilters() {
    const { name, status, job } = this.filterForm.value;
    this.filteredCandidates = this.candidates.filter((c) => {
      const nm = (c.fullName || '').toLowerCase();
      const jb = (c.appliedFor || '').toLowerCase();
      return (
        (!name || nm.includes(name.toLowerCase())) &&
        (!status || c.status === status) &&
        (!job || jb.includes(job.toLowerCase()))
      );
    });
  }

  resetFilters() {
    this.filterForm.reset();
    this.filteredCandidates = [...this.candidates];
  }

  /* ========== COLUMN CHOOSER ========== */
  updateDisplayedColumns() {
    this.displayedColumns = this.allColumns.filter((c) => c.visible);
  }

  /* ========== STATUS COLOR ========== */
  statusClass(status: string) {
    switch (status) {
      case 'Selected':
        return 'status-selected';
      case 'Rejected':
        return 'status-rejected';
      default:
        return 'status-inprogress';
    }
  }

  /* ========== ACTIONS ========== */
  viewCandidate(c: any) {
    // route or open details modal as you prefer
    console.log('View candidate', c.candidateId);
  }

  openScheduleDialog(c: any, edit = false) {
    this.selectedCandidate = c;
    this.editInterview = edit;
    this.showDialog = true;
  }

  closeDialog(refresh = false) {
    this.showDialog = false;
    if (refresh) this.fetchCandidates();
  }
}
