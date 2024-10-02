namespace MudBlazor.Client.Domain
{
    public class SaltKeyService
    {
        public string SaltKey { get; }

        public SaltKeyService(string saltKey)
        {
            SaltKey = saltKey;
        }
    }

}
