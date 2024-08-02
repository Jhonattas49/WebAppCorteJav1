namespace MudBlazor.Client.Shared.Attributes
{
    [AttributeUsage(AttributeTargets.Field, Inherited = false, AllowMultiple = false)]
    public sealed class CountryFlagIcon : Attribute
    {
        public string Name { get; set; } = default!;
        public string IconBase64 { get; set; } = default!;  
    }
}
