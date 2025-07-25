using CITS_DataAccessLayer;
using CITS_DataAccessLayer.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CITS_WebServices.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class InterviewController : Controller
    {
        public InterviewRepository Repository { get; set; }

        public InterviewController(InterviewRepository interviewRepository)
        {
            Repository = interviewRepository;
        }

        [HttpGet]
        public ActionResult<List<Interview>> GetByCandidateId(int candidateId)
        {
            var result = Repository.GetInterviewsByCandidateId(candidateId);
            if (result == null) 
                return NotFound();

            return Ok(result);
        }

        [HttpGet]
        public ActionResult<List<Interview>> GetByInterviewer(int interviewerId)
        {
            var result = Repository.GetInterviewsByInterviewer(interviewerId);
            if (result == null) 
                return NotFound();

            return Ok(result);
        }

        [HttpGet]
        public ActionResult<List<Interview>> GetUpcoming()
        {
            var result = Repository.GetUpcomingInterviewsByDate(DateTime.Now);
            if (result == null) 
                return NotFound();

            return Ok(result);
        }

        [HttpPost]
        public IActionResult Schedule([FromBody] Interview interview)
        {
            bool isScheduled = Repository.ScheduleInterview(interview);
            if (isScheduled)
                return Ok("Interview scheduled successfully");

            return BadRequest("Failed to schedule interview");
        }

        [HttpPut]
        public IActionResult UpdateStatus(int interviewId, string status)
        {
            bool isUpdated = Repository.UpdateInterviewStatus(interviewId, status);
            if (isUpdated)
                return Ok("Status updated successfully");

            return BadRequest("Failed to update interview status");
        }
    }
}
