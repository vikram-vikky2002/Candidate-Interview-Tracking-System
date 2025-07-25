using System;
using System.Collections.Generic;

namespace CITS_WebServices.Models;

public partial class Skill
{
    public int SkillId { get; set; }

    public string? SkillName { get; set; }

    public virtual ICollection<CandidateSkill> CandidateSkills { get; set; } = new List<CandidateSkill>();
}
