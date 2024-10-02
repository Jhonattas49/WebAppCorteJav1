using System.IdentityModel.Tokens.Jwt;

namespace MudBlazor.Client.Sevices.Token
{
    public class TokenJWT
    {
        private JwtSecurityToken SecurityToken { get; }

        internal TokenJWT(JwtSecurityToken token) 
        {
            SecurityToken = token;
        }

        public DateTime ValidTo => SecurityToken.ValidTo;

        public string Value => new JwtSecurityTokenHandler().WriteToken(SecurityToken);
    }
}
