using Microsoft.AspNetCore.Components;

using MudBlazor.Client.Services.Repository;
using MudBlazor.Client.Shared.Models;

namespace MudBlazor.Client.Components
{
    public class Componests : LayoutComponentBase
    {
        [Inject] public LoginService _loginService { get; set; } = default!;
        [Inject] public NavigationManager _navigation { get; set; } = default!;

        [Inject] public AddUserRequest _userSession { get; set; } = default!;
        [Inject] private ISnackbar Snackbar { get; set; } = default!;
        private Severity severity = default;

        public MudTheme? _theme = null;
        public bool _drawerOpen = true;
        public bool _isDarkMode = true;
        public bool IsLoginIn = false;


        protected override void OnInitialized()
        {
            base.OnInitialized();

            _theme = new()
            {
                PaletteLight = _lightPalette,
                PaletteDark = _darkPalette,
                LayoutProperties = new LayoutProperties()
            };
        }

        public async Task LoginAsync(InputLoginRequest input)
        {
            var result = await _loginService.LoginAsync(input);
            if (!result.Success)
            {
                ShowMessage(result.Message!, type: Severity.Error);
                return;
            }

            _navigation.NavigateTo("/login");
        }

        private void ShowMessage(string mensagem, Severity type)
        {
            Snackbar.Add(mensagem, type, config =>
            {
                config.VisibleStateDuration = 5000;
                config.HideTransitionDuration = 500;
                config.ShowTransitionDuration = 500;
            });
            Snackbar.Configuration.PositionClass = Defaults.Classes.Position.BottomStart;
        }
        public void DrawerToggle()
        {
            _drawerOpen = !_drawerOpen;
        }

        public void DarkModeToggle()
        {
            _isDarkMode = !_isDarkMode;
        }

        private readonly PaletteLight _lightPalette = new()
        {
            Black = "#110e2d",
            AppbarText = "#424242",
            AppbarBackground = "rgba(255,255,255,0.8)",
            DrawerBackground = "#ffffff",
            GrayLight = "#e8e8e8",
            GrayLighter = "#f9f9f9",
        };

        private readonly PaletteDark _darkPalette = new()
        {
            Primary = "#7e6fff",
            Surface = "#1e1e2d",
            Background = "#1a1a27",
            BackgroundGray = "#151521",
            AppbarText = "#92929f",
            AppbarBackground = "rgba(26,26,39,0.8)",
            DrawerBackground = "#1a1a27",
            ActionDefault = "#74718e",
            ActionDisabled = "#9999994d",
            ActionDisabledBackground = "#605f6d4d",
            TextPrimary = "#b2b0bf",
            TextSecondary = "#92929f",
            TextDisabled = "#ffffff33",
            DrawerIcon = "#92929f",
            DrawerText = "#92929f",
            GrayLight = "#2a2833",
            GrayLighter = "#1e1e2d",
            Info = "#4a86ff",
            Success = "#3dcb6c",
            Warning = "#ffb545",
            Error = "#ff3f5f",
            LinesDefault = "#33323e",
            TableLines = "#33323e",
            Divider = "#292838",
            OverlayLight = "#1e1e2d80",
        };

        public string DarkLightModeButtonIcon => _isDarkMode switch
        {
            true => Icons.Material.Rounded.AutoMode,
            false => Icons.Material.Outlined.DarkMode,
        };
    }
}
