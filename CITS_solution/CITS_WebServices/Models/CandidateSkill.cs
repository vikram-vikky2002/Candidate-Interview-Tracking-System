using System;
using System.Collections.Generic;

namespace CITS_WebServices.Models;

public partial class CandidateSkill
{
    public int Id { get; set; }

    public int? CandidateId { get; set; }

    public int? SkillId { get; set; }

    public virtual Candidate? Candidate { get; set; }

    public virtual Skill? Skill { get; set; }
}
