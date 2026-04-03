using Maroodi.Application.DTOs;
using System;
using System.Collections.Generic;
using System.Text;

namespace Maroodi.Application.Interfaces
{
    public interface IStoreProductRepository
    {
        IEnumerable<StoreProductDto> GetAllStoreProducts();
        StoreProduct GetById(int id);
    }
}
