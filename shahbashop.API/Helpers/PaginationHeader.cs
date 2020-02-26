namespace shahbashop.API.Helpers
{
    public class PaginationHeader
    {                                        
        public int  CurrentPage { get; set; }
        public int TotalItems { get; set; }
        public int  TotalPages { get; set; }

        public PaginationHeader(int currentPage, int totalItems, int totalPages)
        {
            this.CurrentPage = currentPage;
            this.TotalPages = totalPages;
            this.TotalItems = totalItems;
        }
    }
}