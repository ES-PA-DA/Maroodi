using Maroodi.Application.DTOs;
using Maroodi.Application.UseCases;
using Microsoft.AspNetCore.Mvc;

namespace Maroodi.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class StoreProductController : ControllerBase
    {

        private readonly StoreProductService _storeProductService;

        public StoreProductController(StoreProductService storeProductService)
        {
            _storeProductService = storeProductService;
        }

        [HttpGet]
        public IEnumerable<StoreProductDto> GetAllUsers()
        {
            return _storeProductService.GetAllStoreProducts();
        }


        [HttpGet("{id}")]
        public IActionResult GetUserById(int id)
        {
            StoreProduct user = _storeProductService.GetUserById(id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }
    }
}
