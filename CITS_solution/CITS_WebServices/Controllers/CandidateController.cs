using CITS_DataAccessLayer;
using CITS_DataAccessLayer.Models;
using CITS_WebServices.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CITS_WebServices.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CandidateController : ControllerBase
    {
        private readonly CandidateRepository _repository;
        private readonly IEmailService _emailService;
        private readonly SkillsRepository _skillsRepository;

        public CandidateController(IEmailService emailService)
        {
            _repository = new CandidateRepository();
            _skillsRepository = new SkillsRepository();
            _emailService = emailService;
        }

        //GetAllCandidates
        [HttpGet]
        public IActionResult GetAllCandidates()
        {
            try
            {
                var candidates = _repository.GetAllCandidates();
                if (candidates == null || candidates.Count == 0)
                {
                    return NotFound("No candidates found.");
                }
                return Ok(candidates);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }
        //GetCandidateById
        [HttpGet("{candidateId}")]
        public IActionResult GetCandidateById(int candidateId)
        {
            try
            {
                var candidate = _repository.GetCandidateById(candidateId);
                if (candidate == null)
                {
                    return NotFound("Candidate not found.");
                }
                return Ok(candidate);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }

        [HttpGet("skills/{candidateId}")]
        public IActionResult GetSkillsByCandidate(int candidateId)
        {
            try
            {
                var skills = _skillsRepository.GetSkillsByCandidateId(candidateId);
                if(skills == null)
                {
                    return NotFound("No Skills found.");
                }

                return Ok(skills);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }

        //AddCandidate
        [HttpPost]
        public async Task<IActionResult> AddCandidate(Models.Candidate candidate)
        {
            if (candidate == null)
            {
                return BadRequest("Candidate data is null.");
            }
            try
            {
                CITS_DataAccessLayer.Models.Candidate newCandidate = new CITS_DataAccessLayer.Models.Candidate
                {
                    FullName = candidate.FullName,
                    Email = candidate.Email,
                    Phone = candidate.Phone,
                    //ResumeLink = candidate.ResumeLink,
                    Status = candidate.Status,
                    ExperienceYears = candidate.ExperienceYears,
                    MatchPercentage = candidate.MatchPercentage,
                    Summary = candidate.Summary,
                    CurrentStageId = 1,
                    AppliedFor = candidate.AppliedFor,
                    CreatedAt = DateTime.Now
                };

                var result = _repository.AddCandidate(newCandidate);

                if (result != -99)
                {
                    candidate.CandidateId = result;
                    await _emailService.SendEmailAsync(
                            candidate.Email,
                            "Application Received",
                            $"Dear {candidate.FullName},<br/>Thank you for applying for {candidate.AppliedFor}. We will contact you soon."
                        );

                    return CreatedAtAction(nameof(GetCandidateById), new { candidateId = candidate.CandidateId }, candidate);
                }
                return BadRequest("Failed to add candidate.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }
        //UpdateCandidate
        [HttpPut]
        public IActionResult UpdateCandidate(Candidate candidate)
        {
            bool result = false;
            try
            {
                CITS_DataAccessLayer.Models.Candidate newCandidate = new CITS_DataAccessLayer.Models.Candidate
                {
                    FullName = candidate.FullName,
                    Email = candidate.Email,
                    Phone = candidate.Phone,
                    Status = candidate.Status,
                    CreatedAt = DateTime.Now
                };
                result = _repository.UpdateCandidate(newCandidate);
                if (result)
                {
                    return Ok("Candidate updated successfully.");
                }
                return BadRequest("Failed to update candidate.");
            }
            catch (Exception ex)
            {
                result = false;
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        //DeleteCandidate
        [HttpDelete("{candidateId}")]
        public IActionResult DeleteCandidate(int candidateId)
        {
            try
            {
                var result = _repository.DeleteCandidate(candidateId);
                if (result)
                {
                    return Ok("Candidate deleted successfully.");
                }
                return NotFound("Candidate not found.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }
        //GetCandidatesByStatus
        [HttpGet("GetCandidatesByStatus/{status}")]
        public IActionResult GetCandidatesByStatus(string status)
        {
            try
            {
                var candidates = _repository.GetCandidatesByStatus(status);
                if (candidates == null || candidates.Count == 0)
                {
                    return NotFound("No candidates found with the specified status.");
                }
                return Ok(candidates);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }

        public class UpdateDTO
        {
            public int candidateId { get; set; }
            public string status { get; set; }
        }

        [HttpPut("status")]
        public IActionResult UpdateCandidate([FromBody] UpdateDTO data)
        {
            bool result = false;
            try
            {
                result = _repository.UpdateCandidateStatus(data.candidateId, data.status);
                if (result)
                {
                    return Ok(new { message = "Status updated successfully" });
                }
                return BadRequest(new { message = "Failed to update candidate." });
            }
            catch (Exception ex)
            {
                result = false;
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
