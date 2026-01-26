using System;
using System.Collections.Generic;
using System.Text;

    public class UserStore : BaseEntity
    {
        public int UserId { get; set; }
        public User User { get; set; } = null!;

        public int StoreId { get; set; }
        public Store Store { get; set; } = null!;
    }