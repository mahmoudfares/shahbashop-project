using System;
using shahbashop.API.Models.Enums;

namespace shahbashop.API.Models
{
    public class Address
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Zip { get; set; }
        public Country Country { get; set; }
        public string City { get; set; }
        public User User { get; set; }
        public Guid UserId { get; set; }
    }
}