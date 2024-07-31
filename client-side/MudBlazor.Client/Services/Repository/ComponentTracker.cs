using MudBlazor.Client.Shared.Attributes;

namespace MudBlazor.Client.Services.Repository
{
    public class ComponentTracker
    {
        private readonly List<Type> _loadedComponents = new List<Type>();

        public void RegisterComponent(Type componentType)
        {
            if (!_loadedComponents.Contains(componentType))
            {
                _loadedComponents.Add(componentType);
            }
        }

        public bool HasAuthorizationAttribute()
        {
            foreach (var component in _loadedComponents)
            {
                var attributes = component.GetCustomAttributes(typeof(AuthorizationAttribute), true);
                if (attributes.Length > 0)
                {
                    return true;
                }
            }
            return false;
        }
    }

}
