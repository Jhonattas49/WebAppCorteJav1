using MudBlazor.Client.Shared.Models;

namespace MudBlazor.Client.Services.AuthState
{
    public class UserSessionState
    {
        private AddUserRequest? _userSession;

        private bool? _statusSession;


        public event Action? OnChange;

        public AddUserRequest? UserSession
        {
            get => _userSession;
            set
            {
                _userSession = value;
                NotifyStateChanged();
            }
        }

        public bool? StatusSession
        {
            get => _statusSession;
            set
            {
                _statusSession = value;
                NotifyStateChanged();
            }
        }
      
        private void NotifyStateChanged() => OnChange?.Invoke();
    }

    //public class UserSessionState
    //{
    //    private AddUserRequest? _userSession;
    //    private bool? _statusSession;

    //    public event Action? OnChange;

    //    public AddUserRequest? UserSession
    //    {
    //        get => _userSession;
    //        set
    //        {
    //            _userSession = value;
    //            NotifyStateChanged();
    //        }
    //    }

    //    private void NotifyStateChanged() => OnChange?.Invoke();

    //}
}
