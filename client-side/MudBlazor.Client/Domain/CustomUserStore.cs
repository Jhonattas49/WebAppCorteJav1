using Microsoft.AspNetCore.Identity;

namespace MudBlazor.Client.Domain
{
    using Microsoft.AspNetCore.Identity;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading;
    using System.Threading.Tasks;

    public class CustomUserStore :
        IUserStore<IdentityUser>,
        IUserPasswordStore<IdentityUser>,
        IUserEmailStore<IdentityUser>
    {
        private readonly Dictionary<string, IdentityUser> _users = new();

        public Task<IdentityResult> CreateAsync(IdentityUser user, CancellationToken cancellationToken)
        {
            if (_users.ContainsKey(user.Id))
                return Task.FromResult(IdentityResult.Failed(new IdentityError { Description = "User already exists." }));

            _users[user.Id] = user;
            return Task.FromResult(IdentityResult.Success);
        }

        public Task<IdentityResult> DeleteAsync(IdentityUser user, CancellationToken cancellationToken)
        {
            if (!_users.ContainsKey(user.Id))
                return Task.FromResult(IdentityResult.Failed(new IdentityError { Description = "User does not exist." }));

            _users.Remove(user.Id);
            return Task.FromResult(IdentityResult.Success);
        }

        public void Dispose() { }

        public Task<IdentityUser?> FindByIdAsync(string userId, CancellationToken cancellationToken)
        {
            _users.TryGetValue(userId, out var user);
            return Task.FromResult(user);
        }

        public Task<IdentityUser?> FindByNameAsync(string normalizedUserName, CancellationToken cancellationToken)
        {
            var user = _users.Values.FirstOrDefault(u => u.NormalizedUserName == normalizedUserName);
            return Task.FromResult(user);
        }

        public Task<string?> GetNormalizedUserNameAsync(IdentityUser user, CancellationToken cancellationToken)
        {
            return Task.FromResult(user.NormalizedUserName);
        }

        public Task<string> GetUserIdAsync(IdentityUser user, CancellationToken cancellationToken)
        {
            return Task.FromResult(user.Id);
        }

        public Task<string?> GetUserNameAsync(IdentityUser user, CancellationToken cancellationToken)
        {
            return Task.FromResult(user.UserName);
        }

        public Task SetNormalizedUserNameAsync(IdentityUser? user, string? normalizedName, CancellationToken cancellationToken)
        {
            user!.NormalizedUserName = normalizedName;
            return Task.CompletedTask;
        }

        public Task SetUserNameAsync(IdentityUser? user, string? userName, CancellationToken cancellationToken)
        {
            user!.UserName = userName;
            return Task.CompletedTask;
        }

        public Task<IdentityResult> UpdateAsync(IdentityUser user, CancellationToken cancellationToken)
        {
            if (!_users.ContainsKey(user.Id))
                return Task.FromResult(IdentityResult.Failed(new IdentityError { Description = "User does not exist." }));

            _users[user.Id] = user;
            return Task.FromResult(IdentityResult.Success);
        }

        public Task SetEmailAsync(IdentityUser? user, string? email, CancellationToken cancellationToken)
        {
            user!.Email = email;
            return Task.CompletedTask;
        }

        public Task<string?> GetEmailAsync(IdentityUser user, CancellationToken cancellationToken)
        {
            return Task.FromResult(user.Email);
        }

        public Task<bool> GetEmailConfirmedAsync(IdentityUser user, CancellationToken cancellationToken)
        {
            return Task.FromResult(user.EmailConfirmed);
        }

        public Task SetEmailConfirmedAsync(IdentityUser user, bool confirmed, CancellationToken cancellationToken)
        {
            user.EmailConfirmed = confirmed;
            return Task.CompletedTask;
        }

        public Task<IdentityUser?> FindByEmailAsync(string normalizedEmail, CancellationToken cancellationToken)
        {
            var user = _users.Values.FirstOrDefault(u => u.NormalizedEmail == normalizedEmail);
            return Task.FromResult(user);
        }

        public Task<string?> GetNormalizedEmailAsync(IdentityUser user, CancellationToken cancellationToken)
        {
            return Task.FromResult(user.NormalizedEmail);
        }

        public Task SetNormalizedEmailAsync(IdentityUser? user, string? normalizedEmail, CancellationToken cancellationToken)
        {
            user!.NormalizedEmail = normalizedEmail;
            return Task.CompletedTask;
        }

        public Task SetPasswordHashAsync(IdentityUser? user, string? passwordHash, CancellationToken cancellationToken)
        {
            user!.PasswordHash = passwordHash;
            return Task.CompletedTask;
        }

        public Task<string?> GetPasswordHashAsync(IdentityUser user, CancellationToken cancellationToken)
        {
            return Task.FromResult(user.PasswordHash);
        }

        public Task<bool> HasPasswordAsync(IdentityUser user, CancellationToken cancellationToken)
        {
            return Task.FromResult(user.PasswordHash != null);
        }
    }

    //public class CustomUserStore : IUserStore<IdentityUser>, IUserPasswordStore<IdentityUser>
    //{
    //    public Task<IdentityResult> CreateAsync(IdentityUser user, CancellationToken cancellationToken) => Task.FromResult(IdentityResult.Success);
    //    public Task<IdentityResult> DeleteAsync(IdentityUser user, CancellationToken cancellationToken) => Task.FromResult(IdentityResult.Success);
    //    public Task<IdentityUser> FindByIdAsync(string userId, CancellationToken cancellationToken) => Task.FromResult(new IdentityUser { Id = userId });
    //    public Task<IdentityUser> FindByNameAsync(string normalizedUserName, CancellationToken cancellationToken) => Task.FromResult(new IdentityUser { UserName = normalizedUserName });
    //    public Task<string> GetNormalizedUserNameAsync(IdentityUser user, CancellationToken cancellationToken) => Task.FromResult(user.UserName?.ToUpper());
    //    public Task<string> GetUserIdAsync(IdentityUser user, CancellationToken cancellationToken) => Task.FromResult(user.Id);
    //    public Task<string> GetUserNameAsync(IdentityUser user, CancellationToken cancellationToken) => Task.FromResult(user.UserName);
    //    public Task SetNormalizedUserNameAsync(IdentityUser user, string normalizedName, CancellationToken cancellationToken) => Task.CompletedTask;
    //    public Task SetUserNameAsync(IdentityUser user, string userName, CancellationToken cancellationToken) => Task.CompletedTask;
    //    public Task<IdentityResult> UpdateAsync(IdentityUser user, CancellationToken cancellationToken) => Task.FromResult(IdentityResult.Success);
    //    public Task<string> GetPasswordHashAsync(IdentityUser user, CancellationToken cancellationToken) => Task.FromResult(string.Empty);
    //    public Task<bool> HasPasswordAsync(IdentityUser user, CancellationToken cancellationToken) => Task.FromResult(false);
    //    public Task SetPasswordHashAsync(IdentityUser user, string passwordHash, CancellationToken cancellationToken) => Task.CompletedTask;
    //    public void Dispose() { }
    //}
}
