using System;
using System.Collections.Generic;
using System.Text;

    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;

        public ICollection<ProductCategory> ProductCategories { get; set; } = new List<ProductCategory>();
        public ICollection<StoreCategory> StoreCategories { get; set; } = new List<StoreCategory>();
    }

