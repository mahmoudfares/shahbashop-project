using System;
using System.Collections;
using System.Collections.Generic;
using shahbashop.API.Models.Enums;

namespace shahbashop.API.Jsons.Responses
{
    public class CategoryResponse
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public List<CategoryResponse> Children { get; set; }
        public CategoryType Type { get; set; }
    }
}