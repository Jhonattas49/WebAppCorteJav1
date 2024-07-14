namespace ClientViewsMudBlazor.Services;
public class SomeService
{
    private readonly HttpClient _httpClient;
    private readonly TokenService _tokenService;

    public SomeService(HttpClient httpClient, TokenService tokenService)
    {
        _httpClient = httpClient;
        _tokenService = tokenService;
    }

    public async Task<string> GetProtectedDataAsync()
    {
        var token = await _tokenService.GetTokenAsync();
        if (!string.IsNullOrEmpty(token))
        {
            _httpClient.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);
        }

        var response = await _httpClient.GetAsync("some-protected-endpoint");
        if (response.IsSuccessStatusCode)
        {
            return await response.Content.ReadAsStringAsync();
        }
        else
        {
            // Tratar erros
            return null!;
        }
    }
}
