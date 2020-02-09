using System;

namespace shahbashop.API.Jsons.Responses
{
    public class ProductImageResponse
    {
        public Guid Id { get; set; }
        public string Url { get; set; }
        public Guid ProductId { get; set; }
        public bool IsMain { get; set; }
        public string PublicId { get; set; }
    }
}