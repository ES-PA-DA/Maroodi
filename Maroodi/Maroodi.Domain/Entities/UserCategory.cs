using System;
using System.Collections.Generic;
using System.Text;

    public class UserCategory : BaseEntity
    {
        public int UserId { get; set; }
        public User User { get; set; } = null!;

        public int CategoryId { get; set; }
        public Category Category { get; set; } = null!;
    }