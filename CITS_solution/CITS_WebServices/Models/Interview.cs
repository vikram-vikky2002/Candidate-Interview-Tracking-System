using System;
using System.Collections.Generic;

namespace CITS_WebServices.Models;

public partial class Interview
{
    public int InterviewId { get; set; }

    public int CandidateId { get; set; }

    public DateTime? ScheduledDateTime { get; set; }

    public string InterviewMode { get; set; } = null!;

    public int InterviewerId { get; set; }

    public int StageId { get; set; }

    public string Status { get; set; } = null!;
    public string meetingLink { get; set; } = null!;
}
