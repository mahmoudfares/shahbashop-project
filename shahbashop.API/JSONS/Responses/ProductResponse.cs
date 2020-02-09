using System;
using System.Collections.Generic;

namespace shahbashop.API.Jsons.Responses
{
    public class ProductResponse
    {
        public ProductResponse()
        {
            Images = new List<ProductImageResponse>();
        }
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Price { get; set; }
        public CategoryResponse Category { get; set; }
        public List<ProductImageResponse> Images { get; set; }
        public int MaxToOrder { get; set; }
    }
}