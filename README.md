# Movie List API

A REST API for managing a film collection, built with ASP.NET Core and Entity
Framework Core, with a small browser front end served from the same application.

## API

The API follows REST conventions and returns the appropriate status codes rather
than always returning 200.

| Method | Route             | Description        | Responses                  |
|--------|-------------------|--------------------|----------------------------|
| GET    | `/api/Movies`     | List all films     | `200 OK`                   |
| GET    | `/api/Movies/{id}`| Get one film       | `200 OK`, `404 Not Found`  |
| POST   | `/api/Movies`     | Create a film      | `201 Created`              |
| PUT    | `/api/Movies/{id}`| Update a film      | `204 No Content`, `400 Bad Request`, `404 Not Found` |
| DELETE | `/api/Movies/{id}`| Delete a film      | `204 No Content`, `404 Not Found` |

A film is represented as:

```json
{
  "id": 1,
  "title": "Blade Runner 2049",
  "genre": "Science fiction",
  "year": 2017
}
```

`MovieListApp.http` contains a request for each endpoint and can be run directly
from Visual Studio or the VS Code REST client.

## Tech stack

C# on .NET 8, ASP.NET Core Web API, Entity Framework Core 8 with the SQL Server
provider and code-first migrations, Swagger via Swashbuckle, and a front end in
plain HTML, CSS and JavaScript using the Fetch API.

## How it is put together

The database context is registered in `Program.cs` and injected into the
controller through its constructor, so the controller never constructs its own
dependencies:

```csharp
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
```

The schema is defined by the `Movie` class rather than by hand-written SQL.
Entity Framework generates the migration and creates the matching table, which
keeps the C# model and the database in step.

Every action is asynchronous. Database calls use `await` with the async EF Core
methods, so the request thread is released while the query runs instead of
blocking on it.

`POST` returns `CreatedAtAction`, which sends back `201` together with a
`Location` header pointing at the new resource.

## Getting started

Prerequisites: .NET 8 SDK and SQL Server LocalDB.

```bash
git clone https://github.com/LarissaCojocaru/MovieListApp.git
cd MovieListApp
dotnet restore
dotnet ef database update
dotnet run
```

If the EF tooling is not installed yet, add it with
`dotnet tool install --global dotnet-ef`.

The application starts on the port shown in the console. The front end is served
at the root and Swagger UI is available at `/swagger` when running in
development.

## Configuration

The connection string is read from `appsettings.json` and points at LocalDB by
default:

```
Server=(localdb)\mssqllocaldb;Database=MovieDB;Trusted_Connection=True;MultipleActiveResultSets=true
```

It uses Windows integrated authentication, so it contains no credentials.
