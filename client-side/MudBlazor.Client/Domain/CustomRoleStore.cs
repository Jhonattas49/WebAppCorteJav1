using Microsoft.AspNetCore.Identity;

namespace MudBlazor.Client.Domain
{
    public class CustomRoleStore : IRoleStore<IdentityRole>
    {
        private readonly Dictionary<string, IdentityRole> _roles = new();

        public Task<IdentityResult> CreateAsync(IdentityRole role, CancellationToken cancellationToken)
        {
            if (_roles.ContainsKey(role.Id))
                return Task.FromResult(IdentityResult.Failed(new IdentityError { Description = "ApplicationRole already exists." }));

            _roles[role.Id] = role;
            return Task.FromResult(IdentityResult.Success);
        }

        public Task<IdentityResult> DeleteAsync(IdentityRole role, CancellationToken cancellationToken)
        {
            if (!_roles.ContainsKey(role.Id))
                return Task.FromResult(IdentityResult.Failed(new IdentityError { Description = "ApplicationRole does not exist." }));

            _roles.Remove(role.Id);
            return Task.FromResult(IdentityResult.Success);
        }

        public void Dispose() { }

        public Task<IdentityRole?> FindByIdAsync(string roleId, CancellationToken cancellationToken)
        {
            _roles.TryGetValue(roleId, out var role);
            return Task.FromResult(role);
        }

        public Task<IdentityRole?> FindByNameAsync(string normalizedRoleName, CancellationToken cancellationToken)
        {
            var role = _roles.Values.FirstOrDefault(r => r.Name!.Equals(normalizedRoleName, StringComparison.OrdinalIgnoreCase));
            return Task.FromResult(role);
        }

        public Task<string?> GetNormalizedRoleNameAsync(IdentityRole role, CancellationToken cancellationToken)
        {
            return Task.FromResult(role?.Name!.ToUpper())!;
        }

        public Task<string> GetRoleIdAsync(IdentityRole role, CancellationToken cancellationToken)
        {
            return Task.FromResult(role.Id);
        }

        public Task<string?> GetRoleNameAsync(IdentityRole role, CancellationToken cancellationToken)
        {
            return Task.FromResult(role.Name);
        }

        public  Task SetNormalizedRoleNameAsync(IdentityRole? role, string? normalizedName, CancellationToken cancellationToken)
        {
            role!.Name = normalizedName;
            return  Task.CompletedTask;
        }

        public Task SetRoleNameAsync(IdentityRole? role, string? roleName, CancellationToken cancellationToken)
        {
            role!.Name = roleName;
            return Task.CompletedTask;
        }

        public Task<IdentityResult> UpdateAsync(IdentityRole role, CancellationToken cancellationToken)
        {
            if (!_roles.ContainsKey(role.Id))
                return Task.FromResult(IdentityResult.Failed(new IdentityError { Description = "ApplicationRole does not exist." }));

            _roles[role.Id] = role;
            return Task.FromResult(IdentityResult.Success);
        }
    }
}
