import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, forkJoin, of } from 'rxjs';
import { catchError, concatMap, switchMap, tap } from 'rxjs/operators';
import { Job, JobFilter, ApplicationFormData } from '../../models/JobPortal/job';
import { HttpClient } from '@angular/common/http';
import { CandidateService } from '../Candidate/candidate.service';
import { Candidate } from 'src/app/models/Candidate/candidate';
import { Education } from 'src/app/models/Education/Education';
import { Skill } from 'src/app/models/Skills/Skills';
import { CandidateSkill } from 'src/app/models/Skills/CandidateSkill';

@Injectable({
  providedIn: 'root'
})

export class JobService {
  private applicationSubmittedSubject = new Subject<void>();
  public applicationSubmitted$ = this.applicationSubmittedSubject.asObservable();

  private jobsData: Job[] = [
    {
      id: 1,
      title: "Senior Software Engineer",
      company: "TechCorp Solutions",
      location: "San Francisco, CA",
      salary: "$120,000 - $180,000",
      jobType: "Full-time",
      experienceLevel: "Senior",
      postedDate: "2025-01-15",
      description: "We are seeking a talented Senior Software Engineer to join our dynamic development team. You will be responsible for designing, developing, and maintaining high-quality software applications that serve millions of users worldwide.",
      requirements: [
        "Bachelor's degree in Computer Science or related field",
        "5+ years of experience in software development",
        "Proficiency in JavaScript, TypeScript, and modern frameworks",
        "Experience with cloud platforms (AWS, Azure, GCP)",
        "Strong problem-solving and communication skills",
        "Experience with Agile development methodologies"
      ],
      responsibilities: [
        "Design and implement scalable software solutions",
        "Collaborate with cross-functional teams to deliver features",
        "Code review and mentoring junior developers",
        "Participate in architectural decisions and technical planning",
        "Maintain and improve existing codebase",
        "Stay up-to-date with latest technology trends"
      ],
      benefits: [
        "Competitive salary and equity package",
        "Comprehensive health, dental, and vision insurance",
        "401(k) with company matching",
        "Flexible work arrangements and remote options",
        "Professional development budget",
        "Unlimited PTO policy"
      ],
      companyOverview: "TechCorp Solutions is a leading technology company that develops innovative software solutions for enterprises worldwide. Founded in 2015, we've grown to over 500 employees and serve clients across various industries."
    },
    {
      id: 2,
      title: "Marketing Manager",
      company: "Digital Marketing Pro",
      location: "New York, NY",
      salary: "$80,000 - $120,000",
      jobType: "Full-time",
      experienceLevel: "Mid-level",
      postedDate: "2025-01-20",
      description: "Join our marketing team as a Marketing Manager where you'll lead digital marketing campaigns, analyze market trends, and drive brand awareness for our growing client base.",
      requirements: [
        "Bachelor's degree in Marketing, Business, or related field",
        "3+ years of digital marketing experience",
        "Proficiency in Google Analytics, AdWords, and social media platforms",
        "Strong analytical and project management skills",
        "Excellent written and verbal communication skills",
        "Experience with marketing automation tools"
      ],
      responsibilities: [
        "Develop and execute comprehensive marketing strategies",
        "Manage social media accounts and online presence",
        "Analyze campaign performance and ROI metrics",
        "Coordinate with sales team to generate qualified leads",
        "Create engaging content for various marketing channels",
        "Manage marketing budget and vendor relationships"
      ],
      benefits: [
        "Competitive salary with performance bonuses",
        "Health and wellness benefits package",
        "Professional development opportunities",
        "Flexible work schedule",
        "Creative and collaborative work environment",
        "Annual company retreats and team building events"
      ],
      companyOverview: "Digital Marketing Pro is a full-service digital marketing agency helping businesses grow their online presence. We work with clients ranging from startups to Fortune 500 companies."
    },
    {
      id: 3,
      title: "UX/UI Designer",
      company: "Creative Studios Inc",
      location: "Austin, TX",
      salary: "$70,000 - $100,000",
      jobType: "Full-time",
      experienceLevel: "Mid-level",
      postedDate: "2025-01-18",
      description: "We're looking for a creative UX/UI Designer to join our design team. You'll work on exciting projects ranging from web applications to mobile apps, creating intuitive and beautiful user experiences.",
      requirements: [
        "Bachelor's degree in Design, HCI, or related field",
        "3+ years of UX/UI design experience",
        "Proficiency in Figma, Adobe Creative Suite, and prototyping tools",
        "Strong portfolio demonstrating user-centered design",
        "Understanding of front-end development principles",
        "Experience with user research and usability testing"
      ],
      responsibilities: [
        "Create wireframes, prototypes, and high-fidelity designs",
        "Conduct user research and usability testing",
        "Collaborate with developers and product managers",
        "Maintain and evolve design systems",
        "Present design concepts to stakeholders",
        "Stay current with design trends and best practices"
      ],
      benefits: [
        "Competitive salary and creative freedom",
        "Top-tier design tools and equipment",
        "Health insurance and retirement plans",
        "Conference and workshop attendance budget",
        "Flexible PTO and sabbatical options",
        "Modern office space with design studio"
      ],
      companyOverview: "Creative Studios Inc is an award-winning design agency specializing in digital experiences. We've been creating innovative designs for over a decade, working with brands across industries."
    },
    {
      id: 4,
      title: "Data Analyst",
      company: "Analytics Hub",
      location: "Chicago, IL",
      salary: "$65,000 - $95,000",
      jobType: "Full-time",
      experienceLevel: "Entry-level",
      postedDate: "2025-01-22",
      description: "Join our data team as a Data Analyst where you'll work with large datasets to uncover insights that drive business decisions. Perfect opportunity for someone starting their career in data analytics.",
      requirements: [
        "Bachelor's degree in Statistics, Mathematics, or related field",
        "1-2 years of experience with data analysis",
        "Proficiency in SQL, Python, or R",
        "Experience with data visualization tools (Tableau, Power BI)",
        "Strong analytical and problem-solving skills",
        "Attention to detail and accuracy"
      ],
      responsibilities: [
        "Analyze large datasets to identify trends and patterns",
        "Create reports and dashboards for stakeholders",
        "Collaborate with teams to understand data requirements",
        "Perform statistical analysis and hypothesis testing",
        "Clean and validate data for accuracy",
        "Present findings to non-technical audiences"
      ],
      benefits: [
        "Competitive entry-level salary",
        "Comprehensive training and mentorship program",
        "Health and dental insurance",
        "401(k) with company matching",
        "Learning and development budget",
        "Hybrid work arrangements"
      ],
      companyOverview: "Analytics Hub is a data consulting firm that helps businesses make data-driven decisions. We work with clients across various industries to optimize their operations through advanced analytics."
    },
    {
      id: 5,
      title: "Product Manager",
      company: "Innovation Labs",
      location: "Seattle, WA",
      salary: "$110,000 - $150,000",
      jobType: "Full-time",
      experienceLevel: "Senior",
      postedDate: "2025-01-25",
      description: "Lead product strategy and development as a Product Manager at Innovation Labs. You'll work with cross-functional teams to bring innovative products to market.",
      requirements: [
        "Bachelor's degree in Business, Engineering, or related field",
        "5+ years of product management experience",
        "Experience with agile methodologies and product development",
        "Strong analytical and strategic thinking skills",
        "Excellent communication and leadership abilities",
        "Experience with product analytics and user research"
      ],
      responsibilities: [
        "Define product vision and roadmap",
        "Gather and prioritize product requirements",
        "Work with engineering teams to deliver features",
        "Analyze market trends and competitive landscape",
        "Coordinate product launches and go-to-market strategies",
        "Monitor product performance and user feedback"
      ],
      benefits: [
        "Competitive salary and equity compensation",
        "Comprehensive benefits package",
        "Flexible work arrangements",
        "Professional development opportunities",
        "Innovation time for personal projects",
        "Stock options and performance bonuses"
      ],
      companyOverview: "Innovation Labs is a product development company focused on creating cutting-edge solutions for emerging markets. We're known for our innovative approach and rapid product development cycles."
    },
    {
      id: 6,
      title: "Frontend Developer",
      company: "Web Solutions Co",
      location: "Remote",
      salary: "$75,000 - $110,000",
      jobType: "Full-time",
      experienceLevel: "Mid-level",
      postedDate: "2025-01-20",
      description: "Join our remote team as a Frontend Developer. Work on exciting web applications using modern technologies and frameworks while enjoying the flexibility of remote work.",
      requirements: [
        "Bachelor's degree in Computer Science or equivalent experience",
        "3+ years of frontend development experience",
        "Proficiency in React, Angular, or Vue.js",
        "Strong knowledge of HTML, CSS, and JavaScript",
        "Experience with responsive design and cross-browser compatibility",
        "Familiarity with version control systems (Git)"
      ],
      responsibilities: [
        "Develop responsive and interactive web applications",
        "Collaborate with designers to implement UI/UX designs",
        "Optimize applications for performance and scalability",
        "Write clean, maintainable, and testable code",
        "Participate in code reviews and technical discussions",
        "Stay updated with latest frontend technologies"
      ],
      benefits: [
        "100% remote work opportunity",
        "Competitive salary with annual raises",
        "Health insurance and wellness programs",
        "Home office setup allowance",
        "Flexible working hours",
        "Professional development budget"
      ],
      companyOverview: "Web Solutions Co is a remote-first company specializing in custom web development. We've been building high-quality web applications for clients worldwide for over 8 years."
    }
  ];

