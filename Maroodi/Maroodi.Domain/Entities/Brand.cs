using System;
using System.Collections.Generic;
using System.Text;

    public class Brand
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string? Picture { get; set; }

        public ICollection<Product> Products { get; set; } = new List<Product>();
    }
