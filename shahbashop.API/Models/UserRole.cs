using System;
using Microsoft.AspNetCore.Identity;

namespace shahbashop.API.Models
{
    public class UserRole : IdentityUserRole<int>
    {
        public virtual User Use { get; set; }
        public virtual Role Role { get; set; }
    }
}