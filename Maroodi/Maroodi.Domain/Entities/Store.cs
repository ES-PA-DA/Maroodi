using System;
using System.Collections.Generic;
using System.Text;

    public class Store : BaseEntity
    {
        public string Name { get; set; } = null!;
        public string? Picture { get; set; }
        public string Latitude { get; set; } = null!;
        public string Longitude { get; set; } = null!;

        public int StatusId { get; set; }
        public Status Status { get; set; } = null!;

        public int CreatorId { get; set; }
        public User Creator { get; set; } = null!;

        public ICollection<StoreProduct> StoreProducts { get; set; } = new List<StoreProduct>();
        public ICollection<StoreCategory> StoreCategories { get; set; } = new List<StoreCategory>();
    }