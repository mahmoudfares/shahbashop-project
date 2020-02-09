using System;

namespace shahbashop.API.Models
{
    public class Image
    {
        public Guid Id { get; set; }
        public string Url { get; set; }
        public Product Product { get; set; }
        public Guid ProductId { get; set; }
        public DateTime DateAdded { get; set; }
        public bool IsMain { get; set; }
        public string PublicId { get; set; }
    }
}