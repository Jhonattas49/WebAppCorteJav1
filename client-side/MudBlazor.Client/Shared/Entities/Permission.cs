namespace MudBlazor.Client.Shared.Entities
{
    public class Permission
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public bool IsSelected { get; set; }
        public Color Color { get; set; } = Color.Default;
    }
}
