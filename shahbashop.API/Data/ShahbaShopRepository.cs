using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using shahbashop.API.Models;
using shahbashop.API.Models.Enums;

namespace shahbashop.API.Data
{
    public class ShahbaShopRepository: IShahbaShopRepository
    {
        private readonly DataContext _dataContext;

        public ShahbaShopRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }
        
        public void Add<T>(T entity) where T : class
        {
            _dataContext.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _dataContext.Remove(entity);
        }

        public void Update<T>(T entity) where T : class
        {
            _dataContext.Update(entity);
        }

        public async Task<IEnumerable<Category>> GetCategories()
        {
            var categories = await _dataContext.Categories.Where(x => x.Type == CategoryType.Parent).Include(x => x.Children).ToListAsync();
            return categories;
        }

        public async Task<Category> GetCategory(Guid id)
        {
            var category = await _dataContext.Categories.Include(x => x.Children).FirstOrDefaultAsync(x => x.Id == id);
            return category;
        }

        public async Task<IEnumerable<Product>> GetProducts()
        {
            var products = await _dataContext.Products.Include(x => x.Category).Include(x => x.Images).ToListAsync();
            return products;
        }

        public async Task<IEnumerable<Product>> GetProductsPerCategory(Guid categoryId)
        {
            var products = await _dataContext.Products.Include(x => x.Category)
                                                .Include(x => x.Images)
                                                .Where(x => x.Category.Id == categoryId)
                                                .ToListAsync();
            return products;
        }

        public async Task<Product> GetProduct(Guid id)
        {
            var product = await _dataContext.Products.Include(x => x.Category).Include(x => x.Images).FirstOrDefaultAsync(x => x.Id == id);
            return product;
        }

        public async Task<Product> GetProductWithImages(Guid id)
        {
            var product = await _dataContext.Products.Include(x => x.Images).FirstOrDefaultAsync(x => x.Id == id);
            return product;
        }

        public async Task<Image> GetImage(Guid id)
        {
            var image = await _dataContext.Images.FirstOrDefaultAsync(x => x.Id == id);
            return image;
        }

        public async Task<bool> SaveAll()
        {
            return await _dataContext.SaveChangesAsync() > 0;
        }
    }
}