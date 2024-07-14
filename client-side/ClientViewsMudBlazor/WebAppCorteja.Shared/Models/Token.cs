namespace WebAppCorteja.Shared.Models
{
    public class Token
    {
        public string AccessToken { get; set; } = default!;
        public string Message { get; set; } = default!;
        public bool Success { get; set; } = default!;
    }
}