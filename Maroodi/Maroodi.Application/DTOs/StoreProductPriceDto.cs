using System;

namespace Maroodi.Application.DTOs
{
    public class StoreProductPriceDto
    {
        public int Id { get; set; }
        public int StoreProductId { get; set; }
        public int StoreId { get; set; }
        public decimal Price { get; set; }
        public StatusDto? Status { get; set; }
        public int CreatedBy { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}