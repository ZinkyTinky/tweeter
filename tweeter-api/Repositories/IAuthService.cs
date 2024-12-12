using tweeter_api.Models;

namespace tweeter_api.Repositories;

public interface IAuthService 
{
    User CreateUser(User user);
    string SignIn(string email, string password);
}