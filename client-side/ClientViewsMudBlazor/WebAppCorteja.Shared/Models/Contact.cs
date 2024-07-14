namespace WebAppCorteja.Shared.Models
{
    public class Contact
    {
        public string number { get; set; } = string.Empty;
        public bool isWhatsApp { get; set; }
        public bool isActive { get; set; }
        public string _id { get; set; } = string.Empty;
    }
}
