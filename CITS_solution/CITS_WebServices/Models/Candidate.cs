using System;
using System.Collections.Generic;

namespace CITS_WebServices.Models;

public partial class Candidate
{
    public int CandidateId { get; set; }

    public string? FullName { get; set; }

    public string? Email { get; set; }

    public string? Phone { get; set; }

    public string? ResumeLink { get; set; }

    public int? ExperienceYears { get; set; }

    public double? MatchPercentage { get; set; }

    public string? Summary { get; set; }

    public int? CurrentStageId { get; set; }

    public string Status { get; set; } = null!;

    public string? AppliedFor { get; set; }

    public DateTime? CreatedAt { get; set; }

    public virtual ICollection<CandidateSkill> CandidateSkills { get; set; } = new List<CandidateSkill>();

    public virtual InterviewStage? CurrentStage { get; set; }

    public virtual ICollection<Education> Educations { get; set; } = new List<Education>();

    public virtual ICollection<Evaluation> Evaluations { get; set; } = new List<Evaluation>();

    public virtual ICollection<Interview> Interviews { get; set; } = new List<Interview>();
}
