using Maroodi.Application.Interfaces;
using Maroodi.Application.UseCases;
using Maroodi.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

//Dependency Injection
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<UserService>();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

//TOFIX
builder.Services.AddOpenApi();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

using (var scope = app.Services.CreateScope())
{
   
    var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    dbContext.Database.Migrate();
}

// Redirect root to /users
app.MapGet("/", () => Results.Redirect("/users/"));
// Health check endpoint
app.MapGet("/health", () => Results.Ok(new { status = "ok" }));

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
