using System;
using Application.Activities.DTOs;
using AutoMapper;
using Domain;

namespace Application.Core;

public class MappingProfiles : Profile
{
  public MappingProfiles()
  {
    CreateMap<Activity, Activity>();
    CreateMap<CreateActivityDto, Activity>();
    CreateMap<EditActivityDto, Activity>(); 
  }
}

/* 

This profile configures AutoMapper to handle object-to-object mapping.
For Example: 
  - It allows copying properties between two Activity objects. (Activity, Activity)
  - It maps data from CreateActivityDto (used for input) into the Activity domain model. (CreateActivityDto, Activity)

This helps separate concerns: DTOs are used for API communication, while domain 
models represent the actual business entities in the application.

*/