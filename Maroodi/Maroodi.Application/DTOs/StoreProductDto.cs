using System;
using System.Collections.Generic;

namespace Maroodi.Application.DTOs
{
    public class StoreProductDto
    {
        public int ProductId { get; set; }
        public ProductDto? Product { get; set; }
        public List<StoreProductPriceDto> Prices { get; set; } = new();
        public List<StoreDto?> Stores { get; set; }
        public StatusDto? Status { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}