export interface Job {
    id: number;
    title: string;
    company: string;
    location: string;
    salary: string;
    jobType: string;
    experienceLevel: string;
    postedDate: string;
    description: string;
    requirements: string[];
    responsibilities: string[];
    benefits: string[];
    companyOverview: string;
  }
  
  export interface WorkExperience {
    company: string;
    jobTitle: string;
    startDate: string;
    endDate: string;
    responsibilities: string;
    isCurrentJob: boolean;
  }
  
  export interface ApplicationFormData {
    fullName: string;
    email: string;
    phone: string;
    degree: string;
    school: string;
    graduationYear: string;
    technicalSkills: string;
    yearsExperience: string;
    resumeUploaded: File | null;
    workExperience?: WorkExperience[];
  }
  
  export interface JobFilter {
    searchTitle: string;
    searchLocation: string;
    jobType: string;
    experienceLevel: string;
  }