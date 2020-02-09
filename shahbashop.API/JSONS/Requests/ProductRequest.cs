using System;
using System.ComponentModel.DataAnnotations;

namespace shahbashop.API.Jsons.Requests
{
    public class ProductRequest
    {
        public string Name { get; set; }
        
        [Required]
        public Guid CategoryId { get; set; }
        public string Price { get; set; }
    }

}