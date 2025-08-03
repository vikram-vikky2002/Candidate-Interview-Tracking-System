import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Job, ApplicationFormData } from '../../../models/JobPortal/job';
import { JobService } from '../../../services/JobPortal/job.service';

@Component({
  selector: 'app-job-application',
  templateUrl: './job-application.component.html',
  styleUrls: ['./job-application.component.css']
})
export class JobApplicationComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  
  job: Job | undefined;
  loading = true;
  isSubmitting = false;
  applicationForm!: FormGroup;
  uploadedFile: File | null = null;
  fileError = '';
  isDragOver = false;
  noExperience = false;
  jobId: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private jobService: JobService
  ) {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.loadJobDetails();
  }

  private initializeForm(): void {
    this.applicationForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      workExperience: this.formBuilder.array([this.createWorkExperienceGroup()]),
      degree: [''],
      school: [''],
      graduationYear: [''],
      technicalSkills: ['', Validators.required],
      yearsExperience: ['', Validators.required]
    });
  }

  toggleNoExperience(): void {
    this.noExperience = !this.noExperience;
  
    const workExperienceArray = this.applicationForm.get('workExperience') as FormArray;
  
    if (this.noExperience) {
      // Clear all work experience entries when "No Work Experience" is selected
      while (workExperienceArray.length !== 0) {
        workExperienceArray.removeAt(0);
      }
      this.disableWorkExperienceValidation();
    } else {
      // Add back one empty work experience group when toggled back
      if (workExperienceArray.length === 0) {
        workExperienceArray.push(this.createWorkExperienceGroup());
      }
      this.enableWorkExperienceValidation();
    }
  }

  private disableWorkExperienceValidation(): void {
    const workExpArray = this.applicationForm.get('workExperience') as FormArray;
    
    // Clear validators from the entire FormArray
    workExpArray.clearValidators();
    
    // Also clear validators for each FormGroup inside (if any exist)
    workExpArray.controls.forEach(group => {
      group.clearValidators();
      Object.values((group as FormGroup).controls).forEach(control => {
        control.clearValidators();
        control.updateValueAndValidity({ onlySelf: true });
      });
      group.updateValueAndValidity({ onlySelf: true });
    });
  
    workExpArray.updateValueAndValidity();
  }
  
  // Call this method when toggling back to "Has Experience"
  private enableWorkExperienceValidation(): void {
    const workExpArray = this.applicationForm.get('workExperience') as FormArray;
    
    // Set required validator on the FormArray itself (optional)
    workExpArray.setValidators(Validators.required);
  
    // Restore validators for each FormGroup and controls inside
    workExpArray.controls.forEach((group) => {
      group.setValidators(Validators.required);
      const fg = group as FormGroup;
  
      fg.get('company')?.setValidators(Validators.required);
      fg.get('jobTitle')?.setValidators(Validators.required);
      fg.get('startDate')?.setValidators(Validators.required);
      // endDate is optional, so no validator
      fg.get('responsibilities')?.setValidators(Validators.required);
      // isCurrentJob is a boolean checkbox, typically no validator
      
      // Update validity for all controls
      Object.values(fg.controls).forEach(control => {
        control.updateValueAndValidity({ onlySelf: true });
      });
  
      group.updateValueAndValidity({ onlySelf: true });
    });
  
    workExpArray.updateValueAndValidity();
  }

  private createWorkExperienceGroup(): FormGroup {
    return this.formBuilder.group({
      company: ['', Validators.required],
      jobTitle: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: [''],
      responsibilities: ['', Validators.required],
      isCurrentJob: [false]
    });
  }

  private loadJobDetails(): void {
    const jobId = Number(this.route.snapshot.paramMap.get('id'));
    
    if (jobId) {
      this.job = this.jobService.getJobById(jobId);
      this.jobId = jobId;
      this.loading = false;
      
      if (!this.job) {
        this.router.navigate(['/']);
      }
    } else {
      this.loading = false;
      this.router.navigate(['/']);
    }
  }

  get workExperienceControls(): AbstractControl[] {
    return (this.applicationForm.get('workExperience') as FormArray).controls;
  }

  addWorkExperience(): void {
    const workExperienceArray = this.applicationForm.get('workExperience') as FormArray;
    workExperienceArray.push(this.createWorkExperienceGroup());
  }

  removeWorkExperience(index: number): void {
    const workExperienceArray = this.applicationForm.get('workExperience') as FormArray;
    if (workExperienceArray.length > 1) {
      workExperienceArray.removeAt(index);
    }
  }

  getWorkExperienceControl(index: number, controlName: string): AbstractControl | null {
    const workExperienceArray = this.applicationForm.get('workExperience') as FormArray;
    const workExperienceGroup = workExperienceArray.at(index) as FormGroup;
    return workExperienceGroup.get(controlName);
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.applicationForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  isFieldInvalidInArray(arrayName: string, index: number, fieldName: string): boolean {
    const array = this.applicationForm.get(arrayName) as FormArray;
    const group = array.at(index) as FormGroup;
    const field = group.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  // File upload methods
  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.handleFileSelect(input.files[0]);
    }
  }

  onDragEnter(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = true;
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;
  }

  onFileDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;
    
    const files = event.dataTransfer?.files;
    if (files && files[0]) {
      this.handleFileSelect(files[0]);
    }
  }

  private handleFileSelect(file: File): void {
    // Validate file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      this.fileError = 'Please upload a PDF, DOC, or DOCX file.';
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      this.fileError = 'File size must be less than 5MB.';
      return;
    }

    this.uploadedFile = file;
    this.fileError = '';
  }

  removeFile(): void {
    this.uploadedFile = null;
    this.fileInput.nativeElement.value = '';
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  onSubmit(): void {
    if (this.applicationForm.valid && this.uploadedFile) {
      this.isSubmitting = true;
      
      const formData = this.collectFormData();
      
      // Submit application
      this.jobService.submitApplication(formData, this.jobId);
      
      // Reset submitting state after service handles submission
      setTimeout(() => {
        this.isSubmitting = false;
      }, 4000);
    } else {
      // Mark all fields as touched to show validation errors
      this.markFormGroupTouched(this.applicationForm);
      
      if (!this.uploadedFile) {
        this.fileError = 'Please upload your resume.';
      }
    }
  }

  private collectFormData(): ApplicationFormData {
    const formValue = this.applicationForm.value;
    
    return {
      fullName: formValue.fullName,
      email: formValue.email,
      phone: formValue.phone,
      degree: formValue.degree,
      school: formValue.school,
      graduationYear: formValue.graduationYear,
      technicalSkills: formValue.technicalSkills,
      yearsExperience: formValue.yearsExperience,
      resumeUploaded: this.uploadedFile ? this.uploadedFile : null,
      workExperience: this.noExperience ? [] : formValue.workExperience,
    };
  }

  private markFormGroupTouched(formGroup: FormGroup | FormArray): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      if (control instanceof FormGroup || control instanceof FormArray) {
        this.markFormGroupTouched(control);
      } else {
        control?.markAsTouched();
      }
    });
  }

  goBack(): void {
    this.location.back();
  }
}