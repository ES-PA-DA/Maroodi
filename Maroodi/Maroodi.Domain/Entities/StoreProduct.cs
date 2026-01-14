using System;
using System.Collections.Generic;
using System.Text;
    public class StoreProduct : BaseEntity
    {
        public int StoreId { get; set; }
        public Store Store { get; set; } = null!;

        public int ProductId { get; set; }
        public Product Product { get; set; } = null!;

        public int StatusId { get; set; }
        public Status Status { get; set; } = null!;

        public ICollection<StoreProductPrice> Prices { get; set; } = new List<StoreProductPrice>();
    }