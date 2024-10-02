using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace MudBlazor.Client.Sevices.Token
{
    // Classe para construir tokens JWT
    public class TokenJWTBuilder
    {
        private SecurityKey _securityKey = null!; // Chave de segurança para assinar o token
        private string _subject = string.Empty; // Assunto (subject) do token
        private string _issuer = string.Empty; // Emissor (issuer) do token
        private string _audience = string.Empty; // Público (audience) do token
        private string _token= string.Empty;//
        private Dictionary<string, string> _claims = new Dictionary<string, string>(); // Claims personalizados do token
        private int _expiryInMinutes = 5; // Tempo de expiração do token em minutos

        // Adiciona a chave de segurança ao builder
        public TokenJWTBuilder AddSecurityKey(SecurityKey securityKey)
        {
            this._securityKey = securityKey;
            return this;
        }

        // Adiciona o assunto ao builder
        public TokenJWTBuilder AddSubject(string subject)
        {
            this._subject = subject;
            return this;
        }

        // Adiciona o emissor ao builder
        public TokenJWTBuilder AddIssuer(string issuer)
        {
            this._issuer = issuer;
            return this;
        }

        // Adiciona o público ao builder
        public TokenJWTBuilder AddAudience(string audience)
        {
            this._audience = audience;
            return this;
        }

        // Adiciona um claim personalizado ao builder
        public TokenJWTBuilder AddClaim(string type, string value)
        {
            _claims[type] = value;
            return this;
        }

        // Adiciona o tempo de expiração ao builder
        public TokenJWTBuilder AddExpiry(int expiryInMinutes)
        {
            this._expiryInMinutes = expiryInMinutes;
            return this;
        }

        public TokenJWTBuilder AddToken(string token)
        {
            this._token = token;
            return this;
        }   

        // Verifica se todos os argumentos necessários foram fornecidos
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

        // Constrói e retorna o token JWT
        public TokenJWT Builder()
        {
            EnsureArguments();

            // Cria uma lista de claims
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, this._subject),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            }.Union(this._claims.Select(item => new Claim(item.Key, item.Value)));

            // Cria o token JWT
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

            // Retorna o token criado encapsulado em uma classe TokenJWT
            return new TokenJWT(token);
        }

        // Verifica se todos os argumentos necessários foram fornecidos
        private void EnsureArgumentsValid()
        {
            if (string.IsNullOrEmpty(this._token))
                throw new ArgumentNullException(nameof(this._token));
            if (this._securityKey == null)
                throw new ArgumentNullException(nameof(this._securityKey));
            if (string.IsNullOrEmpty(this._issuer))
                throw new ArgumentNullException(nameof(this._issuer));
            if (string.IsNullOrEmpty(this._audience))
                throw new ArgumentNullException(nameof(this._audience));
        }
        /// <summary>
        /// param: AddToken +  AddIssuer + AddAudience + AddSecurityKey
        /// </summary>
        /// <returns></returns>
        public bool IsTokenValid()
        {
            EnsureArgumentsValid();
            var tokenHandler = new JwtSecurityTokenHandler();
            var validationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = this._issuer,
                ValidAudience = this._audience,
                IssuerSigningKey = this._securityKey
            };

            try
            {
                // Tenta validar o token
                tokenHandler.ValidateToken(this._token, validationParameters, out SecurityToken validatedToken);
                return validatedToken != null;
            }
            catch
            {
                // Retorna falso se a validação falhar
                return false;
            }
        }
    }
}

