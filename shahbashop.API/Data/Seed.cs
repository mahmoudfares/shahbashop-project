using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using shahbashop.API.Models;

namespace shahbashop.API.Data
{
    public class Seed
    {
        public static  void SeedAdmin(UserManager<User> userManager, RoleManager<Role> roleManager)
        {
            var adminFromTheDatabase = userManager.FindByEmailAsync("mahmut.faris1993@gmail.com").Result;
            
            if(adminFromTheDatabase == null)
            {
                var Roles = new List<Role>
                {
                    new Role {Name = "Admin"},
                    new Role {Name = "Member"}
                };

                foreach (var role in Roles)
                {
                    roleManager.CreateAsync(role).Wait();
                }

                var adminUser = new User
                {
                    Email = "mahmut.faris1993@gmail.com",
                    UserName = "mahmut.faris1993@gmail.com"
                };

                var result = userManager.CreateAsync(adminUser, "ma12345678").Result;
                if (result.Succeeded)
                {
                    var admin = userManager.FindByEmailAsync("mahmut.faris1993@gmail.com").Result;
                    userManager.AddToRolesAsync(admin, new []{"Admin", "Member"}).Wait();
                }
                
            }
        }
    }
}