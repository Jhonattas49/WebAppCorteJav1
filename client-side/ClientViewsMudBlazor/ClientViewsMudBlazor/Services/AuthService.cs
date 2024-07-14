using ClientViewsMudBlazor.Services; // Assume this namespace contains TokenService
using System.Net.Http.Json;
using WebAppCorteja.Shared.Models; // Assume this namespace contains the Token class

public class AuthService
{
    private readonly HttpClient _httpClient;
    private readonly TokenService _tokenService;

    public AuthService(HttpClient httpClient, TokenService tokenService)
    {
        _httpClient = httpClient;
        _tokenService = tokenService;
    }

    /// <summary>
    /// Realiza o login de um usuário na aplicação.
    /// </summary>
    /// <param name="login">Objeto contendo os dados de login do usuário (e.g., username, password).</param>
    /// <returns>Task<Token></returns>
    /// <remarks>
    /// Este método envia os dados de login para o endpoint "login" da API utilizando o método POST.
    /// Se o login for bem-sucedido, o método retorna um objeto Token contendo o token de acesso 
    /// e a indicação de sucesso (Success = true). 
    /// 
    /// Caso o login falhe, o método retorna um objeto Token com Success = false e uma mensagem de erro 
    /// informando para entrar em contato com o administrador do sistema.
    /// </remarks>
    public async Task<Token> LoginAsync(Login login)
    {
        // Envia os dados de login para a API utilizando o método POST.
        var response = await _httpClient.PostAsJsonAsync("login", login);


       


        if (response.IsSuccessStatusCode)
        {
            // Tenta ler o objeto Token da resposta da API.
            var tokenResponse = await response.Content.ReadFromJsonAsync<Token>();
            if (tokenResponse != null && tokenResponse.Success)
            {
                // Armazena o token de acesso obtido.
                await _tokenService.SetTokenAsync(tokenResponse.AccessToken);

                // Retorna o objeto Token recebido da API.
                return tokenResponse;
            }
        }

        // Retorna um objeto Token informando falha no login.
        return new Token()
        {
            Success = false,
            Message = "Falha de cliente, entre em contato com administrador do sistema",
        };
    }
}
