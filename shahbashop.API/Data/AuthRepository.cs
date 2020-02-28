using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using shahbashop.API.Models;

namespace shahbashop.API.Data
{
    public class AuthRepository: IAuthRepository
    {
        private readonly DataContext _dataContext;

        public AuthRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }
        
        public async Task<User> Register(User user, string password)
        {
            byte[] passwordHash, passwordSalt;
            CreatPassword(password, out passwordHash, out passwordSalt);
            
            /*user.PasswordHash = passwordHash;
            user.PassWordSalt = passwordSalt;*/

            await _dataContext.Users.AddAsync(user);
            await _dataContext.SaveChangesAsync();

            return user;
        }

        private void CreatPassword(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }

        }

        public async Task<User> Login(string email, string password)
        {
            var user = await _dataContext.Users.FirstOrDefaultAsync(x => x.Email == email);

            if (user == null)
                return null;

            return user;
        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passWordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512(passWordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));

                return !computedHash.Where((t, i) => t != passwordHash[i]).Any();
            }
        }

        public async Task<bool> EmailExists(string email)
        {
            return await _dataContext.Users.AnyAsync(x => x.Email == email);
        }
    }
}