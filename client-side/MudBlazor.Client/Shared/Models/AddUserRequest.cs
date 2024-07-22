using MudBlazor.Client.Shared.Entities;

namespace MudBlazor.Client.Shared.Models
{
    public class AddUserRequest
    {
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; }= string.Empty;
        public List<Contact> Contacts { get; set; } = default!;
        public List<string> Roles { get; set; } = default!;
    }
}
