using System;
using System.Collections.Generic;

namespace CITS_DataAccessLayer.Models;

public partial class Education
{
    public int EducationId { get; set; }

    public int? CandidateId { get; set; }

    public string? Degree { get; set; }

    public string? Institute { get; set; }

    public string? Year { get; set; }

    public virtual Candidate? Candidate { get; set; }
}
