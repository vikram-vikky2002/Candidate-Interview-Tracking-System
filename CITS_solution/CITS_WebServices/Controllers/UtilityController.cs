using Microsoft.AspNetCore.Mvc;
using CITS_DataAccessLayer;
using CITS_DataAccessLayer.Models;

namespace CITS_WebServices.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UtilityController : ControllerBase
    {
        private readonly UtilityRepository _repository;

        public UtilityController()
        {
            _repository = new UtilityRepository();
        }

        // GET: api/utility/dashboard
        [HttpGet("dashboard")]
        public IActionResult GetDashboardStats()
        {
            try
            {
                var stats = _repository.GetDashboardStats();
                return Ok(stats);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal error: {ex.Message}");
            }
        }

        // GET: api/utility/progress/3
        [HttpGet("progress/{candidateId}")]
        public IActionResult GetCandidateProgress(int candidateId)
        {
            try
            {
                var progress = _repository.GetCandidateProgress(candidateId);
                if (progress == null)
                    return NotFound("Candidate not found.");
                return Ok(progress);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal error: {ex.Message}");
            }
        }

        // GET: api/utility/search-interviews?from=2025-07-01&to=2025-07-30&interviewerEmail=a@b.com
        [HttpGet("search-interviews")]
        public IActionResult SearchInterviews([FromQuery] DateTime? from, [FromQuery] DateTime? to, [FromQuery] string interviewerEmail)
        {
            try
            {
                var interviews = _repository.SearchInterviews(from, to, interviewerEmail);
                return Ok(interviews);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal error: {ex.Message}");
            }
        }
    }
}
