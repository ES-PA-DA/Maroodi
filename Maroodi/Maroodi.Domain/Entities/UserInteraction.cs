using System;
using System.Collections.Generic;
using System.Text;

    public class UserInteraction : BaseEntity
    {
        public int UserId { get; set; }
        public User User { get; set; } = null!;

        public int InteractionId { get; set; }
        public Interaction Interaction { get; set; } = null!;

        public int StoreId { get; set; }
        public Store Store { get; set; } = null!;

        public int ProductId { get; set; }
        public Product Product { get; set; } = null!;
    }