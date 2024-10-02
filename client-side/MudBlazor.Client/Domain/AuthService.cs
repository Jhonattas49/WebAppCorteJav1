using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using MudBlazor.Client.Sevices.Token;
using MudBlazor.Client.Shared.Entities;
using MudBlazor.Client.Shared.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace MudBlazor.Client.Domain
{
    public class AuthService
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;
        //private readonly IOptions<ConfigurationSettings> _configOptions;
        private readonly ConfigurationSettings _configOptions;
        public AuthService
        (
            UserManager<IdentityUser> userManager,
            SignInManager<IdentityUser> signInManager,
            ConfigurationSettings configOptions
        //IOptions<ConfigurationSettings> configOptions
        )
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _configOptions = configOptions;
        }

        public async Task IdentityLoginAsync(InputLoginRequest input)
        {
            if (string.IsNullOrWhiteSpace(input.Email) || string.IsNullOrWhiteSpace(input.Password))
                throw new ArgumentException("Email and Password are required");

            var result = await _signInManager.PasswordSignInAsync(input.Email, input.Password, false, lockoutOnFailure: false);

            if (!result.Succeeded)
                throw new ArgumentException("Login ou senha incorreto");
        }

        public bool ValidToken(string token)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configOptions.Key));
            var result = new TokenJWTBuilder()
                .AddToken(token)
                .AddIssuer(_configOptions.Issuer)
                .AddAudience(_configOptions.Audience)
                .AddSecurityKey(key)
                .IsTokenValid();

            return result;                
        }

        public string GenerateToken(AddUserRequest user)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configOptions.Key));
            var token = new TokenJWTBuilder()
                .AddSecurityKey(key)
                .AddSubject(user.Email)
                .AddIssuer(_configOptions.Issuer)
                .AddAudience(_configOptions.Audience)
                .AddClaim("Name", user.Name)
                .AddClaim("Email", user.Email)
                .AddClaim("Contacts", string.Join(",", user.Contacts.Select(c => c.ToString())))
                .AddClaim("Roles", string.Join(",", user.Roles))
                .AddExpiry(int.Parse(_configOptions.ExpiryInMinutes))
                .Builder();

            return token.Value;
        }
        //public async Task<TokenJWT> CreateTokenAsync(/*InputLoginRequest input*/)
        //{


        //    var token = new TokenJWTBuilder()
        //        .AddSecurityKey(JwtSecurityKey.Create($"Secret_Key-{_configOptions.Value.SALT_KEY}"))
        //        .AddSubject("Sistema bot de atendente")
        //        .AddIssuer("Nsg.Security.Bearer")
        //        .AddAudience("Nsg.Security.Bearer")
        //        .AddExpiry(5)
        //        .Builder();

        //    return await Task.FromResult(token);
        //}
    }
}
