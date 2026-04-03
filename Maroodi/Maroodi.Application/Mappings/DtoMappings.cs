using System.Linq;
using Maroodi.Application.DTOs;

namespace Maroodi.Application.Mappings
{
    public static class DtoMappings
    {
        public static ProductDto ToDto(this Product e) =>
            e == null ? null! : new ProductDto
            {
                Id = e.Id,
                Name = e.Name,
                Amount = e.Amount,
                Unit = e.Unit?.ToDto(),
                Brand = e.Brand?.ToDto(),
                Status = e.Status?.ToDto(),
                CreatedBy = e.CreatorId,
                CreatedAt = e.CreatedAt
            };

        public static StoreDto ToDto(this Store e) =>
            e == null ? null! : new StoreDto
            {
                Id = e.Id,
                Name = e.Name,
                Picture = e.Picture,
                Latitude = e.Latitude,
                Longitude = e.Longitude,
                Status = e.Status?.ToDto(),
                CreatedBy = e.CreatorId,
                CreatedAt = e.CreatedAt
            };

        public static StoreProductDto ToDto(this StoreProduct e) =>
            e == null ? null! : new StoreProductDto
            {
                ProductId = e.ProductId,
                Product = e.Product?.ToDto(),
                Prices = e.Prices?.Select(p => p.ToDto()).ToList() ?? new System.Collections.Generic.List<StoreProductPriceDto>(),
                Status = e.Status?.ToDto(),
                Stores = new List<StoreDto?> { e.Store?.ToDto() },
                CreatedAt = e.CreatedAt,
            };

        public static StoreProductPriceDto ToDto(this StoreProductPrice e) =>
            e == null ? null! : new StoreProductPriceDto
            {
                Id = e.Id,
                StoreProductId = e.StoreProductId,
                Price = e.Price,
                Status = e.Status?.ToDto(),
                CreatedBy = e.CreatorId,
                CreatedAt = e.CreatedAt
            };

        public static CategoryDto ToDto(this Category e) =>
            e == null ? null! : new CategoryDto { Id = e.Id, Name = e.Name };

        public static BrandDto ToDto(this Brand e) =>
            e == null ? null! : new BrandDto { Id = e.Id, Name = e.Name };

        public static UnitDto ToDto(this Unit e) =>
            e == null ? null! : new UnitDto { Id = e.Id, Name = e.Name };

        public static StatusDto ToDto(this Status e) =>
            e == null ? null! : new StatusDto { Id = e.Id, Name = e.Name };

        public static UserDto ToDto(this User e) =>
            e == null ? null! : new UserDto
            {
                Id = e.Id,
                Name = e.Name,
                LastName = e.LastName,
                Picture = e.Picture,
                Email = e.Email
            };
    }
}