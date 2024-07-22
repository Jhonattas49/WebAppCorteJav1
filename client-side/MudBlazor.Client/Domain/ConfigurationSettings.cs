namespace MudBlazor.Client.Domain
{
    public class ConfigurationSettings
    {
        public string API_BASE_URL { get; set; } = string.Empty;
        public string SALT_KEY { get; set; } = string.Empty;
        public string MongoDbUri { get; set; } = string.Empty;
        public string Issuer { get; set; }= string.Empty;
        public string Audience { get; set; } = string.Empty;
        public string Key { get; set; } = string.Empty;
        public string ExpiryInMinutes { get; set; } = string.Empty;
    }

}
