using System.Threading.Tasks;
using shahbashop.API.Models;

namespace shahbashop.API.Data
{
    public interface IAuthRepository
    {
        Task<User> Register(User user, string password);
        Task<User> Login(string email, string password);
        Task<bool> EmailExists(string email);
    }
}