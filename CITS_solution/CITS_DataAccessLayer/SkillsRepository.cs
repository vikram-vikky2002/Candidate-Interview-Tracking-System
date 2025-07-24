using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CITS_DataAccessLayer.Models;

namespace CITS_DataAccessLayer
{
    public class SkillsRepository
    {
        public DbContext _context { get; set; }
        public SkillsRepository()
        {
            _context = new DbContext();
        }
        public List<Skill> GetAllSkills()
        {
            return _context.Skills.ToList();
        }

        // Add a new skill if not exists
        public void AddSkill(string skillName)
        {
            if (!_context.Skills.Any(s => s.SkillName == skillName))
            {
                var skill = new Skill { SkillName = skillName };
                _context.Skills.Add(skill);
                _context.SaveChanges();
            }
        }

        // Assign skill to candidate
        public void AssignSkillToCandidate(int candidateId, int skillId)
        {
            if (!_context.CandidateSkills.Any(cs => cs.CandidateId == candidateId && cs.SkillId == skillId))
            {
                _context.CandidateSkills.Add(new CandidateSkill
                {
                    CandidateId = candidateId,
                    SkillId = skillId
                });
                _context.SaveChanges();
            }
        }

        // Remove skill from candidate
        public void RemoveSkillFromCandidate(int candidateId, int skillId)
        {
            var entry = _context.CandidateSkills
                .FirstOrDefault(cs => cs.CandidateId == candidateId && cs.SkillId == skillId);
            if (entry != null)
            {
                _context.CandidateSkills.Remove(entry);
                _context.SaveChanges();
            }
        }

        // Get all skills assigned to a candidate
        public List<Skill> GetSkillsByCandidateId(int candidateId)
        {
            return _context.CandidateSkills
                .Where(cs => cs.CandidateId == candidateId)
                .Select(cs => cs.Skill)
                .ToList();
        }
    }
}
