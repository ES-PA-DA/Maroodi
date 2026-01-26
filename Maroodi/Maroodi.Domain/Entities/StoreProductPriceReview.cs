using System;
using System.Collections.Generic;
using System.Text;

    public class StoreProductPriceReview : BaseEntity
    {
        public int StoreProductPriceId { get; set; }
        public StoreProductPrice StoreProductPrice { get; set; } = null!;

        public int UserId { get; set; }
        public User User { get; set; } = null!;

        public bool IsGood { get; set; }

        public int StatusId { get; set; }
        public Status Status { get; set; } = null!;
    }