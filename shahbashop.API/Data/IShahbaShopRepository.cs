using System;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using shahbashop.API.Models;

namespace shahbashop.API.Data
{
    public interface IShahbaShopRepository
    {
        void Add<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        void Update<T>(T entity) where T : class;
        Task<IEnumerable<Category>> GetCategories();
        Task<Category> GetCategory(Guid id);
        
        Task<IEnumerable<Product>> GetProducts();
        
        Task<IEnumerable<Product>> GetProductsPerCategory(Guid categoryId);

        Task<Product> GetProduct(Guid id);
        Task<Product> GetProductWithImages(Guid id);
        Task<Image> GetImage(Guid id);
        Task<bool> SaveAll();
    }
}