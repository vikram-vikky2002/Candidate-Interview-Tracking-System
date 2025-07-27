using CITS_DataAccessLayer;

namespace CITS_WebServices
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddControllers();

            // Enable CORS for Angular client
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAngularClient",
                    policy => policy.WithOrigins("http://localhost:4200")
                                    .AllowAnyHeader()
                                    .AllowAnyMethod());
            });

            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen(c =>
            {
                c.CustomSchemaIds(type => type.FullName);
            });

            builder.Services.AddTransient<InterviewRepository>();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            // Enable CORS (must be before UseAuthorization)
            app.UseCors("AllowAngularClient");

            app.UseHttpsRedirection();
            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}
