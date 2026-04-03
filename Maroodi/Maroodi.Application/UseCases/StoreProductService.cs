using Maroodi.Application.DTOs;
using Maroodi.Application.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace Maroodi.Application.UseCases
{
    public class StoreProductService
    {

        private readonly IStoreProductRepository _storeProductRepository;
        public StoreProductService(IStoreProductRepository storeProductRepository) {
        _storeProductRepository = storeProductRepository;
        }

        public IEnumerable<StoreProductDto> GetAllStoreProducts()
        {
            return _storeProductRepository.GetAllStoreProducts();
        }

        public StoreProduct GetUserById(int id)
        {
            return _storeProductRepository.GetById(id);
        }
    }
}
