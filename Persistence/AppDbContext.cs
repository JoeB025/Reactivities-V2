using System;
using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence;

public class AppDbContext(DbContextOptions options) : DbContext(options)
{
  public required DbSet<Activity> Activities { get; set; }
}


/*
AppDbContext is a custom class that inherits from DbContext, which is a base class provided by Entity Framework Core.
By using the syntax `: DbContext(options)`, we're telling C# that AppDbContext should derive from (or inherit) all the functionality of DbContext,
and we're passing in configuration options that tell EF Core how to connect to the database (e.g., provider, connection string).

DbContext acts as a bridge between our C# code and the database. It provides built-in methods for querying, saving, and managing data.
When AppDbContext inherits from DbContext, it gains access to those capabilities — like tracking changes, saving entities, and configuring tables.

The property `DbSet<Activity> Activities` tells EF Core that we want to work with a table of Activity records.
DbSet<T> is a generic class where T is the type of entity — in this case, Activity — and it represents a table in the database.
The property name `Activities` becomes the table name by convention, and EF Core uses this to map queries and updates to the correct table.

This setup allows us to define our own database structure while still using all the powerful features of Entity Framework.
In short: AppDbContext becomes our application's gateway to the database, powered by the tools and behaviors of DbContext.

Hover over DbContext for a full explanation of what it does. 
*/



/*
The Domain layer is where the core business logic of the application lives. 
For example, if we need to calculate a customer's age based on their date of birth, 
that logic would belong in the Domain — because it's part of the business rules.

System.Diagnostics, on the other hand, is a .NET namespace used for diagnostics and logging. 
It's not about business logic, but about observing and troubleshooting how the application behaves. 
For instance, if something goes wrong during the age calculation, we might use System.Diagnostics 
to log the error or trace the issue for debugging purposes.
*/

