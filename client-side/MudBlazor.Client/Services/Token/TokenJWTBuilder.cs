using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace MudBlazor.Client.Sevices.Token
{
    public class TokenJWTBuilder
    {
        private SecurityKey _securityKey = null!;
        private string _subject = string.Empty;
        private string _issuer = string.Empty;
        private string _audience = string.Empty;
        private Dictionary<string, string> _claims = new Dictionary<string, string>();
        private int _expiryInMinutes = 5;

        public TokenJWTBuilder AddSecurityKey(SecurityKey securityKey)
        {
            this._securityKey = securityKey;
            return this;
        }

        public TokenJWTBuilder AddSubject(string subject)
        {
            this._subject = subject;
            return this;
        }

        public TokenJWTBuilder AddIssuer(string issuer)
        {
            this._issuer = issuer;
            return this;
        }

        public TokenJWTBuilder AddAudience(string audience)
        {
            this._audience = audience;
            return this;
        }
        public TokenJWTBuilder AddClaim(string type, string value)
        {
            _claims[type] = value;
            return this;
        }

        //public TokenJWTBuilder AddClaims(Dictionary<string, string> claims)
        //{
        //    foreach (var claim in claims)
        //    {
        //        this._claims[claim.Key] = claim.Value;
        //    }
        //    return this;
        //}

        public TokenJWTBuilder AddExpiry(int expiryInMinutes)
        {
            this._expiryInMinutes = expiryInMinutes;
            return this;
        }

        private void EnsureArguments()
        {
            if (this._securityKey == null)
                throw new ArgumentNullException(nameof(this._securityKey));
            if (string.IsNullOrEmpty(this._subject))
                throw new ArgumentNullException(nameof(this._subject));
            if (string.IsNullOrEmpty(this._issuer))
                throw new ArgumentNullException(nameof(this._issuer));
            if (string.IsNullOrEmpty(this._audience))
                throw new ArgumentNullException(nameof(this._audience));
        }

        public TokenJWT Builder()
        {
            EnsureArguments();

            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, this._subject),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            }.Union(this._claims.Select(item => new Claim(item.Key, item.Value)));

            var token = new JwtSecurityToken(
                issuer: this._issuer,
                audience: this._audience,
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(_expiryInMinutes),
                    signingCredentials: new SigningCredentials(
                            this._securityKey,
                            SecurityAlgorithms.HmacSha256
                    )
            );
            return new TokenJWT(token);
        }
    }
}
