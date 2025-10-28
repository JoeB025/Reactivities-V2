using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaseApiController : ControllerBase
    {
        private IMediator? _mediator;

        protected IMediator Mediator =>
            _mediator ??= HttpContext.RequestServices.GetService<IMediator>()
            ?? throw new InvalidOperationException("IMediator service is unavailable"); 
    }
}


// --------------------------------------------------------------------------------------
// FILE OVERVIEW:
// BaseApiController.cs
//
// PURPOSE:
// This abstract controller serves as a foundation for all API controllers in the project.
// It standardizes routing and provides shared access to the MediatR IMediator service.
//
// KEY FEATURES:
// - [Route("api/[controller]")]: Automatically maps derived controllers to "api/{controller-name}".
// - [ApiController]: Enables API-specific behaviors like automatic model validation.
// - Protected IMediator property: Lazily resolves the IMediator instance from the request's service provider.
//   This allows derived controllers to send MediatR commands/queries without manually injecting IMediator into each controller.
//
// USAGE:
// Inherit from BaseApiController in any controller that needs MediatR support:
//     public class UsersController : BaseApiController
//     {
//         public async Task<IActionResult> GetUser() =>
//             Ok(await Mediator.Send(new GetUserQuery()));
//     }
//
// DEPENDENCIES:
// - MediatR (for CQRS-style request handling)
// - ASP.NET Core MVC
// --------------------------------------------------------------------------------------
