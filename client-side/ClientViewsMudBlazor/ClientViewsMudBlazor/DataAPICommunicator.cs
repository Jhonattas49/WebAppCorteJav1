using ClientViewsMudBlazor.Services;
using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;
using System.Net.Http.Json;
using WebAppCorteja.Shared.Models;

namespace ClientViewsMudBlazor
{
    public class DataAPICommunicator<T> :  LayoutComponentBase
    {
        // Injeção de dependências
        [Inject] public AuthService _authService { get; set; } = default!;
        [Inject] public NavigationManager _navigation { get; set; } = default!;
        [Inject] public IJSRuntime JSRuntime { get; set; } = default!;
        [Inject] public TokenService? _tokenService { get; private set; }
        [Inject] public ILogger<DataAPICommunicator<T>> Logger { get; set; } = default!;
        [Inject] public HttpClient _httpClient { get; set; } = default!;

        public Record Record = null!;

        public bool isInitialized { get; set; }
   
        protected override async Task OnInitializedAsync()
        {
            isInitialized = true;
            var token = await _tokenService!.GetTokenAsync() ?? string.Empty;
            if (!string.IsNullOrEmpty(token))
            {
                await GetUserTokenAsync("getdatauser", token);
            }

            await base.OnInitializedAsync();
        }

        public async Task GetUserTokenAsync(string path, string token)
        {
            try
            {
                var request = new HttpRequestMessage(HttpMethod.Get, path);

                if (!string.IsNullOrEmpty(token))
                {
                    request.Headers.Add("x-access-token", token);
                }

                var response = await _httpClient.SendAsync(request);

                if (response.IsSuccessStatusCode)
                {
                    Record =  await response.Content.ReadFromJsonAsync<Record>() ?? new Record();                 
                    //return result;
                }
                else
                {
                    Logger.LogError($"Failed to get data from {path}: {response.ReasonPhrase}");
                    //return default;
                }
            }
            catch (Exception ex)
            {
                Logger.LogError(ex, $"Exception occurred while getting data from {path}");
                //return default;
            }
        }
    }
}
