# Next.js Choose-Your-Own-Adventure

This project is a [Next.js](https://nextjs.org) application for building and playing choose-your-own-adventure stories, using Supabase as the backend.

## Local Development with Docker Compose

We recommend using Docker Compose for local development. This ensures your app and all dependencies run in a consistent environment, matching production as closely as possible.

### Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed (includes Docker Compose)
- Git for version control

### Project Structure
```
.
├── Dockerfile           # Multi-stage Docker build configuration
├── docker-compose.yml   # Docker Compose configuration for development
├── .env                 # Environment variables (create from .env.example)
└── ...                  # Other project files
```

### Docker Configuration

The project uses a multi-stage Dockerfile for optimal development and production builds:

1. **Development Stage**: Includes all development dependencies and hot-reloading
2. **Builder Stage**: Creates an optimized production build
3. **Runner Stage**: Minimal production image with only necessary files

The `docker-compose.yml` is configured for development with:
- Hot-reloading enabled
- Volume mounts for local development
- Environment variable passthrough
- Node modules caching

### Starting the Development Environment

1. Copy the example environment file and fill in your Supabase credentials:
   ```bash
   cp .env.example .env
   # Edit .env and set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
   ```

2. Start the app and all services:
   ```bash
   docker compose up --build
   ```
   This will:
   - Build the development Docker image
   - Mount your local code into the container
   - Start the Next.js development server
   - Enable hot-reloading

3. Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

### Development Workflow

- **Hot Reloading**: Changes to your code will automatically trigger a rebuild
- **Node Modules**: Cached in the container for better performance
- **Environment Variables**: Passed through from your local `.env` file
- **Build Cache**: Preserved between runs for faster builds

### Stopping the Development Environment

To stop all running containers:
```bash
docker compose down
```

### Additional Docker Compose Commands
- View logs: `docker compose logs -f`
- Rebuild images: `docker compose up --build`
- Run in background: `docker compose up -d`
- Remove all containers and volumes: `docker compose down -v`
- View running containers: `docker compose ps`

### Troubleshooting

1. **Container won't start**:
   ```bash
   docker compose down -v  # Remove all containers and volumes
   docker compose up --build  # Rebuild from scratch
   ```

2. **Node modules issues**:
   ```bash
   docker compose down
   rm -rf node_modules
   docker compose up --build
   ```

3. **Port conflicts**:
   - Ensure port 3000 is not in use
   - Check running containers: `docker compose ps`

## Environment Variables

All secrets and credentials should be stored in a `.env` file (which is gitignored). See `.env.example` for required variables.

## Production Deployment

Production deployment is handled by [Netlify](https://www.netlify.com/). See `netlify.toml` for configuration. You do **not** need Docker Compose for production.

## Learn More
- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Netlify Docs](https://docs.netlify.com/)
- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
