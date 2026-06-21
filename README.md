## Deployment

The application is deployed on Render.

- Frontend: https://reporting-service-frontend.onrender.com/
- Backend API:

# Dynamic Report System

A full-stack dynamic reporting platform built with Spring Boot and React.

## Features

- Dynamic SQL based reports
- Runtime filters
- Pagination
- CSV export
- PDF export
- Retry handling
- Responsive dashboard

## Tech Stack

### Frontend

- React
- TypeScript
- Tailwind CSS
- Axios

### Backend

- Spring Boot
- PostgreSQL
- JdbcTemplate
- JPA

## Architecture

```
React Client
      |
      v
Spring Boot API
      |
      v
PostgreSQL
```

## Setup

Clone repository

```bash
git clone <repo-url>
```

Backend:

```bash
cd backend

./mvnw spring-boot:run
```

Frontend:

```bash
cd frontend

npm install

npm run dev
```

## API Endpoints

| Method | Endpoint             | Description       |
| ------ | -------------------- | ----------------- |
| GET    | /reports/{id}        | Get report config |
| POST   | /students/search     | Search records    |
| POST   | /students/export/csv | Export CSV        |
| POST   | /students/export/pdf | Export PDF        |

## Screenshots

## Author
