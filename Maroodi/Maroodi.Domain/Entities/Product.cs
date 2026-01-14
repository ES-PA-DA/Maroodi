using System;
using System.Collections.Generic;
using System.Text;
    public class Product : BaseEntity
    {
        public string Name { get; set; } = null!;
        public decimal Amount { get; set; }

        public int UnitId { get; set; }
        public Unit Unit { get; set; } = null!;

        public int BrandId { get; set; }
        public Brand Brand { get; set; } = null!;

        public int StatusId { get; set; }
        public Status Status { get; set; } = null!;

        public int CreatedBy { get; set; }
        public User Creator { get; set; } = null!;

        public ICollection<StoreProduct> StoreProducts { get; set; } = new List<StoreProduct>();
        public ICollection<ProductCategory> ProductCategories { get; set; } = new List<ProductCategory>();
    }


