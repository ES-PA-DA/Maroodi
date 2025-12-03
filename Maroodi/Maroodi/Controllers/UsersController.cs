using Maroodi.Application.UseCases;
using Maroodi.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Maroodi.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {

        private readonly UserService _userService;

        public UsersController(UserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public IEnumerable<User> GetAllUsers()
        {
            return _userService.GetAllUsers();
        }


        [HttpGet("{id}")]
        public IActionResult GetUserById(int id)
        {
            User user = _userService.GetUserById(id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }
    }
}
