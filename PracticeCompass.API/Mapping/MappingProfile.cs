
using AutoMapper;
using System.Linq;
using PracticeCompass.API.DTOs;
using PracticeCompass.API.Entities;

namespace PracticeCompass.API.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<User, UserDto>();
            CreateMap<UserDto, User>();
        }
    }
}
