using System;

namespace shahbashop.API.Helpers
{
    public class UserParams
    {
        public int PageNumber { get; set; } = 1;
        private int pageSize = 10;
        public Guid CategoryId { get; set; }
        public int MaxPrice { get; set; }
        public int MinPrice { get; set; }
    }
}