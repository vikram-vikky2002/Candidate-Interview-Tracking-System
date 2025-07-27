using CITS_DataAccessLayer.Models;

public class SkillsRepository
{
    public CitsdbContext _context { get; set; }

    public SkillsRepository()
    {
        _context = new CitsdbContext();
    }

    public List<Skill> GetAllSkills()
    {
        return _context.Skills.ToList();
    }

    public Skill AddSkill(string skillName)
    {
        var existing = _context.Skills.FirstOrDefault(s => s.SkillName == skillName);
        if (existing != null)
            return existing;

        var skill = new Skill { SkillName = skillName };
        _context.Skills.Add(skill);
        _context.SaveChanges();
        return skill;
    }

    public bool AssignSkillToCandidate(int? candidateId, int? skillId)
    {
        if (!_context.CandidateSkills.Any(cs => cs.CandidateId == candidateId && cs.SkillId == skillId))
        {
            _context.CandidateSkills.Add(new CandidateSkill
            {
                CandidateId = candidateId,
                SkillId = skillId
            });
            _context.SaveChanges();
            return true;
        }
        return false;
    }

    public bool RemoveSkillFromCandidate(int candidateId, int skillId)
    {
        var entry = _context.CandidateSkills
            .FirstOrDefault(cs => cs.CandidateId == candidateId && cs.SkillId == skillId);

        if (entry != null)
        {
            _context.CandidateSkills.Remove(entry);
            _context.SaveChanges();
            return true;
        }
        return false;
    }

    public List<Skill> GetSkillsByCandidateId(int candidateId)
    {
        return _context.CandidateSkills
            .Where(cs => cs.CandidateId == candidateId)
            .Select(cs => cs.Skill)
            .ToList();
    }
}
