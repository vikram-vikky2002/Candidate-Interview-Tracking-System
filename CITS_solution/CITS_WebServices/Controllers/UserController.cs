using CITS_DataAccessLayer;
using CITS_WebServices.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CITS_WebServices.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : Controller
    {
        public UserRepository _repository { get; set; }
        public UserController()
        {
            _repository = new UserRepository();
        }
        [HttpGet("GetUserById/{userId}")]
        public IActionResult GetUserById(int userId)
        {
            try
            {
                var user = _repository.GetUserById(userId);
                if (user == null)
                {
                    return NotFound("User not found");
                }
                return Ok(user);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }
        [HttpGet("GetUserNameById/{userId}")]
        public IActionResult GetUserNameById(int userId)
        {
            try
            {
                var user = _repository.GetUserNameById(userId);
                if (user == null)
                {
                    return NotFound("User not found");
                }
                return Ok(new { name = user });
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }
        //GetUserByRole
        [HttpGet("GetUserByRole/{role}")]
        public IActionResult GetUserByRole(string role)
        {
            try
            {
                var user = _repository.GetUserByRole(role);
                if (user == null)
                {
                    return NotFound("User with specified role not found");
                }
                return Ok(user);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }
        //AuthenticateUser
        [HttpPost("AuthenticateUser")]
        public IActionResult AuthenticateUser([FromBody] LoginRequest credentials)
        {
            try
            {
                var user = _repository.AuthenticateUser(credentials.Email, credentials.Password);
                if (user == null)
                {
                    return Unauthorized("Invalid email or password");
                }

                return Ok(user); // returns UserLogin DTO with FullName, Email, RoleId
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }


        //AddUser
        [HttpPost("AddUser")]
        public IActionResult AddUser([FromBody] dynamic userData)
        {
            try
            {
                var user = new CITS_DataAccessLayer.Models.User
                {
                    FullName = userData.fullName,
                    Email = userData.email,
                    PasswordHash = userData.passwordHash,
                    RoleId = userData.roleId,
                    CreatedAt = DateTime.Now
                };
                bool isAdded = _repository.AddUser(user);
                if (isAdded)
                {
                    return Ok("User added successfully");
                }
                return BadRequest("Failed to add user");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }
        //UpdateUser
        [HttpPut("UpdateUser/{userId}")]
        public IActionResult UpdateUser(int userId, [FromBody] dynamic userData)
        {
            try
            {
                var user = _repository.GetUserById(userId);
                if (user == null)
                {
                    return NotFound("User not found");
                }
                user.FullName = userData.fullName ?? user.FullName;
                user.Email = userData.email ?? user.Email;
                user.PasswordHash = userData.passwordHash ?? user.PasswordHash;
                user.RoleId = userData.roleId ?? user.RoleId;
                bool isUpdated = _repository.UpdateUser(user);
                if (isUpdated)
                {
                    return Ok("User updated successfully");
                }
                return BadRequest("Failed to update user");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }
    }
}
