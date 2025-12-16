using Maroodi.Application.Interfaces;
using Maroodi.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Maroodi.Infrastructure.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly List<User> _users = new List<User>
        {
            new User { Id = 1, Name = "Lewis Towers" },
            new User { Id = 2, Name = "Dany Rey" },
            new User { Id = 3, Name = "Steven Arizaege" }
        };

        public IEnumerable<User> GetAllUsers()
        {
            return _users;
        }

        public User GetById(int id)
        {
            return _users.FirstOrDefault(u => u.Id == id);
        }
    }
}
