# Dressing Room Backend

A dockerized Node.js backend service with Express.js.

## Features

- Express.js REST API
- Docker support
- Test endpoint `/ping`

## Getting Started

### Prerequisites

- Node.js 18 or higher
- Docker (optional)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

Or with Docker:
```bash
docker build -t dressing-room-backend .
docker run -p 8000:8000 dressing-room-backend
```

### Development

Run in development mode with hot reload:
```bash
npm run dev
```

### Testing

Run tests:
```bash
npm test
```

## API Endpoints

- `GET /ping` - Test endpoint that returns "pong"
