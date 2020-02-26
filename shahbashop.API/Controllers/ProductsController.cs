using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using shahbashop.API.Data;
using shahbashop.API.Helpers;
using shahbashop.API.Jsons.Requests;
using shahbashop.API.Jsons.Responses;
using shahbashop.API.Models;

namespace shahbashop.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController: ControllerBase
    {
        private readonly IShahbaShopRepository _repository;

        public ProductsController(IShahbaShopRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public async Task<IActionResult> GetProducts([FromQuery]UserParams userParams)
        {
            var products = await _repository.GetProducts(userParams);
            var productsToReturn = new List<ProductResponse>();
            foreach (var product in products)
            {
                productsToReturn.Add(ToProductResponse(product));
            }
            Response.addPagination(products.CurrentPage, products.TotalCount, products.TotalPages);
            return Ok(productsToReturn);
        }
        
        [HttpGet("category/{categoryId}")]
        public async Task<IActionResult> GetProductsPerCategory(Guid categoryId)
        {
            var products = await _repository.GetProductsPerCategory(categoryId);
            var productsToReturn = new List<ProductResponse>();
            foreach (var product in products)
            {
                productsToReturn.Add(ToProductResponse(product));
            }
            return Ok(productsToReturn);
        }

        [HttpGet("{Id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var product = await _repository.GetProduct(id);
            
            if (product == null)
                return NotFound();

            var productResponse = ToProductResponse(product);
            
            return Ok(productResponse);
        }

        private static ProductResponse ToProductResponse(Product product)
        {
            return new ProductResponse
            {
                Id = product.Id,
                Category = new CategoryResponse
                {
                    Id = product.Category.Id,
                    Name = product.Category.Name,
                },
                Name = product.Name,
                Price = $"{product.Price:0.00}",
                MaxToOrder = product.MaxToOrder != null ? product.MaxToOrder : product.Amount,
                Images = ToListProductImageResponse(product.Images)
            };
        }

        private static List<ProductImageResponse> ToListProductImageResponse(ICollection<Image> productImages)
        {
            var list = new List<ProductImageResponse>();
            if (productImages == null) return list;
            list.AddRange(productImages.Select(ToImageResponse));

            return list;
        }
        
        private static ProductImageResponse ToImageResponse(Image image) => new ProductImageResponse
        {
            Id = image.Id,
            Url = image.Url,
            IsMain = image.IsMain,
            PublicId = image.PublicId
        };

        [HttpPost]
        public async Task<IActionResult> Add([FromBody] ProductRequest request)
        {
            var category = await _repository.GetCategory(request.CategoryId);
            
            var product = new Product
            {
                Name = request.Name,
                Category = category,
                Price = request.Price
            };

            _repository.Add(product);
            await _repository.SaveAll();

            var productToReturn = ToProductResponse(product);
             
            return CreatedAtAction(nameof(Get), new { id = product.Id }, productToReturn);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var product = await _repository.GetProduct(id);
            _repository.Delete(product);

            await _repository.SaveAll();
            
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(Guid id, [FromBody] ProductRequest request)
        {
            var product = await _repository.GetProduct(id);
            
            product.Name = request.Name;
            product.Price = request.Price;

            _repository.Update(product);
            if (await _repository.SaveAll())
            {
                return Ok();
            }

            return BadRequest();
        }
    }
}