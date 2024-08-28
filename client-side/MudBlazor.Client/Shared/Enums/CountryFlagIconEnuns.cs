using MudBlazor.Client.Shared.Attributes;
using MudBlazor.Client.Shared.Services;

namespace MudBlazor.Client.Shared.Enums
{
    public enum CountryFlagIconEnuns
    {
        [CountryFlagIcon(Name = "Brazil", IconBase64 = Img64Page.ImagFlags.Brazil16x)]
        Brazil = 55,

        [CountryFlagIcon(Name = "United States", IconBase64 = Img64Page.ImagFlags.USA16x)]
        USA = 1,

        [CountryFlagIcon(Name = "Canada", IconBase64 = Img64Page.ImagFlags.Canada16x)]
        Canada = 2,

        [CountryFlagIcon(Name = "Argentina", IconBase64 = Img64Page.ImagFlags.Argentina16x)]
        Argentina = 3,
    }
    public enum TypeNumber
    {
        [CountryFlagIcon(Name = "WhatsApp", IconBase64 = Img64Page.WhatsApp24)]
        WhatsApp24 = 0,
        [CountryFlagIcon(Name = "WhatsApp", IconBase64 = Img64Page.WhatsAppDark24)]
        WhatsApp24Dark = 1,       
    }
}
