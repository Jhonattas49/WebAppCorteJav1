using MudBlazor.Client.Domain;
using MudBlazor.Client.Sevices.Token;
using MudBlazor.Client.Shared.Models;

namespace MudBlazor.Client.Services.Repository
{
    public class LoginService
    {
        private readonly HttpClient _httpClient;
        private readonly AuthService _authService;
        private readonly TokenService _tokenService;
        private readonly CustomAuthenticationStateProvider _authenticationStateProvider;

        public LoginService(AuthService authService, HttpClient httpClient, TokenService tokenService, CustomAuthenticationStateProvider authenticationStateProvider)
        {
            _authService = authService;
            _httpClient = httpClient;
            _tokenService = tokenService;
            _authenticationStateProvider = authenticationStateProvider;
        }

        public async Task<ResponseData<AddUserRequest>> LoginAsync(InputLoginRequest loginRequest)
        {
            try
            {
                var response = await _httpClient.PostAsJsonAsync("login", loginRequest);
                if (!response.IsSuccessStatusCode)
                {
                    if ((int)response.StatusCode == 401)
                        return new ResponseData<AddUserRequest>(
                                message: "Login failed!",
                                error: response.StatusCode,
                                errorCode: "GENERAL_ERROR"
                            );
                    throw new Exception($"Login failed {response.StatusCode}");
                }

                var user = await response.Content.ReadFromJsonAsync<ResponseData<AddUserRequest>>();
                if (user != null)
                {
                    var token = _authService.GenerateToken(user: user.Data!);
                    await _tokenService.SetTokenAsync(token);

                    _authenticationStateProvider?.NotifyUserAuthentication(token);

                    return new ResponseData<AddUserRequest>(
                        message: "Login successful",
                        success: true,
                        data: user.Data!
                    );
                }

                return new ResponseData<AddUserRequest>(
                    message: "Login failed!",
                    error: response.StatusCode,
                    errorCode: "GENERAL_ERROR"
                );
            }
            catch (ArgumentException e)
            {
                return new ResponseData<AddUserRequest>(
                    message: e.Message,
                    error: e.StackTrace!,
                    errorCode: "ARGUMENT_ERROR"
                );
            }
            catch (Exception e)
            {
                return new ResponseData<AddUserRequest>(
                    message: e.Message,
                    error: e.StackTrace!,
                    errorCode: "GENERAL_ERROR"
                );
            }
        }

        public async Task<ResponseData<AddUserRequest>> ValidateSession()
        {
            // Obtém o token
            var token = await _tokenService.GetTokenAsync();
            // Valida o token
            var result = _authService.ValidToken(token);

            // Se o token não for válido
            if (!result)
            {         
                // Retorna uma resposta indicando que a sessão expirou
                return new ResponseData<AddUserRequest>(
                    message: "Sua sessão expirou. Por favor, faça login novamente para continuar.",
                    error: 401,
                    errorCode: "SESSION_EXPIRED"
                );
            }

            // Retorna uma resposta indicando que a sessão é válida
            return new ResponseData<AddUserRequest>(
                message: "Sessão regular.",
                success: true
            );
        }

        public async Task<bool> Logout()
        {
            // Remove o token armazenado
            await _tokenService.RemoveTokenAsync();
            return (await _tokenService.GetTokenAsync() != null);
        }
    }
}

