# Node.js Express TypeScript Template

A production-ready Node.js Express boilerplate built with TypeScript, PostgreSQL, and TypeORM. Designed for teams that want a solid foundation with clear architectural patterns and no magic.

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js 22 |
| Language | TypeScript 5.6+ (strict mode) |
| Framework | Express 4.x |
| Database | PostgreSQL 12+ |
| ORM | TypeORM 0.3.x |
| Dependency Injection | TypeDI |
| Validation | Joi |
| Auth | JWT (jsonwebtoken) + Argon2 |
| Logging | Winston |
| API Docs | swagger-autogen + Swagger UI |

## Architecture

The project follows **Domain-Driven Design (DDD)**. Each domain is self-contained with its own controller, service, repository, routes, entities, DTOs, and validators.

```
src/
├── common/
│   ├── constants/           # HTTP status codes, error/success messages
│   ├── errors/              # Base CustomError class
│   ├── exceptions/          # Typed HTTP exceptions (NotFoundException, etc.)
│   ├── middleware/
│   │   ├── authenticate.middleware.ts   # JWT Bearer token verification
│   │   ├── authorize.middleware.ts      # Role-based access control (requireRole, requireAllRoles)
│   │   ├── error-handler.middleware.ts  # Global error handler + 404 handler
│   │   └── validate.middleware.ts       # Joi request validation
│   └── utils/
│       ├── async-handler.ts     # Wraps async route handlers
│       ├── logger.ts            # Winston logger instance
│       ├── response.util.ts     # generateResponse() helper
│       └── swagger/             # Swagger definition files + generator
├── db/
│   └── data-source.ts       # TypeORM DataSource (single source of truth)
├── domains/
│   ├── healthCheck/         # GET /health — public, unversioned
│   └── example/             # GET|POST /api/v1/example
│       └── subDomains/
│           └── example2/    # CRUD under /api/v1/example/example2
├── migrations/              # Raw SQL TypeORM migrations
├── types/                   # Express request augmentation (req.user)
└── index.ts                 # App bootstrap (Application class)
```

### Key Design Decisions

- **SQL-first migrations**: Entities are for runtime ORM mapping only. The database schema is owned by raw SQL migrations — `synchronize` and `migrationsRun` are always `false`.
- **Dependency Injection**: TypeDI with `reflect-metadata` wires controllers, services, and repositories.
- **Versioned API routes**: All domain routes are mounted under `/api/v1/`. The health check is unversioned at `/health`.
- **Typed exceptions**: Throw `NotFoundException`, `BadRequestException`, etc. — the global error handler serializes them consistently.

## Prerequisites

- **Node.js 22+**
- **npm 10+**
- **PostgreSQL 12+**

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

```bash
cp env.template .env
```

