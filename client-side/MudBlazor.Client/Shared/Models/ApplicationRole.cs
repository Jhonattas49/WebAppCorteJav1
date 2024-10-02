namespace MudBlazor.Client.Shared.Models
{
    public class ApplicationRole
    {
        public string? Name { get; set; }
        public List<string>? Permissions { get; set; } = new();
        public bool IsActive { get; set; }
        public DateTime CreateDate { get; set; }
        public int __v { get; set; }
        public string? _id { get; set; }
        public Color Color { get; set; } = Color.Default;
        public bool Checked { get; set; }

        // Método para converter propriedades em array de Key-Value pairs
        public KeyValuePair<string, object>[] ToKeyValueArray()
        {
            return new[]
            {
            new KeyValuePair<string, object>(nameof(Name), Name ?? string.Empty),
            new KeyValuePair<string, object>(nameof(Permissions), Permissions ?? new List<string>()),
            new KeyValuePair<string, object>(nameof(IsActive), IsActive),
            new KeyValuePair<string, object>(nameof(CreateDate), CreateDate),
            new KeyValuePair<string, object>(nameof(__v), __v),
            new KeyValuePair<string, object>(nameof(_id), _id ?? string.Empty),
            new KeyValuePair<string, object>(nameof(Color), Color),
            new KeyValuePair<string, object>(nameof(Checked), Checked)
        };
        }
    }

}

