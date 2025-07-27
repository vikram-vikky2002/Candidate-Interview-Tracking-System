using CITS_DataAccessLayer;
using CITS_DataAccessLayer.Models;
using CITS_WebServices.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CITS_WebServices.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EvaluationController : ControllerBase
    {
        public EvalutionRepository _repository { get; set; }
        public EvaluationController()
        {
            _repository = new EvalutionRepository();
        }
        //Get Evaluations by CandidateId
        [HttpGet("GetEvaluationsByCandidateId/{candidateId}")]
        public IActionResult GetEvaluationsByCandidateId(int candidateId)
        {
            try
            {
                var evaluations = _repository.GetEvaluationsByCandidateId(candidateId);
                if (evaluations == null || evaluations.Count == 0)
                {
                    return NotFound("No evaluations found for the given candidate ID.");
                }
                return Ok(evaluations);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }
        //Get Evaluations by InterviewerId
        [HttpGet("GetEvaluationsByInterviewerId/{interviewerId}")]
        public IActionResult GetEvaluationsByInterviewerId(int interviewerId)
        {
            try
            {
                var evaluations = _repository.GetEvaluationsByInterviewerId(interviewerId);
                if (evaluations == null || evaluations.Count == 0)
                {
                    return NotFound("No evaluations found for the given interviewer ID.");
                }
                return Ok(evaluations);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }
        //Add Evaluation
        [HttpPost("AddEvaluation")]
        public IActionResult AddEvaluation(Models.Evaluation evaluation)
        {
            if (evaluation == null)
            {
                return BadRequest("Evaluation data is null.");
            }
            try
            {
                CITS_DataAccessLayer.Models.Evaluation newEvaluation = new CITS_DataAccessLayer.Models.Evaluation
                {
                    CandidateId = evaluation.CandidateId,
                    InterviewId = evaluation.InterviewId,
                    Score = evaluation.Score,
                    Feedback = evaluation.Feedback,
                    EvaluatedAt = DateTime.Now
                };

                var result = _repository.AddEvaluation(newEvaluation);
                if (result)
                {
                    return Ok("Evaluation added successfully.");
                }
                else
                {
                    return StatusCode(500, "Failed to add evaluation.");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }
    }
}
