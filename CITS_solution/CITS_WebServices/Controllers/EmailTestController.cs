using Microsoft.AspNetCore.Mvc;
using CITS_WebServices.Services;

namespace CITS_WebServices.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmailTestController : ControllerBase
    {
        private readonly IEmailService _emailService;

        public EmailTestController(IEmailService emailService)
        {
            _emailService = emailService;
        }

        [HttpGet("SendTestEmail")]
        public async Task<IActionResult> SendTestEmail()
        {
            try
            {
                await _emailService.SendEmailAsync(
                    "Pragadeswaranofficial@gmail.com",      // ← Replace this with your real email
                    "Test Email from CITS",
                    "<h3>This is a test email from CITS Web API.</h3><p>If you're reading this, it works!</p>"
                );

                return Ok("Test email sent successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Email failed: {ex.Message}");
            }
        }
    }
}
