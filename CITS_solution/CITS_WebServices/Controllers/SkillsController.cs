using Microsoft.AspNetCore.Mvc;
using CITS_WebServices.Models;
[ApiController]
[Route("api/[controller]")]
public class SkillsController : ControllerBase
{
    private readonly SkillsRepository _repository;

    public SkillsController()
    {
        _repository = new SkillsRepository();
    }

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

    [HttpPost("add")]
    public IActionResult AddSkill([FromBody] Skill skill)
    {
        try
        {
            var addedSkill = _repository.AddSkill(skill.SkillName);
            return Ok(new
            {
                message = "Skill added successfully.",
                skill = addedSkill
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Error adding skill: " + ex.Message);
        }
    }
    // ✅ POST: api/skills/assign (data from body)
    [HttpPost("assign")]
    public IActionResult AssignSkillToCandidate([FromBody] CandidateSkill skillData)
    {
        try
        {
            var success = _repository.AssignSkillToCandidate(skillData.CandidateId, skillData.SkillId);
            if (success)
                return Ok(new { message = "Skill assigned to candidate successfully." });
            else
                return Conflict("Skill already assigned to candidate.");
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Error assigning skill: " + ex.Message);
        }
    }
    [HttpDelete("remove")]
    public IActionResult RemoveSkillFromCandidate([FromQuery] int candidateId, [FromQuery] int skillId)
    {
        try
        {
            var success = _repository.RemoveSkillFromCandidate(candidateId, skillId);
            if (success)
            {
                return Ok(new { message = "Skill removed from candidate successfully." });
            }
            else
            {
                return NotFound("Skill assignment not found for this candidate.");
            }
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Error removing skill: " + ex.Message);
        }
    }

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
