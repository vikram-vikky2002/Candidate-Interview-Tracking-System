using CITS_DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CITS_DataAccessLayer
{
    public class UserRepository
    {
        public CitsdbContext Context { get; set; }
        public UserRepository()
        {
            Context = new CitsdbContext();
        }

        public string AuthenticateUser(string email, string password)
        {
            string role = string.Empty;
            try
            {
                var user = Context.Users.FirstOrDefault(u => u.Email == email && u.PasswordHash == password);
                if (user != null)
                {
                    role = user.Role.RoleName;
                }
            }
            catch (Exception ex)
            {
                role = string.Empty;
            }
            return role;
        }

        public User GetUserById(int userId)
        {
            User user = null;
            try
            {
                user = Context.Users.Find(userId);
            }
            catch (Exception ex)
            {
                user = null;
            }
            return user;
        }
        public List<User> GetUserByRole(string role)
        {
            List<User> user = new List<User>();
            try
            {
                user = Context.Users
                    .Where(u => u.Role.RoleName == role)
                    .ToList();
            }
            catch (Exception ex)
            {
                user = null;
            }
            return user;
        }

        public bool AddUser(User user)
        {
            bool status = false;
            try
            {
                user.CreatedAt = DateTime.Now;
                Context.Users.Add(user);
                Context.SaveChanges();
                status = true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                status = false;
            }
            return status;
        }

        public bool UpdateUser(User user)
        {
            bool status = false;
            try
            {
                var existingUser = Context.Users.Find(user.UserId);
                if (existingUser != null)
                {
                    existingUser.FullName = user.FullName;
                    existingUser.Email = user.Email;
                    existingUser.PasswordHash = user.PasswordHash;
                    existingUser.RoleId = user.RoleId;
                    Context.SaveChanges();
                    status = true;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                status = false;
            }
            return status;
        }
    }
}
