using System;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using shahbashop.API.Data;
using shahbashop.API.Jsons.Requests;
using shahbashop.API.Jsons.Responses;
using shahbashop.API.Models;
using shahbashop.API.Models.Enums;

namespace shahbashop.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]

    public class CategoriesController: ControllerBase
    {
        private readonly IShahbaShopRepository _repository;

        public CategoriesController(IShahbaShopRepository repository)
        {
            _repository = repository;
        }
        
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var category = await _repository.GetCategory(id);
            
            if (category == null)
                return NotFound();
            
            return Ok(category);
        }

        [HttpGet]
        public async Task<IActionResult> GetCategories()
        {
            var categories = await _repository.GetCategories();
            var categoryResponses = new List<CategoryResponse>();
            foreach (var category in categories)
            {
                categoryResponses.Add(toCategoryResponse(category));
            }
            return Ok(categoryResponses);
        }

        private CategoryResponse toCategoryResponse(Category category)
        {
            var categoryToReturn = new CategoryResponse();
            categoryToReturn.Name = category.Name;
            categoryToReturn.Id = category.Id;
            categoryToReturn.Type = category.Type;
            if (category.Children.Count <= 0) return categoryToReturn;
            
            categoryToReturn.Children = new List<CategoryResponse>();
            
            foreach (var child in category.Children)
            {
                categoryToReturn.Children.Add(ToChildCategoryResponse(child));;
            }
            
            return categoryToReturn;
        }

        private static CategoryResponse ToChildCategoryResponse(Category child)
        {
            return new CategoryResponse{ Id = child.Id, Name = child.Name, Type = child.Type};
        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(Guid id,[FromBody]CategoryRequest request)
        {
            var category = await _repository.GetCategory(id);
            if (category == null)
                return NotFound();

            category.Name = request.Name;
            _repository.Update(category);
            
            await _repository.SaveAll();

            return NoContent();
        }

        [HttpPost]
        public async Task<IActionResult> AddCategory([FromBody] CategoryRequest request)
        {
            var category = new Category
            {
                Name = request.Name,
                Type = CategoryType.Parent
            };
            
            if (request.ParentId != Guid.Empty)
            {
               var parentCategory = await _repository.GetCategory(request.ParentId);
               if (parentCategory == null)
                   return NotFound("Parent category have not founded");
               category.Type = CategoryType.Child;
               
               parentCategory.Children.Add(category);
               
               if (! await _repository.SaveAll())
               {
                   return BadRequest("Something went wrong bad in database.");
               }

               return CreatedAtAction(nameof(Get), new { id = category.Id }, category);
            }
            
            _repository.Add(category);
            await _repository.SaveAll();
            return CreatedAtAction(nameof(Get), new { id = category.Id }, category);
        }
        
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var category = await _repository.GetCategory(id);

            if (category == null)
                return NotFound();
            
            _repository.Delete(category);
            await _repository.SaveAll();
            return Ok();
        }
    }
}