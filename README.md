# Dressing Room Backend

A dockerized Node.js backend service with Express.js.

## Features

- Express.js REST API with Supabase Authentication
- Docker support with development and production configurations
- Hot-reload and debugging support
- Test endpoint `/ping`

## Getting Started

### Prerequisites

- Node.js 18 or higher
- Docker and Docker Compose
- Visual Studio Code (for debugging)

### Installation

1. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your Supabase credentials
```

2. Install dependencies:
```bash
npm install
```

### Development with Docker

1. Start the development container with hot-reload and debugging support:
```bash
docker-compose up --build
```

The server will be available at http://localhost:8000 with hot-reload enabled.

### Debugging with VS Code

1. Make sure the development container is running:
```bash
docker-compose up --build
```

2. In VS Code:
   - Open the "Run and Debug" view (Ctrl/Cmd + Shift + D)
   - Select "Docker: Attach to Node" from the dropdown
   - Press F5 or click the green play button to attach the debugger

3. Debugging features available:
   - Set breakpoints by clicking on line numbers
   - Step through code using debug controls
   - Inspect variables in the debug sidebar
   - View call stack and create watch expressions
   - Hot-reload still works while debugging

### Production

Build and run for production:
```bash
docker build -t dressing-room-backend .
docker run -p 8000:8000 dressing-room-backend
```

### Development Without Docker

Run in development mode with hot reload:
```bash
npm run dev
```

Run in debug mode:
```bash
npm run dev:debug
```

### Testing

Run tests:
```bash
npm test
```

## API Endpoints

- `GET /ping` - Test endpoint that returns "pong"
