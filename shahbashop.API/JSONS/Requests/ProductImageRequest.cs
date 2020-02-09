using System;
using Microsoft.AspNetCore.Http;

namespace shahbashop.API.Jsons.Requests
{
    public class ProductImageRequest
    {
        public ProductImageRequest()
        {
            DateAdded = DateTime.Now;
        }
        
        public string Url { get; set; }
        public DateTime DateAdded { get; set; }
        public bool IsMain { get; set; }
        public IFormFile File { get; set; }
        public string PublicId { get; set; }
    }
}