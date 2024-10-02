using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.RenderTree;

namespace MudBlazor.Client.Shared.Attributes
{
    using System;
    using System.Linq;
    using System.Net;
    using System.Reflection;
    using Microsoft.AspNetCore.Components;

    [AttributeUsage(AttributeTargets.Class, Inherited = true, AllowMultiple = true)]
    public class AuthorizationAttribute : Attribute
    {
        private bool? _isAuthorized;

        public event Action? OnChange;

        public AuthorizationAttribute()
        {
        }

        public AuthorizationAttribute HasAuthorization(RenderFragment body)
        {
            if (body?.Target is RouteView routeView)
            {
                var pageType = routeView.RouteData.PageType;
                this._isAuthorized = pageType.GetCustomAttributes(typeof(AuthorizationAttribute), inherit: true).Any();
                NotifyStateChanged();
            }
            return this;    
        }
        public bool? IsAuthorized => _isAuthorized;
        private void NotifyStateChanged() => OnChange?.Invoke();
    }


}


