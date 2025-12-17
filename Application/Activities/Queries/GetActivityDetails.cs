using System;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities.Queries;

public class GetActivityDetails
{
  public class Query : IRequest<Result<Activity>>
  {
    public required string Id { get; set; }
  }

  public class Handler(AppDbContext context) : IRequestHandler<Query, Result<Activity>>
  {
    public async Task<Result<Activity>> Handle(Query request, CancellationToken cancellationToken)
    {
      var activity = await context.Activities.FindAsync([request.Id], cancellationToken);

      if (activity == null) return Result<Activity>.Failure("Activity not found", 404);

      return Result<Activity>.Success(activity);
    }
  }
}



/* 

This file defines the GetActivityDetails query and its handler, 
which are part of the CQRS pattern using MediatR.

- Purpose:
  It retrieves a single Activity entity from the database by its Id. 
  Instead of returning the raw Activity object, it wraps the result 
  in a Result<T> type to provide structured success/failure responses.

- Key Components:
  • Query class:
    - Implements IRequest<Result<Activity>>.
    - Contains the required Id property, which specifies the Activity to fetch.

  • Handler class:
    - Implements IRequestHandler<Query, Result<Activity>>.
    - Uses AppDbContext (Entity Framework Core) to query the Activities table.
    - Calls FindAsync with the provided Id to locate the Activity.

  • Handle method:
    - If the Activity is not found, returns Result.Failure with an error message and HTTP status code (404).
    - If the Activity is found, returns Result.Success containing the Activity object.

- Why it's useful:
  This approach separates the query logic from controllers, 
  keeps the code clean, and provides consistent error handling. 
  By returning a Result<T>, the application can distinguish between 
  successful and failed operations without relying on null checks 
  or exceptions alone.
  
*/
