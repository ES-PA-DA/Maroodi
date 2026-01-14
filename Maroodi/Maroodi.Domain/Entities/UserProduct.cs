using System;
using System.Collections.Generic;
using System.Text;

    public class UserProduct : BaseEntity
    {
        public int UserId { get; set; }
        public User User { get; set; } = null!;

        public int ProductId { get; set; }
        public Product Product { get; set; } = null!;
    }