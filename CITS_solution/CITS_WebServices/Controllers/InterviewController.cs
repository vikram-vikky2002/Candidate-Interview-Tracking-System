using CITS_DataAccessLayer;
using CITS_DataAccessLayer.Models;
using CITS_WebServices.Models;
using CITS_WebServices.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CITS_WebServices.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class InterviewController : Controller
    {
        private readonly InterviewRepository Repository;
        private readonly CandidateRepository _repository = new CandidateRepository();
        private readonly IEmailService _emailService;

        public InterviewController(IEmailService emailService)
        {
            Repository = new InterviewRepository();
            _emailService = emailService;
        }


        [HttpGet]
        public ActionResult<List<Models.Interview>> GetByCandidateId(int candidateId)
        {
            var result = Repository.GetInterviewsByCandidateId(candidateId);
            if (result == null) 
                return NotFound();

            return Ok(result);
        }

[HttpGet]
public ActionResult<List<Models.Interview>> GetByInterviewer(int interviewerId)
{
    List<CITS_DataAccessLayer.Models.Interview> result = Repository.GetInterviewsByInterviewer(interviewerId);

    // ❗ Check null BEFORE Select
    if (result == null)
        return NotFound();

    List<Models.Interview> interviews = result.Select(i => new Models.Interview
    {
        InterviewId = i.InterviewId,
        CandidateId = i.CandidateId,
        ScheduledDateTime = i.ScheduledDateTime,
        InterviewMode = i.InterviewMode,
        InterviewerId = i.InterviewerId,
        StageId = i.StageId,
        Status = i.Status,
    }).ToList();

    return Ok(interviews);
}

        [HttpGet("{id}")]
        public IActionResult GetInterviewById(int id)
        {
            var interview = Repository.GetInterviewById(id);
            if (interview == null)
                return NotFound();

            return Ok(interview); // 👈 Not Ok([interview])
        }
        [HttpGet]
        public ActionResult<List<Models.Interview>> GetAllInterviews()
        {
            var result = Repository.GetAllInterviews();
            if (result == null)
                return NotFound();

            return Ok(result);
        }

        [HttpGet]
        public ActionResult<List<Models.Interview>> GetUpcoming()
        {
            var result = Repository.GetUpcomingInterviewsByDate(DateTime.Now);
            if (result == null) 
                return NotFound();

            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Schedule([FromBody] Models.Interview interview)
        {
            try
            {
                if (ModelState.IsValid)
                {
                   CITS_DataAccessLayer.Models. Interview interviewObj = new CITS_DataAccessLayer.Models.Interview();
                    interviewObj.CandidateId = interview.CandidateId;
                    interviewObj.ScheduledDateTime = interview.ScheduledDateTime;
                    interviewObj.InterviewMode = interview.InterviewMode;
                    interviewObj.InterviewerId = interview.InterviewerId;
                    interviewObj.StageId = interview.StageId;
                    interviewObj.Status = interview.Status;

                    bool isScheduled = Repository.ScheduleInterview(interviewObj);

                    if (isScheduled)
                    {
                        var candidate = _repository.GetCandidateById(interview.CandidateId);
                        await _emailService.SendEmailAsync(
                            candidate.Email,
                        "Interview Scheduled",
                            $"Dear {candidate.FullName},<br/>Your interview is scheduled on {interview.ScheduledDateTime:dddd, dd MMMM yyyy HH:mm}.<br/>Mode: {interview.InterviewMode}."
                        );

                        return Ok(new { message = "Interview scheduled successfully" });
                    }
                    return BadRequest(new { message = "Interview unable to schedule.." });
                }

                return BadRequest("Invalid input model");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Failed to schedule interview, Error : " + ex.Message);
            }
        }

        [HttpPut]
        public IActionResult UpdateStatus(int interviewId, string status)
        {
            try
            {
                bool isUpdated = Repository.UpdateInterviewStatus(interviewId, status);

                if (isUpdated)
                    return Ok(new { message = "Status updated successfully" });

                return BadRequest("Interview unable to update..");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Failed to update interview, Error : " + ex.Message);
            }
        }
    }
}
