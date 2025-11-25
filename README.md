# blackroad-os-pack-creator-studio

A service for creating and managing OS packs in the BlackRoad OS ecosystem.

## Overview

BlackRoad OS Pack Creator Studio provides tools and APIs for creating, editing, and managing OS packs for the BlackRoad OS platform.

## Local Development

### Prerequisites

- Node.js >= 18.0.0
- npm

### Installation

```bash
npm install
```

### Running Locally

Development mode with auto-reload:
```bash
npm run dev
```

Production mode:
```bash
npm run start:studio
```

The service will start on port 8080 by default (or the port specified in the `PORT` environment variable).

## Build & Deploy

### Building

This project uses Nixpacks for building on Railway. No build step is required for JavaScript.

### Deployment

The service is configured to deploy to Railway using the `railway.toml` configuration file.

Deploy command:
```bash
npm run start:studio
```

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Port the server listens on | `8080` |
| `SERVICE_NAME` | Name of the service | `blackroad-os-pack-creator-studio` |
| `ENVIRONMENT` | Deployment environment | `production` |

## Healthcheck

The health endpoint is available at `/health` and returns:

```json
{
  "status": "ok",
  "service": "blackroad-os-pack-creator-studio"
}
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Service information |
| GET | `/health` | Health check endpoint |

## License

MIT