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
        public InterviewRepository Repository { get; set; }
        public InterviewStagesRepository _InterviewStagesRepository { get; set; }
        private readonly InterviewRepository Repository;
        private readonly CandidateRepository _repository = new CandidateRepository();
        private readonly IEmailService _emailService;

        public InterviewController(IEmailService emailService)
        {
            Repository = new InterviewRepository();
            _emailService = emailService;
            Repository = interviewRepository;
            _InterviewStagesRepository = new InterviewStagesRepository();
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
        public IActionResult GetInterviewStageName(int stageId)
        {
            var result = _InterviewStagesRepository.GetStageNameFromId(stageId);
            if(result == null)
                return NotFound();

            var res = new
            {
                name = result
            };
            return Ok(res);
        }

        [HttpGet]
        public ActionResult<List<Interview>> GetByInterviewer(int interviewerId)
        {
            var result = Repository.GetInterviewsByInterviewer(interviewerId);
            if (result == null) 
                return NotFound();

            return Ok(result);
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
        public IActionResult Schedule([FromBody] Models.Interview interview)
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
