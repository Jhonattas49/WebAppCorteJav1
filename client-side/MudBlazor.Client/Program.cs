using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Components.Authorization;
using Microsoft.AspNetCore.Identity;
using MudBlazor.Client.Components;
using MudBlazor.Client.Domain;
using MudBlazor.Client.Services.AuthState;
using MudBlazor.Client.Services.Repository;
using MudBlazor.Client.Sevices.Token;
using MudBlazor.Client.Shared.Attributes;
using MudBlazor.Client.Shared.Models;
using MudBlazor.Client.Shared.Services;
using MudBlazor.Services;

var builder = WebApplication.CreateBuilder(args);

// Add MudBlazor services
builder.Services.AddMudServices();

#region Configuration
IConfiguration configuration = builder.Configuration;
builder.Services.Configure<ConfigurationSettings>(configuration.GetSection("ConfigurationServer"));
builder.Services.Configure<ConfigurationSettings>(configuration.GetSection("Jwt"));

var configSettings = new ConfigurationSettings();
configuration.GetSection("ConfigurationServer").Bind(configSettings);
configuration.GetSection("ConnectionStrings").Bind(configSettings);
configuration.GetSection("Jwt").Bind(configSettings);
builder.Services.AddSingleton(configSettings);
#endregion

// Add services to the container
builder.Services.AddRazorComponents()
    .AddInteractiveServerComponents();

#region API Configuration
builder.Services.AddScoped(sp =>
{
    var settings = sp.GetRequiredService<ConfigurationSettings>();
    return new HttpClient { BaseAddress = new Uri(settings.API_BASE_URL) };
});
#endregion

#region Authentication Configuration
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(option =>
    {
        option.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
        {
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = configSettings.Issuer,
            ValidAudience = configSettings.Audience,
            IssuerSigningKey = JwtSecurityKey.Create(configSettings.SALT_KEY)
        };

        option.Events = new JwtBearerEvents
        {
            OnAuthenticationFailed = context =>
            {
                Console.WriteLine("Authentication failed: " + context.Exception.Message);
                return Task.CompletedTask;
            },
            OnTokenValidated = context =>
            {
                Console.WriteLine("Token validated: " + context.SecurityToken);
                return Task.CompletedTask;
            }
        };
    });
#endregion

#region Identity Configuration
builder.Services.AddIdentity<IdentityUser, IdentityRole>(options =>
{
    options.Password.RequireDigit = true;
    options.Password.RequireLowercase = true;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequireUppercase = true;
    options.Password.RequiredLength = 6;
    options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);
    options.Lockout.MaxFailedAccessAttempts = 5;
    options.SignIn.RequireConfirmedAccount = true;
})
.AddDefaultTokenProviders();

builder.Services.AddScoped<IUserStore<IdentityUser>, CustomUserStore>();
builder.Services.AddScoped<IRoleStore<IdentityRole>, CustomRoleStore>();
#endregion

//Register services
builder.Services.AddScoped<AddUserRequest>();
builder.Services.AddScoped<AuthService>();
builder.Services.AddScoped<TokenService>();
builder.Services.AddScoped<LoginService>();
builder.Services.AddScoped<AuthorizationAttribute>();
builder.Services.AddScoped<LoadJSInterop>();
builder.Services.AddSingleton<UserSessionState>();
builder.Services.AddSingleton<ComponentTracker>();
builder.Services.AddAuthorizationCore(options =>
{
    options.AddPolicy("RequireAuthenticatedUser", policy =>
    {
        policy.RequireAuthenticatedUser();
    });
});
// Configurar AutoMapper
builder.Services.AddAutoMapper(typeof(MappingProfile));
// Configura a autenticação
builder.Services.AddScoped<CustomAuthenticationStateProvider>();
builder.Services.AddScoped<AuthenticationStateProvider>(provider => provider.GetRequiredService<CustomAuthenticationStateProvider>());

//await builder.Build().RunAsync();
var app = builder.Build();

// Configure the HTTP request pipeline
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseStaticFiles();
app.UseAntiforgery();

app.MapRazorComponents<App>()
    .AddInteractiveServerRenderMode();

app.Run();
