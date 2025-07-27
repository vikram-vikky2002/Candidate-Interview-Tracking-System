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
    
}
