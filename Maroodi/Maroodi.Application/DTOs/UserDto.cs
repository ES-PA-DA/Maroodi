namespace Maroodi.Application.DTOs
{
    public class UserDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string? Picture { get; set; }
        public string Email { get; set; } = null!;
    }
}