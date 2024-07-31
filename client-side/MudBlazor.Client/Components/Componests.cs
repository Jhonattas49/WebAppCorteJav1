using Microsoft.AspNetCore.Components;
using Microsoft.EntityFrameworkCore.Internal;
using Microsoft.IdentityModel.Tokens;
using MudBlazor.Client.Domain;
using MudBlazor.Client.Services.AuthState;
using MudBlazor.Client.Services.Repository;
using MudBlazor.Client.Shared.Attributes;
using MudBlazor.Client.Shared.Entities;
using MudBlazor.Client.Shared.Models;
using MudBlazor.Client.Shared.Services;
using System.Reflection;
using System.Security.Claims;
using System.Xml.Linq;
using static MudBlazor.CategoryTypes;

namespace MudBlazor.Client.Components
{
    public class Componests : LayoutComponentBase
    {
        [Inject] public LoginService _loginService { get; set; } = default!;
        [Inject] public NavigationManager _navigation { get; set; } = default!;
        [Inject] public CustomAuthenticationStateProvider _customAuthenticationStateProvider { get; set; } = default!;
        [Inject] private ISnackbar Snackbar { get; set; } = default!;
        [Inject] public LoadJSInterop _loadJSInterop { get; set; } = default!;
        [Inject] public UserSessionState _userSessionState { get; set; } = default!;
        [Inject] public AuthorizationAttribute _hasAuthorization { get; set; } = default!;

        private bool? _statusAuthorized = null!;
        public bool AttributeAuthorizedToStart { get; set; }//O atributo só informa se o componente pode iniciar

        protected override async Task OnAfterRenderAsync(bool firstRender)
        {
            if (firstRender)
            {
                _statusAuthorized = _hasAuthorization.HasAuthorization(Body!).IsAuthorized;

                if (_userSessionState.StatusSession == null)
                {
                    await LoadUserSessionAsync();
                    StateHasChanged();

                }

                //Se esta tentando acessar uma area protegida 
                if (_statusAuthorized != null && _statusAuthorized.Value)
                {
                    //Se o status de userSession é null ou userSessionState.StatusSession é falso
                    if (_userSessionState.StatusSession == null)
                    {
                        _navigation.NavigateTo("/");
                        ShowMessage("Agradecemos seu interesse em nosso conteúdo! No entanto, a página que você está buscando exige um login específico. Para ter acesso a essa área exclusiva, por favor, faça o login com suas credenciais ou entre em contato conosco para obter mais informações.",
                        type: Severity.Info, duration: 6000);
                    }
                    else if (!_userSessionState.StatusSession!.Value)
                    {
                        _navigation.NavigateTo("/login");
                        await Logout();
                        ShowMessage("Por favor, faça login para visualizar este conteúdo.",
                        type: Severity.Warning);
                    }
                }
                AttributeAuthorizedToStart = true;
                StateHasChanged();
            }

            await base.OnAfterRenderAsync(firstRender);
        }

        private async Task LoadUserSessionAsync()
        {
            var authState = await _customAuthenticationStateProvider.GetAuthenticationStateAsync();
            if (authState.User.Identity?.IsAuthenticated ?? false)
            {
                _userSessionState.UserSession = ConstructUserSession(authState.User);
                var result = await _loginService.ValidateSession();
                _userSessionState.StatusSession = result.Success;
            }
        }

        private AddUserRequest ConstructUserSession(ClaimsPrincipal principal)
        {
            // Obtém o claim "Name"
            var nameClaim = principal.Claims.FirstOrDefault(c => c.Type == "Name");
            var name = nameClaim?.Value ?? string.Empty;

            // Obtém o claim "Email"
            var emailClaim = principal.Claims.FirstOrDefault(c => c.Type == "Email");
            var email = emailClaim?.Value ?? string.Empty;

            // Obtém o claim "Contacts" e converte de volta para uma lista
            var contactsClaim = principal.Claims.FirstOrDefault(c => c.Type == "Contacts");
            var contacts = contactsClaim?.Value?.Split(',').Select(c => new Contact { /* Inicializar os contatos conforme necessário */ }).ToList()
                            ?? new List<Contact>();

            // Obtém o claim "Roles" e converte de volta para uma lista
            var rolesClaim = principal.Claims.FirstOrDefault(c => c.Type == "Roles");
            var roles = rolesClaim?.Value?.Split(',').ToList() ?? new List<string>();

            // Cria e retorna o objeto AddUserRequest
            return new AddUserRequest
            {
                Name = name,
                Email = email,
                Contacts = contacts,
                Roles = roles
            };
        }

        public async Task LoginAsync(InputLoginRequest input)
        {
            var result = await _loginService.LoginAsync(input);
            if (!result.Success)
            {
                ShowMessage(result.Message!, type: Severity.Error);
                //_navigation.NavigateTo("/login");
                StateHasChanged();
                return;
            }
            else
            {
                await LoadUserSessionAsync(); // Update session after login
                ShowMessage(result.Message!, type: Severity.Success);
                _navigation.NavigateTo("/admin");
                return;
            }


        }

        public async Task<bool> Logout()
        {
            if (_userSessionState != null)
                if (!await _loginService.Logout())
                {
                    _userSessionState.UserSession = null!;
                    _userSessionState = null!;
                }
            return false;
        }

        private void ShowMessage(string mensagem, Severity type, int duration = 5000)
        {
            Snackbar.Add(mensagem, type, config =>
            {
                config.VisibleStateDuration = duration;
                config.HideTransitionDuration = 500;
                config.ShowTransitionDuration = 500;
            });
            Snackbar.Configuration.PositionClass = Defaults.Classes.Position.BottomStart;
        }
    }
}
