using Maroodi.Application.DTOs;
using Maroodi.Application.Interfaces;
using Maroodi.Application.Mappings;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace Maroodi.Infrastructure.Persistence
{
    public class StoreProductRepository : IStoreProductRepository
    {
        private readonly AppDbContext _context;
        private readonly DbSet<StoreProduct> _dbSet;
        public StoreProductRepository(AppDbContext context) {
            _context = context;
        }

        public IEnumerable<StoreProductDto> GetAllStoreProducts()
        {
            var storeProducts = _context.StoreProducts
                .AsNoTracking()
                .Include(sp => sp.Product).ThenInclude(p => p.Unit)
                .Include(sp => sp.Product).ThenInclude(p => p.Brand)
                .Include(sp => sp.Product).ThenInclude(p => p.Status)
                .Include(sp => sp.Store).ThenInclude(s => s.Status)
                .Include(sp => sp.Prices).ThenInclude(pp => pp.Status)
                .ToList();

            var grouped = storeProducts
                .GroupBy(sp => sp.ProductId)
                .Select(g =>
                {
                    var first = g.First();
                    return new StoreProductDto
                    {
                        ProductId = g.Key,
                        Product = first.Product?.ToDto(),
                        Stores = g
                            .Select(sp => sp.Store)
                            .Where(s => s != null)
                            .GroupBy(s => s.Id)
                            .Select(gr => gr.First().ToDto())
                            .ToList(),
                        Prices = g
                            .SelectMany(sp => sp.Prices.Select(p =>
                            {
                                var dto = p.ToDto();
                                dto.StoreId = sp.StoreId;
                                return dto;
                            }))
                            .ToList(),
                        Status = first.Product?.Status?.ToDto(),
                        CreatedAt = g.Min(sp => sp.CreatedAt)
                    };
                })
                .ToList();

            return grouped;
        }

        public StoreProduct? GetById(int id)
        {
            return _context.StoreProducts.FindAsync(id).Result;
        }
    } 
}
