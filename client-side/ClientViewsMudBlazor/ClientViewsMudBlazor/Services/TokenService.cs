using Microsoft.JSInterop;


namespace ClientViewsMudBlazor.Services;
public class TokenService
{
    private readonly IJSRuntime _jsRuntime;
    private const string TokenKey = "authToken";

    public TokenService(IJSRuntime jsRuntime)
    {
        _jsRuntime = jsRuntime;
    }

    public async Task SetTokenAsync(string token)
    {
        await _jsRuntime.InvokeVoidAsync("localStorage.setItem", TokenKey, token);
    }

    public async Task<string> GetTokenAsync()
    {
        var tk = await _jsRuntime.InvokeAsync<string>("localStorage.getItem", TokenKey);
       // Console.WriteLine(tk);
        return tk;
    }

    public async Task RemoveTokenAsync()
    {
        await _jsRuntime.InvokeVoidAsync("localStorage.removeItem", TokenKey);
    }
}
