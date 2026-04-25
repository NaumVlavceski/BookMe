# BookMe

> Fast, simple, and reliable appointment booking — built for salons, barbershops, and beauty studios in Macedonia.


---

## Tech stack

| Layer | Technology |
|---|---|
| Backend | Java 17, Spring Boot|
| Frontend | React , Vite|
| Database | PostgreSQL 16 |
| Infrastructure | Docker, Docker Compose, Nginx |

---

## Quick start (Docker — recommended)

> **Requirements:** [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running. Nothing else needed.

**1. Clone the repository**

```bash
git clone https://github.com/NaumVlavceski/bookme.git
cd Bookme
```

**2. Set up environment variables**

```bash
cp .env.example .env
```

Open `.env` and fill in your values (the defaults work for local development).

**3. Start everything**

```bash
docker compose up --build
```

That's it. All 3 services start automatically.

| Service | URL |
|---|---|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:8080/api |
| Health check | http://localhost:8080/api/health |
| PostgreSQL | localhost:5432 |

**4. Stop everything**

```bash
docker compose down
```

Your database data is preserved in a Docker volume — it survives restarts.

To also delete the database volume:

```bash
docker compose down -v
```

---

## Local development (without Docker)

If you want to run services individually for faster development.

### Prerequisites

- Java 17
- Node.js 20+
- PostgreSQL 16 running locally

### Backend

```bash
cd Backend
./mvnw spring-boot:run
```

Or open the project in IntelliJ IDEA and press `Shift + F10`.

The backend starts on `http://localhost:8080`.

### Frontend

```bash
cd Frontend
npm install
npm run dev
```

The frontend starts on `http://localhost:5173`.

### Database

Create the local database manually:

```sql
CREATE USER "BookMe" WITH PASSWORD 'bookme_pass';
CREATE DATABASE "BookMe" OWNER "BookMe";
GRANT ALL PRIVILEGES ON DATABASE "BookMe" TO "BookMe";
```

Flyway migrations run automatically on backend startup.

---

## Environment variables

Copy `.env.example` to `.env` before running. Never commit `.env` — it is gitignored.

| Variable | Description | Default |
|---|---|---|
| `POSTGRES_DB` | Database name | `BookMe` |
| `POSTGRES_USER` | Database user | `BookMe` |
| `POSTGRES_PASSWORD` | Database password | `bookme_pass` |
| `DB_URL` | JDBC connection URL | `jdbc:postgresql://db:5432/BookMe` |
| `DB_USERNAME` | Spring datasource username | `BookMe` |
| `DB_PASSWORD` | Spring datasource password | `bookme_pass` |
| `JWT_SECRET` | Secret key for signing JWTs | change this in production |
| `JWT_EXPIRY_MS` | JWT expiry in milliseconds | `86400000` (24 hours) |

---

Full API documentation coming soon.

---

## Database migrations

Schema changes are managed by Flyway. Migration files live in:

```
Backend/src/main/resources/db/migration/
```

Naming convention: `V{number}__{description}.sql`

```
V1__init.sql
V2__create_users.sql
V3__create_businesses.sql
...
```

Migrations run automatically on every startup. Never edit an existing migration file — always create a new one.

---

## Contributing

1. Create a branch from `main`: `git checkout -b feature/your-feature-name`
2. Make your changes
3. Open a pull request — direct pushes to `main` are blocked
4. At least one review required before merging

Commit message format: `type: short description`

Examples: `feat: add booking confirmation email`, `fix: prevent double booking race condition`, `docs: update README setup steps`

