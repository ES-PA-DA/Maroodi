using System;

namespace Maroodi.Application.DTOs
{
    public class ProductDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public decimal Amount { get; set; }
        public UnitDto? Unit { get; set; }
        public BrandDto? Brand { get; set; }
        public StatusDto? Status { get; set; }
        public int CreatedBy { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}