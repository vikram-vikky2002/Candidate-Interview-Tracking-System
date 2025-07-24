using System;
using System.Collections.Generic;

namespace CITS_DataAccessLayer.Models;

public partial class Feedback
{
    public int FeedbackId { get; set; }

    public int InterviewId { get; set; }

    public int InterviewerId { get; set; }

    public string? Comments { get; set; }

    public int Rating { get; set; }

    public DateTime? SubmittedAt { get; set; }

    public virtual Interview Interview { get; set; } = null!;

    public virtual User Interviewer { get; set; } = null!;
}
