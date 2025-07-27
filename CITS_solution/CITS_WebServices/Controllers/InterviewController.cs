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
        public ActionResult<List<Interview>> GetAllInterviews()
        {
            var result = Repository.GetAllInterviews();
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
        public IActionResult Schedule([FromBody] Models.Interview interview)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    Interview interviewObj = new Interview();
                    interviewObj.CandidateId = interview.CandidateId;
                    interviewObj.ScheduledDateTime = interview.ScheduledDateTime;
                    interviewObj.InterviewMode = interview.InterviewMode;
                    interviewObj.InterviewerId = interview.InterviewerId;
                    interviewObj.StageId = interview.StageId;
                    interviewObj.Status = interview.Status;

                    bool isScheduled = Repository.ScheduleInterview(interviewObj);
                    
                    if (isScheduled)
                        return Ok("Interview scheduled successfully");

                    return BadRequest("Interview unable to schedule..");
                }

                return BadRequest("Invalid input model");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Failed to schedule interview, Error : " + ex.Message);
            }
        }

        [HttpPost]
        public IActionResult UpdateStatus(int interviewId, string status)
        {
            try
            {
                bool isUpdated = Repository.UpdateInterviewStatus(interviewId, status);

                if (isUpdated)
                    return Ok("Status updated successfully");

                return BadRequest("Interview unable to update..");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Failed to update interview, Error : " + ex.Message);
            }
        }
    }
}
