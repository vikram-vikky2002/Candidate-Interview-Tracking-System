using System;
using System.Collections.Generic;

namespace CITS_DataAccessLayer.Models;

public partial class Interview
{
    public int InterviewId { get; set; }

    public int CandidateId { get; set; }

    public DateTime? ScheduledDateTime { get; set; }

    public string InterviewMode { get; set; } = null!;

    public int InterviewerId { get; set; }

    public int StageId { get; set; }

    public string Status { get; set; } = null!;

    public virtual Candidate Candidate { get; set; } = null!;

    public virtual ICollection<Evaluation> Evaluations { get; set; } = new List<Evaluation>();

    public virtual User Interviewer { get; set; } = null!;

    public virtual InterviewStage Stage { get; set; } = null!;
}
