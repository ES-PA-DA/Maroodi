using System;
using System.Collections.Generic;
using System.Text;

    public class StoreProductPrice : BaseEntity
    {
        public int StoreProductId { get; set; }
        public StoreProduct StoreProduct { get; set; } = null!;

        public decimal Price { get; set; }

        public int StatusId { get; set; }
        public Status Status { get; set; } = null!;

        public int CreatorId { get; set; }
        public User Creator { get; set; } = null!;

        public ICollection<StoreProductPriceReview> Reviews { get; set; } = new List<StoreProductPriceReview>();
    }