  private filteredJobsSubject = new BehaviorSubject<Job[]>(this.jobsData);
  public filteredJobs$ = this.filteredJobsSubject.asObservable();

  constructor(private _http: HttpClient, private candidateService: CandidateService) { }

  getAllJobs(): Job[] {
    return this.jobsData;
  }

  getJobById(id: number): Job | undefined {
    return this.jobsData.find(job => job.id === id);
  }

  filterJobs(filter: JobFilter): void {
    let filtered = this.jobsData.filter(job => {
      const matchesTitle = !filter.searchTitle || 
        job.title.toLowerCase().includes(filter.searchTitle.toLowerCase());
      
      const matchesLocation = !filter.searchLocation || 
        job.location.toLowerCase().includes(filter.searchLocation.toLowerCase());
      
      const matchesType = !filter.jobType || job.jobType === filter.jobType;
      
      const matchesExperience = !filter.experienceLevel || 
        job.experienceLevel === filter.experienceLevel;

      return matchesTitle && matchesLocation && matchesType && matchesExperience;
    });

    this.filteredJobsSubject.next(filtered);
  }

  submitApplication(applicationData: ApplicationFormData): void {
    console.log('Submitting application:', JSON.stringify(applicationData, null, 2));
  
    this.sendtoModel(
      applicationData.resumeUploaded!, 
      JSON.stringify(this.jobsData[0]), 
      JSON.stringify(applicationData)
    )
    .pipe(
      catchError((err) => {
        console.error('Error in sendtoModel:', err);
        return of(null); // handle error as needed
      }),
      switchMap(SuccessResponse => {
        if (!SuccessResponse) {
          throw new Error('Model response is null or failed');
        }

        console.log(SuccessResponse);
  
        const candidateData: Candidate = {
          CandidateId: 0,
          FullName: applicationData.fullName,
          Email: applicationData.email,
          Phone: applicationData.phone,
          ExperienceYears: SuccessResponse.data.experience_years,
          MatchPercentage: SuccessResponse.data.match_percentage,
          Summary: SuccessResponse.data.summary,
          CurrentStageId: 1,
          AppliedFor: this.jobsData[0].title,
          Status: "In Progress",
          CreatedAt: new Date()
        };

        console.log(candidateData);
  
        return this.candidateService.addCandidate(candidateData).pipe(
          catchError(err => {
            console.error('Error adding candidate:', err);
            return of(null);
          }),
          switchMap(SuccessResponse2 => {
            if (!SuccessResponse2) {
              throw new Error('Adding candidate failed');
            }

            console.log(SuccessResponse2);
  
            const educationData: Education = {
              CandidateId: SuccessResponse2.candidateId,
              Degree: SuccessResponse.data.education[0],
              Institute: SuccessResponse.data.education[1],
              Year: SuccessResponse.data.education[2]
            };

            console.log(educationData);
  
            return this.candidateService.addEducation(educationData).pipe(
              catchError(err => {
                console.error('Error adding education:', err);
                return of(null);
              }),
              switchMap(SuccessResponse3 => {
                if (!SuccessResponse3) {
                  throw new Error('Adding education failed');
                }

                console.log(SuccessResponse3);
  
                // For skills: add each skill, then assign skill to candidate
                const skillObservables = SuccessResponse.data.skills.map((skillName: string) => 
                  this.candidateService.addSkill({ skillName }).pipe(
                    catchError(err => {
                      console.error(`Error adding skill ${skillName}:`, err);
                      return of(null);
                    }),
                    switchMap(SuccessResponse4 => {
                      if (!SuccessResponse4) {
                        return of(null);
                      }

                      console.log(SuccessResponse4);

                      const candidateSkill: CandidateSkill = {
                        skillId: SuccessResponse4.skill.skillId,
                        candidateId: SuccessResponse2.candidateId
                      };

                      console.log(candidateSkill);

                      return this.candidateService.assignSkill(candidateSkill).pipe(
                        catchError(err => {
                          console.error('Error assigning skill:', err);
                          return of(null);
                        })
                      );
                    })
                  )
                );

                console.log(skillObservables);
  
                // Wait for all skill adds+assigns to complete
                return forkJoin(skillObservables);
              })
            );
          })
        );
      })
    )
    .subscribe({
      next: () => {
        console.log('Candidate and related data added successfully.');
        this.applicationSubmittedSubject.next();
      },
      error: err => {
        console.error('Submit application process failed:', err);
      }
    });
  }

  sendtoModel(file: File, job_description: string, other_details: string) : Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('job_description', job_description);
    formData.append('other_details', other_details);
    return this._http.post<any>(`https://localhost:5000/cits/resume/parse`, formData);
  }

  resetFilters(): void {
    this.filteredJobsSubject.next(this.jobsData);
  }
}