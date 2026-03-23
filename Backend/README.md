# Routine Tracker Backend (Spring Boot)

This is the backend for the Routine Tracker application, built using **Spring Boot 4.0.3** and **Java 25**. The application provides RESTful APIs for user authentication, routine/task management, and tracking daily task completions with insightful dashboard statistics.

## Table of Contents
- [Tech Stack](#tech-stack)
- [Architecture & Modules](#architecture--modules)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Security](#security)
- [Deployment](#deployment)

## Tech Stack
- **Framework:** Spring Boot 4.0.3
- **Language:** Java 25 (Amazon Corretto)
- **Database:** PostgreSQL
- **Security:** Spring Security & JWT (JSON Web Tokens)
- **Utilities:** Lombok
- **Build Tool:** Maven

## Architecture & Modules

The project is structured into multiple layers to ensure separation of concerns:

- **Config (`/config`)**: Contains the Security Configuration and the custom `JwtFilter` for stateless authentication. It also defines CORS rules to allow frontend requests from React/Vite development environments and Vercel.
- **Controllers (`/controllers`)**: The REST API entry points handling incoming user requests.
- **Services (`/services`)**: Contains the core business logic (e.g., JWT token generation/validation, stats aggregation, task tracking).
- **Repositories (`/repository`)**: Spring Data JPA interfaces for database operations, including custom statistical native queries (`TaskCompletionRepo`).
- **Models (`/models`)**: JPA Entities representing the database tables.
- **DTOs (`/DTO`)**: Data Transfer Objects used to shape API requests and responses efficiently.

## API Endpoints

### 1. Authentication (`/api/auth`)
- `POST /register`: Register a new user (encrypts password via BCrypt).
- `POST /login`: Authenticate User and receive a JWT token.
- `POST /logout`: Logout user and permanently *blacklist* the current token.
- `POST /check`: Verify an existing token's validity and retrieve the user's profile.

### 2. Routine/Task Management (`/api/task`)
*All endpoints require a valid JWT Auth Header (`Bearer <token>`).*
- `POST /create-task`: Create one or multiple distinct tasks/routines.
- `PUT /update/{taskId}`: Update an individual task's details (e.g., specific Title, Start/End time adjustments).
- `PUT /update`: Mass-update functionality — deletes existing routines and replaces them with a completely new set (Routine Reset).
- `DELETE /delete/{taskId}`: Delete a specific task.
- `DELETE /delete`: Clear the entire routine (removes all routines for the logged-in user).

### 3. Task Completion & Tracking (`/api/task-completion`)
*All endpoints require a valid JWT Auth Header (`Bearer <token>`).*
- `GET /check/{taskId}`: Toggle a task's completion status for the current day. Validates and enforces whether the request falls within the specific task's scheduled timeframe.
- `GET /history`: Generates a rolling window history showing user routines along with their boolean completion states for the past 30 days.
- `GET /stats`: Generates grouped aggregated data for the dashboard graphs, including:
  - **Consistency Graph (`consistencyGraph`)**: Total completed tasks mapped by day.
  - **Breakdown Graph (`breakdownGraph`)**: Overall completion count mapped to specific routines.
  - **Active Dates (`activeDatesForHeatmap`)**: Array of active dates specifically formulated for heatmap interactions.

## Database Schema (Entities)
1. **User**: Standard user entity. Stores `username`, `email`, and securely hashed `password`.
2. **Task**: Represents a block of routine, tied relationally to a `User` (Many-to-One). Contains `title`, `startTime`, and `endTime`.
3. **TaskCompletion**: Explicit tracking of task conclusions. Contains `completionDate` and actual `completedAt` timestamp. Linked exclusively to its parent `Task`.
4. **BlacklistedToken**: Simple mapping storing explicitly forced-logout JWT validation strings to block reuse.

## Security Features
- **Stateless JWT**: Relies strictly on `io.jsonwebtoken` validation rather than standard session tokens.
- **Request Filter Mapping**: The custom `JwtFilter` ensures that every incoming API request is decoded, ensuring token signature verification, and checking against the `blacklisted_tokens` schema to forbid compromised or expired tokens.
- **Whitelisted CORS Settings**: Specifically restricts traffic natively to (`http://localhost:3000`, `http://localhost:5173`, and `https://routineX10.vercel.app`).

## Deployment
A `Dockerfile` is included in the project root to containerize the jar compilation output (`target/RoutineX10.jar`), launching the REST app via `amazoncorretto:25`.
