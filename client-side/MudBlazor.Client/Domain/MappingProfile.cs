using AutoMapper;
using MudBlazor.Client.Shared.Entities;
using MudBlazor.Client.Shared.Models;

namespace MudBlazor.Client.Domain
{
    public class MappingProfile: Profile
    {
        protected MappingProfile() 
        {
            CreateMap<Record, ApplicationUser>()
                .ReverseMap();

        }
    }
}
