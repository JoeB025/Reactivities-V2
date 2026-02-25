using System;
using API.DTOs;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class AccountController(SignInManager<User> signInManager) : BaseApiController
{
  [AllowAnonymous]
  [HttpPost("register")]
  public async Task<ActionResult> RegisterUser(RegisterDto registerDto)
  {
    var user = new User
    {
      UserName = registerDto.Email,
      Email = registerDto.Email,
      DisplayName = registerDto.DisplayName
    }; 

    var result = await signInManager.UserManager.CreateAsync(user, registerDto.Password); 

    if (result.Succeeded) return Ok(); 

    foreach (var error in result.Errors)
    {
      ModelState.AddModelError(error.Code, error.Description);     
    }
    
    return ValidationProblem(); 
  }

  [AllowAnonymous]
  [HttpGet("user-info")]
  public async Task<ActionResult> GetUserInfo()
  {
    // if the user is not authenticated, just return no content. 
    if (User.Identity?.IsAuthenticated == false) return NoContent();

    // if they are authenticated, we can return the info. 
    var user = await signInManager.UserManager.GetUserAsync(User);

    if (user == null) return Unauthorized(); 

    return Ok(new
    {
      user.DisplayName,
      user.Email,
      user.Id,
      user.ImageUrl
    });     
  }

  [HttpPost("logout")]
  public async Task<ActionResult> Logout()
  {
    // sign the current user out of the application (will also remove the cookie so the user will be signed out of the client side application as well)
    await signInManager.SignOutAsync(); 
    
    // nothing to send back now they are signed out so just return NoContent. 
    return NoContent(); 
  }

}; 
