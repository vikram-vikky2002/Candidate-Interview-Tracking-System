using CITS_DataAccessLayer;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CITS_WebServices.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InterviewStageController : ControllerBase
    {
        public InterviewStagesRepository Repository { get; set; }

        public InterviewStageController()
        {
            Repository = new InterviewStagesRepository();
        }

        [HttpGet]
        public IActionResult GetAllStages()
        {
            try
            {
                var response = Repository.GetAllInterviewStages();
                List<Models.InterviewStage> result = [];
                foreach (var item in response)
                {
                    Models.InterviewStage stage = new Models.InterviewStage();
                    stage.StageName = item.StageName;
                    stage.StageId = item.StageId;

                    result.Add(stage);
                }
                if (result == null)
                    return NotFound();
                else
                    return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Failed to fetch interview stages, Error : " + ex.Message);
            }
        }
    }
}
