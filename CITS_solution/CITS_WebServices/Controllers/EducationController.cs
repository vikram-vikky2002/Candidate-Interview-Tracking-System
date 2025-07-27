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
        public IActionResult AddEducation([FromBody] Models.Education education)
        {
            try
            {
                if(ModelState.IsValid) 
                {
                    Education educationObj = new Education();
                    educationObj.CandidateId = education.CandidateId;
                    educationObj.Degree = education.Degree;
                    educationObj.Institute = education.Institute;
                    educationObj.Year = education.Year;

                    var created = _repository.AddEducation(educationObj);

                    // Return 201 Created with the created record
                    return CreatedAtAction(nameof(GetEducationByCandidateId),
                        new { candidateId = created.CandidateId }, created);
                }
                else
                {
                    return BadRequest("Invalid input");
                }
                
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
