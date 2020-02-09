using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.CodeAnalysis;
using shahbashop.API.Models.Enums;

namespace shahbashop.API.Models
{
    public class User
    {
        public User()
        {
            Language = Language.Arabic;
        }
        
        [Required]
        public Guid Id { get; set; }
        
        [EmailAddress]
        
        [Required]
        public string Email { get; set; }
        
        [Required]
        public byte[] PasswordHash { get; set; }
        
        public byte[] PassWordSalt { get; set; }
        
        // [Required]
        [MaxLength(50)]
        public string FirstName { get; set; }

        // [Required]
        [MaxLength(50)]
        public string LastName { get; set; }
        public Language Language { get; set; }
        public ICollection<Address> Addresss { get; set; }
        public DateTime EnrollmentDate { get; set; }
    }
}