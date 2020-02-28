using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;
using shahbashop.API.Models.Enums;

namespace shahbashop.API.Models
{
    public class User : IdentityUser<int>
    {
        public User()
        {
            Language = Language.Arabic;
        }
        [MaxLength(50)]
        public string FirstName { get; set; }
        
        [MaxLength(50)]
        public string LastName { get; set; }
        public Language Language { get; set; }
        public ICollection<Address> Addresss { get; set; }
        public DateTime EnrollmentDate { get; set; }
        public virtual ICollection<UserRole> UserRoles { get; set; }
    }
}