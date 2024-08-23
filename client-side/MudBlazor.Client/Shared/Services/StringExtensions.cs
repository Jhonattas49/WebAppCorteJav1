using System.Diagnostics.Metrics;

namespace MudBlazor.Client.Shared.Services
{
    public static class StringExtensions
    {
        public static string FirstLetterUpperCase(this string input)
        {
            if (string.IsNullOrEmpty(input))
                return input;

            return char.ToUpper(input[0]) + input.Substring(1).ToLower();
        }
    }
}
