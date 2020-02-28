using System;
using System.Linq;
using System.Threading.Tasks;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using shahbashop.API.Data;
using shahbashop.API.Helpers;
using shahbashop.API.Jsons.Requests;
using shahbashop.API.Jsons.Responses;
using shahbashop.API.Models;

namespace shahbashop.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Policy = "RequireAdminRole")]
    
    public class ImagesController: ControllerBase
    {
        private readonly IOptions<CloudinarySettings> _cloudinaryConfig;
        private readonly IShahbaShopRepository _repository;
        private Cloudinary _cloudinary;

        public ImagesController(IOptions<CloudinarySettings> cloudinaryConfig, IShahbaShopRepository repository)
        {
            _cloudinaryConfig = cloudinaryConfig;
            _repository = repository;
            Account acc = new Account(_cloudinaryConfig.Value.CloudName, _cloudinaryConfig.Value.ApiKey, _cloudinaryConfig.Value.ApiSecret);
            _cloudinary = new Cloudinary(acc);
        }
        [HttpPost("{productId}")]
        public async Task<IActionResult> AddImage(Guid productId,  [FromForm]ProductImageRequest request)
        {
            var product = await _repository.GetProductWithImages(productId);
            if (product == null)
                return NotFound("Product not found");

            var file = request.File;
            var uploadResult = new ImageUploadResult();
            if (file.Length > 0)
            {
                using (var stream = file.OpenReadStream())
                {
                    var uploadParams = new ImageUploadParams()
                    {
                        File = new FileDescription(file.Name, stream),
                        Transformation = new Transformation().Width(500).Height(500).Crop("fill")
                    };
                    uploadResult = _cloudinary.Upload(uploadParams);
                    
                }
            }

            request.Url = uploadResult.Uri.ToString();
            request.PublicId = uploadResult.PublicId;
            Image image = RequestToImage(request);
            if (!product.Images.Any(x => x.IsMain))
                image.IsMain = true;
            
            product.Images.Add(image);
            if (!await _repository.SaveAll())
                return BadRequest("something went wrong");

            var imageToReturn = ToImageResponse(image);
            
            return CreatedAtAction(nameof(GetImage), new {id = image.Id}, imageToReturn);
        }
        
        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetImage(Guid id)
        {
            var image = await  _repository.GetImage(id);
            
            if (image == null)
                return NotFound("Image not found");

            var imageResponse = ToImageResponse(image);
            
            return Ok(image);
        }
        
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]

        public async Task<IActionResult> Delete(Guid id)
        {
            var image = await _repository.GetImage(id);
            if (image == null)
                return NotFound("image not found");

            if (image.IsMain)
                return BadRequest("You can't delete the main image");
            var deleteParams = new DeletionParams(image.PublicId);
            
            var result = _cloudinary.Destroy(deleteParams);
            if (result.Result == "ok")
            {
                _repository.Delete(image);
            }

            if (await _repository.SaveAll())
                return Ok();

            return BadRequest("failed to delete the image");
        }
        
        [HttpPut("{id}/products/{productId}")]
        public async Task<IActionResult> SetMain(Guid id, Guid productId)
        {
            var product = await _repository.GetProduct(productId);

            if (product == null)
                return NotFound("Product not found");

            var productHasMainImage = product.Images.Any(x => x.Id == id);
            
            if (product.Images.Count > 0 && productHasMainImage)
            {
                foreach (var image in product.Images)
                {
                    if (image.Id == id)
                    {
                        image.IsMain = true;
                    }
                    else
                    {
                        image.IsMain = false;
                    }
                }
            }

            if (await _repository.SaveAll())
            {
                return Ok();
            }

            return BadRequest("Something went wrong");
        }

        private ProductImageResponse ToImageResponse(Image image) => new ProductImageResponse
        {
            Id = image.Id,
            Url = image.Url,
            IsMain = image.IsMain,
            PublicId = image.PublicId
        };

        private Image RequestToImage(ProductImageRequest request) => new Image()
        {
            Url = request.Url,
            DateAdded = request.DateAdded,
            IsMain = request.IsMain,
            PublicId = request.PublicId
        };
    }
}