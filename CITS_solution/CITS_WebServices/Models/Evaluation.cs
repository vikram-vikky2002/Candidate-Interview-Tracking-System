using System;
using System.Collections.Generic;

namespace CITS_WebServices.Models;

public partial class Evaluation
{
    public int EvaluationId { get; set; }

    public int CandidateId { get; set; }

    public int InterviewId { get; set; }

    public string? EvaluationType { get; set; }

    public double? Score { get; set; }

    public string? Feedback { get; set; }

    public DateTime? EvaluatedAt { get; set; }

    public virtual Candidate Candidate { get; set; } = null!;

    public virtual Interview Interview { get; set; } = null!;
}
