using System;
using Application.Activities.Commands;
using Application.Activities.DTOs;
using Application.Activities.Queries;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class ActivitiesController : BaseApiController
{

  [HttpGet]
  public async Task<ActionResult<List<Activity>>> GetActivities()
  {
    return await Mediator.Send(new GetActivityList.Query());
  }


  [HttpGet("{id}")]
  public async Task<ActionResult<Activity>> GetActivityDetail(string id)
  {
    return HandleResult(await Mediator.Send(new GetActivityDetails.Query { Id = id }));
  }

  [HttpPost]
  public async Task<ActionResult<string>> CreateActivity(CreateActivityDto activityDto)
  {
    // return await Mediator.Send(new CreateActivity.Command { ActivityDto = activityDto });
    return HandleResult(await Mediator.Send(new CreateActivity.Command { ActivityDto = activityDto }));
  }

  [HttpPut]
  public async Task<ActionResult> EditActivity(EditActivityDto activity)
  {
    return HandleResult(await Mediator.Send(new EditActivity.Command { ActivityDto = activity }));
  }

  [HttpDelete("{id}")]
  public async Task<ActionResult> DeleteActivity(string id)
  {
    return HandleResult(await Mediator.Send(new DeleteActivity.Command { Id = id }));
  }


}


// Everything derives from the Base API Controller 


// ------------------------------------------------------------
// FILE FLOW EXPLANATION:
//
// 1. The user sends an HTTP request to the API (e.g., GET /api/activities).
//
// 2. The ActivitiesController receives the request and calls Mediator.Send(...)
//    with a specific command or query (e.g., GetActivityList.Query).
//
// 3. MediatR dispatches the query to its corresponding handler
//    (e.g., GetActivityList.Handler), which contains the logic to process it.
//
// 4. The handler uses the AppDbContext to query the database
//    and returns the result (e.g., a list of Activity objects).
//
// 5. The controller receives the result and returns it as an HTTP response
//    (e.g., JSON) to the client or frontend view.
//
// BENEFITS:
// - Keeps controllers thin and focused on HTTP concerns.
// - Moves business/data logic into separate handlers.
// - Promotes clean architecture using the CQRS pattern.
// ------------------------------------------------------------


