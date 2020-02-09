using System;
using System.ComponentModel.DataAnnotations;

namespace shahbashop.API.Jsons.Requests
{
    public class CategoryRequest
    {
        [Required] 
        [MaxLength(191)] 
        public string Name { get; set; }

        public Guid ParentId { get; set; }
    }
}