using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using shahbashop.API.Models.Enums;

namespace shahbashop.API.Models
{
    public class Category
    {
        public Guid Id { get; set; }
        
        [Required]
        [MaxLength(191)]
        public string Name { get; set; }

        public ICollection<Category> Children { get; set; }

        public ICollection<Product> Products { get; set; }
        public CategoryType Type { get; set; }
    }
}