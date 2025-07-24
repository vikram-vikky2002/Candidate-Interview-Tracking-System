using System;
using System.Collections.Generic;

namespace CITS_DataAccessLayer.Models;

public partial class InterviewStage
{
    public int StageId { get; set; }

    public string StageName { get; set; } = null!;

    public virtual ICollection<Candidate> Candidates { get; set; } = new List<Candidate>();

    public virtual ICollection<Interview> Interviews { get; set; } = new List<Interview>();
}
