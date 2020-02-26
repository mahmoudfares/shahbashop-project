using System;
using System.Collections.Generic;

namespace shahbashop.API.Models
{
    public class Product
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public Category Category { get; set; }
        public decimal Price { get; set; }
        public ICollection<Image> Images { get; set; }
        
        public int MaxToOrder { get; set; }
        
        public int Amount { get; set; }
    }
}