using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDataContext>();

builder.Services.AddCors(options =>
    options.AddPolicy("Acesso Total",
        configs => configs
            .AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod())
);

var app = builder.Build();

app.MapGet("/", () => "Diogo Steinke Deconto");

//ENDPOINTS DE TAREFA
//GET: http://localhost:5273/api/chamado/listar
app.MapGet("/api/chamado/listar", ([FromServices] AppDataContext ctx) =>
{
    if (ctx.Chamados.Any())
    {
        return Results.Ok(ctx.Chamados.ToList());
    }
    return Results.NotFound("Nenhum chamado encontrada");
});

//POST: http://localhost:5273/api/chamado/cadastrar
app.MapPost("/api/chamado/cadastrar", ([FromServices] AppDataContext ctx, [FromBody] Chamado chamado) =>
{
    ctx.Chamados.Add(chamado);
    ctx.SaveChanges();
    return Results.Created("", chamado);
});

//PUT: http://localhost:5273/chamado/alterar/{id}
app.MapPut("/api/chamado/alterar/{id}", ([FromServices] AppDataContext ctx, [FromRoute] string id) =>
{
    //Implementar a alteração do status do chamado
    Chamado? chamado = ctx.Chamados.Find(id);
    if(chamado is null)
    {
        return Results.NotFound("Chamado não encontrado!");
    } 

    if(chamado.Status == "Aberto")
    {
        chamado.Status = "Em atendimento";
    }
    else if (chamado.Status == "Em atendimento")
    {
        chamado.Status = "Resolvido";
    }

    ctx.Chamados.Update(chamado);
    ctx.SaveChanges();
    return Results.Ok(chamado);

});

//GET: http://localhost:5273/chamado/naoresolvidos
app.MapGet("/api/chamado/naoresolvidos", ([FromServices] AppDataContext ctx) =>
{
    //Implementar a listagem dos chamados não resolvidos
    return Results.Ok(ctx.Chamados.Where(x => x.Status != "Resolvido"));
});

//GET: http://localhost:5273/chamado/resolvidos
app.MapGet("/api/chamado/resolvidos", ([FromServices] AppDataContext ctx) =>
{
    //Implementar a listagem dos chamados resolvidos
    return Results.Ok(ctx.Chamados.Where(x => x.Status == "Resolvido"));
});

app.UseCors("Acesso Total");
app.Run();
