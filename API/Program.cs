using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using Persistence;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddDbContext<AppDbContext>(opt =>
{
  opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
}); 

var app = builder.Build();

// Configure the HTTP request pipeline.


/* 
This is middleware that provides the routing. So when we have incoming endpoint requests to our API (E.G trying to find a certain page), 
it knows what controller to pass the equest on to. 
*/
app.MapControllers();



using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;

try
{
  var context = services.GetRequiredService<AppDbContext>();
  await context.Database.MigrateAsync();
  await DbInitialiser.SeedData(context); 
}
catch (Exception ex)
{
  var logger = services.GetRequiredService<ILogger<Program>>();
  logger.LogError(ex, "An error occured during migration.");  
}


app.Run();


// This is what we execute when we run 'dotnet watch' or ''dotnet run' 
// We add all our services in this file. 