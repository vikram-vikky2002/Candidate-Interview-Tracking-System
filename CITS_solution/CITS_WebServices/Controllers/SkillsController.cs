using Microsoft.AspNetCore.Mvc;
using CITS_DataAccessLayer;
using CITS_DataAccessLayer.Models;

namespace CITS_WebServices.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SkillsController : ControllerBase
    {
        private readonly SkillsRepository _repository;

        public SkillsController()
        {
            _repository = new SkillsRepository();
        }

        // GET: api/skills
        [HttpGet]
        public IActionResult GetAllSkills()
        {
            try
            {
                var skills = _repository.GetAllSkills();
                return Ok(skills);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Error retrieving skills: " + ex.Message);
            }
        }

        // POST: api/skills/add
        [HttpPost("add")]
        public IActionResult AddSkill([FromBody] string skillName)
        {
            try
            {
                _repository.AddSkill(skillName);
                return Ok("Skill added successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Error adding skill: " + ex.Message);
            }
        }

        // POST: api/skills/assign
        [HttpPost("assign")]
        public IActionResult AssignSkillToCandidate([FromBody] Models.CandidateSkill skillData)
        {
            try
            {
                _repository.AssignSkillToCandidate(skillData.CandidateId, skillData.SkillId);
                return Ok("Skill assigned to candidate successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Error assigning skill: " + ex.Message);
            }
        }

        // DELETE: api/skills/remove
        [HttpDelete("remove")]
        public IActionResult RemoveSkillFromCandidate([FromQuery] int candidateId, [FromQuery] int skillId)
        {
            try
            {
                _repository.RemoveSkillFromCandidate(candidateId, skillId);
                return Ok("Skill removed from candidate successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Error removing skill: " + ex.Message);
            }
        }

        // GET: api/skills/candidate/5
        [HttpGet("candidate/{candidateId}")]
        public IActionResult GetSkillsByCandidateId(int candidateId)
        {
            try
            {
                var skills = _repository.GetSkillsByCandidateId(candidateId);
                return Ok(skills);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Error retrieving candidate skills: " + ex.Message);
            }
        }
    }
}