Edit `.env` with your local database credentials and JWT secret. See [Environment Variables](#environment-variables) for the full reference.

### 3. Run database migrations

```bash
npm run migration:run
```

### 4. Start the development server

```bash
npm run dev
```

The server starts on `http://localhost:3000` by default.

- **Health check**: `GET http://localhost:3000/health`
- **Swagger UI**: `http://localhost:3000/docs`
- **OpenAPI JSON**: `http://localhost:3000/swagger.json`

## Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start dev server with hot reload (nodemon + ts-node) |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm start` | Run the compiled build (`dist/index.js`) |
| `npm run swagger:generate` | Regenerate `swagger-output.json` from swagger definition files |
| `npm run swagger:dev` | Regenerate Swagger docs, then start dev server |
| `npm run migration:create` | Create an empty migration file |
| `npm run migration:run` | Run all pending migrations |
| `npm run migration:revert` | Revert the last applied migration |
| `npm run migration:show` | Show migration status (applied / pending) |
| `npm run seed:data` | Run `src/opo-seed-data.sql` against the local database (placeholder — file not yet created) |

> `migration:generate` is intentionally disabled. Always write raw SQL migrations manually using `migration:create`.

## API Routes

### Public

| Method | Path | Description |
|---|---|---|
| `GET` | `/health` | Application health status |
| `GET` | `/docs` | Swagger UI |
| `GET` | `/swagger.json` | OpenAPI spec |

### Authenticated (`/api/v1`)

Routes under `/api/v1` require a valid JWT in the `Authorization: Bearer <token>` header.

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/v1/example` | List all examples |
| `GET` | `/api/v1/example/:id` | Get example by ID |
| `POST` | `/api/v1/example` | Create an example |
| `PUT` | `/api/v1/example/:id` | Update an example |
| `DELETE` | `/api/v1/example/:id` | Delete an example |
| `POST` | `/api/v1/example/example2` | Create an example2 record |
| `GET` | `/api/v1/example/example2/:id` | Get example2 record by ID |
| `PUT` | `/api/v1/example/example2/:id` | Update an example2 record |
| `DELETE` | `/api/v1/example/example2/:id` | Delete an example2 record |

> **Note:** `GET /api/v1/example/example2` (list all) is currently shadowed by `GET /api/v1/example/:id` because that route is registered first in `example.routes.ts`. To fix, move `this.router.use('/example2', ...)` before the `/:id` routes.

## Authentication & Authorization

### Authentication

The `authenticate` middleware validates Bearer JWTs and attaches the decoded payload to `req.user`:

```typescript
// req.user shape after authenticate runs
{
  userId: string;
  email: string;
  roles: string[];
}
```

```typescript
router.get('/protected', authenticate, handler);
```

### Authorization

Two middleware factories for role-based access control:

```typescript
// User must have at least ONE of the specified roles
router.post('/reports', authenticate, requireRole('ADMIN', 'MANAGER'), handler);

// User must have ALL specified roles
router.post('/audit-log', authenticate, requireAllRoles('ADMIN', 'AUDITOR'), handler);
```

## Database Migrations

Migrations use TypeORM's migration runner with raw SQL — never `migration:generate`.

```bash
# 1. Create a new empty migration (pass the full path including migration name)
npm run migration:create -- src/migrations/CreateUserTable

# 2. Edit the generated file — write raw SQL in up() and down()

# 3. Run pending migrations
npm run migration:run

# 4. Revert the last migration if needed
npm run migration:revert

# 5. Inspect migration status
npm run migration:show
```

**Never** set `synchronize: true` or rely on entity decorators to define the database schema. Migrations are the single source of truth.

## Response Format

All handlers use `generateResponse()` for a consistent envelope:

```typescript
import { generateResponse } from '../common/utils/response.util';

generateResponse(res, {
  statusCode: HttpStatus.OK,
  message: 'Success',
  data: result,
});
```

```json
{
  "status": 200,
  "message": "Success",
  "data": { ... }
}
```

## Error Handling

Throw typed exceptions — the global error handler catches and serializes them:

```typescript
import { NotFoundException, BadRequestException } from '../common/exceptions';

throw new NotFoundException('User not found');
throw new BadRequestException('Email already in use');
```

Available exceptions: `BadRequestException`, `ConflictException`, `ForbiddenException`, `InternalServerErrorException`, `NotFoundException`, `NotImplementedException`, `UnauthorizedException`.

## Environment Variables

Copy `env.template` to `.env` and fill in values.

### Server

| Variable | Default | Description |
|---|---|---|
| `PORT` | `3000` | HTTP server port |
| `NODE_ENV` | `development` | `development` \| `production` |
| `ALLOWED_ORIGINS` | `http://localhost:3000` | Comma-separated list of allowed CORS origins |

### Database

| Variable | Default | Description |
|---|---|---|
| `DB_HOST` | `localhost` | PostgreSQL host (required in production) |
| `DB_PORT` | `5432` | PostgreSQL port |
| `DB_USERNAME` | `postgres` | Database user |
| `DB_PASSWORD` | — | Database password |
| `DB_DATABASE` | — | Database name |
| `DB_SSL` | `false` | Enable SSL (`true` for AWS RDS production) |
| `DB_SSL_REJECT_UNAUTHORIZED` | `true` | Reject unverified SSL certificates |
| `DB_POOL_MAX` | `20` | Maximum connections in pool |
| `DB_POOL_MIN` | `2` | Minimum connections in pool |
| `DB_IDLE_TIMEOUT` | `30000` | Idle connection timeout (ms) |
| `DB_CONNECTION_TIMEOUT` | `10000` | Connection acquisition timeout (ms) |
| `DB_LOGGING` | `false` | Log TypeORM SQL queries |

### JWT

| Variable | Default | Description |
|---|---|---|
| `JWT_SECRET` | — | Secret key for signing JWTs |
| `JWT_EXPIRES_IN` | `1h` | Token expiry (e.g. `1h`, `7d`) |

## Adding a New Domain

1. Create `src/domains/<domain>/` with the following structure:

```
<domain>/
├── controller/<domain>.controller.ts
├── dto/<domain>.dto.ts
├── entities/<domain>.entity.ts
├── repository/<domain>.repository.ts
├── routes/<domain>.routes.ts
├── service/<domain>.service.ts
└── validator/<domain>.validator.ts
```

2. Register the route in `src/index.ts`:

```typescript
const domainRoutes = Container.get(DomainRoutes);
v1Router.use('/domain', domainRoutes.router);
```

3. Create a migration for the new table:

```bash
npm run migration:create -- src/migrations/CreateDomainTable
```

## Production Deployment

```bash
# Build
npm run build

# Set NODE_ENV and all DB_* / JWT_* env vars in your environment

# Run pending migrations
npm run migration:run

# Start
npm start
```

The application handles `SIGTERM` and `SIGINT` for graceful shutdown.

## License

ISC
