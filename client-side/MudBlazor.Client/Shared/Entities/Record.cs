namespace MudBlazor.Client.Shared.Entities
{
    public class Record
    {
        public string RecordID { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public List<Contact> Contacts { get; set; } = default!;
        public List<string> Roles { get; set; } = default!;
        public int? iat { get; set; }
        public int? exp { get; set; }
    }
}
