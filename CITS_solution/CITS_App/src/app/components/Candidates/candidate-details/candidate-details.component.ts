import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CandidateService } from '../../../services/Candidate/candidate.service';

export interface CandidateDetails {
  candidateId: number;
  fullName: string;
  email: string;
  phone: string;
  resumeLink: string;
  experienceYears: number;
  matchPercentage: number;
  summary: string;
  status: string;
  appliedFor: string;
  createdAt: Date;
  education: Education[];
  skills: string[];
  interviewStages: any[];
}

export interface Education {
  degree: string;
  institute: string;
  year: string;
}

export interface InterviewStage {
  stageName: string;
  interviewerName: string;
  scheduledDateTime: Date;
  interviewMode: string;
  status: string;
  evaluations: Evaluation[];
}

export interface Evaluation {
  evaluationType: string;
  score: number;
  feedback: string;
  evaluatedAt: Date;
}

@Component({
  selector: 'app-candidate-details',
  templateUrl: './candidate-details.component.html',
  styleUrls: ['./candidate-details.component.css']
})
export class CandidateDetailsComponent implements OnInit {
  candidate: CandidateDetails | null = null;
  loading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private candidateService: CandidateService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loadCandidateDetails(+id);
      }
    });
  }

  loadCandidateDetails(id: number): void {
    this.candidateService.getCandidateById(id).subscribe({
      next: (data) => {
        this.candidate = data;
        this.candidate!.skills = [];
        this.candidate!.education = [];
        // this.candidate!.interviewStages.forEach((interview: any) => {
        //   console.log(interview);
        //   // this.candidateService.getEvaluationByInterviewId(interview.interviewId).subscribe({
        //   //   next: (evalData) => {
        //   //     interview.evaluations = evalData;
        //   //   },
        //   //   error: (error) => {
        //   //     this.error = 'Failed to load evaluations';
        //   //   }
        //   // });
        // });
        this.loadSkills(id);
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load candidate details';
        this.loading = false;
      }
    });
  }

  loadSkills(id: number): void {
    this.candidateService.getSkillsByCandidateId(id).subscribe({
      next: (data) => {
        data.forEach((skill: any) => {
          this.candidate!.skills.push(skill.skillName);
        });

        this.loadEducation(id);
      },
      error: (error) => {
        this.error = 'Failed to load candidate skills';
      }
    });
  }

  loadEducation(id: number): void {
    this.candidateService.getEducationByCandidateId(id).subscribe({
      next: (data) => {
        this.candidate!.education = data;
        this.loadInterviews(id);
      },
      error: (error) => {
        this.error = 'Failed to load candidate education';
      }
    });
  }

  loadInterviews(id: number): void {
    this.candidateService.getInterviewByCandidateId(id).subscribe({
      next: (data) => {
        this.candidate!.interviewStages = [];
        
        this.candidate!.interviewStages = data;
        console.log(this.candidate);
        this.candidate!.interviewStages.forEach((interview: any, index: number) => {

          this.candidateService.getInterviewStage(interview.stageId).subscribe({
            next: (stageName: any) => {
              console.log('Stage name response:', stageName);
              this.candidate!.interviewStages[index].stage = stageName.name;
              console.log(this.candidate!.interviewStages[index]);
            },
            error: (error) => {
              this.error = 'Failed to load interview stage name';
            }
          });

          this.candidateService.getInterviewerName(interview.interviewerId).subscribe({
            next: (interviewerName: any) => {
              console.log('Interviewer name response:', interviewerName);
              this.candidate!.interviewStages[index].interviewer = interviewerName.name;
              // console.log(this.candidate!.interviewStages[index]);
            },
            error: (error) => {
              this.error = 'Failed to load interviewer name';
            }
          });
          
          this.candidateService.getEvaluationByInterviewId(interview.interviewId).subscribe({
            next: (evalData) => {
              interview.evaluations.push(evalData);
            },
            error: (error) => {
              this.error = 'Failed to load evaluations';
            }
          });
        });
        console.log(this.candidate!.interviewStages);
      },
      error: (error) => {
        this.error = 'Failed to load candidate interviews';
      }
    });
  }


  updateStatus(status: 'Selected' | 'Rejected'): void {
    if (this.candidate) {
      console.log(this.candidate);
      this.candidateService.updateCandidateStatus(this.candidate.candidateId, status)
        .subscribe({
          next: () => {
            this.candidate!.status = status;
            alert(`Candidate ${status.toLowerCase()} successfully!`);
          },
          error: () => {
            alert('Failed to update status');
          }
        });
    }
  }

  goBack(): void {
    this.router.navigate(['/candidate-list']);
  }

  downloadResume(): void {
    if (this.candidate?.resumeLink) {
      window.open(this.candidate.resumeLink, '_blank');
    }
  }
}
