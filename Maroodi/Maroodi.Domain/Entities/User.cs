using System;
using System.Collections.Generic;
using System.Text;

    public class User : BaseEntity
    {
        public string Name { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string? Picture { get; set; }
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;

        public int StatusId { get; set; }
        public Status Status { get; set; } = null!;

        public ICollection<UserStore> UserStores { get; set; } = new List<UserStore>();
        public ICollection<UserProduct> UserProducts { get; set; } = new List<UserProduct>();
        public ICollection<UserCategory> UserCategories { get; set; } = new List<UserCategory>();
        public ICollection<UserInteraction> UserInteractions { get; set; } = new List<UserInteraction>();
    }

