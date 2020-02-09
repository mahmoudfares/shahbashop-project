using System;
using System.Collections.Generic;
using shahbashop.API.Models.Enums;

namespace shahbashop.API.Models
{
    public class Order
    {
        public Guid Id { get; set; }
        public User Orderer { get; set; }
        public Guid UserId { get; set; }
        public DateTime Date { get; set; }
        public OrderStatus OrderStatus { get; set; }
        public ICollection<Product> Products { get; set; }
    }
}