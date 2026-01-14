using Maroodi.Application.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace Maroodi.Application.UseCases
{
    public class UserService
    {

        private readonly IUserRepository _userRepository;
        public UserService(IUserRepository userRepository) {
        _userRepository = userRepository;
        }

        public IEnumerable<User> GetAllUsers()
        {
            return _userRepository.GetAllUsers();
        }

        public User GetUserById(int id)
        {
            return _userRepository.GetById(id);
        }
    }
}
