using System;
using FluentValidation;
using MediatR;

namespace Application.Core;

public class ValidationBehaviour<TRequest, TResponse>(IValidator<TRequest>? validator = null)
  : IPipelineBehavior<TRequest, TResponse> where TRequest : notnull
{
  public async Task<TResponse> Handle(TRequest request, RequestHandlerDelegate<TResponse> next, CancellationToken cancellationToken)
  {
    if (validator == null) return await next();

    var validationResult = await validator.ValidateAsync(request, cancellationToken);

    if (!validationResult.IsValid)
    {
      throw new ValidationException(validationResult.Errors);
    }

    return await next();
  }
}



/* 

This file defines a ValidationBehaviour class that integrates FluentValidation 
with MediatR's pipeline behavior system.

- Purpose:
  It ensures that any incoming request (TRequest) is validated before 
  being passed to its handler. If validation fails, an exception is thrown 
  and the handler is never executed.

- Key Components:
  • Inherits from IPipelineBehavior<TRequest, TResponse>:
    This allows it to run before and/or after the actual request handler 
    in MediatR's pipeline.

  • Constructor parameter (IValidator<TRequest>? validator):
    Accepts an optional FluentValidation validator for the request type. 
    If no validator is provided, the request simply continues without validation.

  • Handle method:
    - If no validator is registered, it calls the next delegate immediately.
    - If a validator exists, it runs ValidateAsync on the request.
    - If validation fails, it throws a ValidationException containing the errors.
    - If validation succeeds, it passes control to the next handler in the pipeline.

- Why it's useful:
  This pattern centralizes validation logic, ensuring that all requests 
  are validated consistently before reaching their handlers. It keeps 
  controllers/handlers clean and enforces business rules at the pipeline level.


  It is basically mediator middleware so sits in between the Command (the IRequest) and 
  the Handler. The TRequest would be the CreateActivity.Command and the TResponse 
  is the Result<Unit>. So the flow effectively is the mediator pipeline is kicked off 
  in the controller with  Mediator.Send() method and then it runs all the behaviors 
  that implement the IPipelineBehavior, including the ValidationBehavior so it 
  basically gets invoked before it gets to the handler.  

*/
