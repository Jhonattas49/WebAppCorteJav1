using AutoMapper;
using MudBlazor.Client.Shared.Entities;

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
