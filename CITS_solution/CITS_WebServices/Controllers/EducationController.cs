using Microsoft.AspNetCore.Mvc;
using CITS_DataAccessLayer;
using CITS_DataAccessLayer.Models;

namespace CITS_WebServices.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EducationController : ControllerBase
    {
        private readonly EducationRepository _repository;

        public EducationController()
        {
            _repository = new EducationRepository();
        }

        // GET: api/education/candidate/1
        [HttpGet("candidate/{candidateId}")]
        public IActionResult GetEducationByCandidateId(int candidateId)
        {
            try
            {
                var educationList = _repository.GetEducationByCandidateId(candidateId);
                return Ok(educationList);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal error: {ex.Message}");
            }
        }

        // POST: api/education/add
        [HttpPost("add")]
        public IActionResult AddEducation([FromBody] Education education)
        {
            try
            {
                var created = _repository.AddEducation(education);

                // Return 201 Created with the created record
                return CreatedAtAction(nameof(GetEducationByCandidateId),
                    new { candidateId = created.CandidateId }, created);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal error: {ex.Message}");
            }
        }

        // DELETE: api/education/delete/5
        [HttpDelete("delete/{educationId}")]
        public IActionResult DeleteEducation(int educationId)
        {
            try
            {
                var deleted = _repository.DeleteEducation(educationId);
                if (!deleted)
                    return NotFound($"Education record with ID {educationId} not found.");

                return Ok("Education deleted successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal error: {ex.Message}");
            }
        }
    }
}
