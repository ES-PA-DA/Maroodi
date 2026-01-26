using System;
using System.Collections.Generic;
using System.Text;

namespace Maroodi.Application.Interfaces
{
    public interface IUserRepository
    {
        IEnumerable<User> GetAllUsers();
        User GetById(int id);
    }
}
