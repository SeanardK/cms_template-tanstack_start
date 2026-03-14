
# CMS Template - TanStack Start

A production-ready CMS template built with **TanStack Start**, **React 19**, and **Mantine UI**.  

This template provides everything you need to build a modern content management system, from authentication and protected routes to rich text editing and image uploads. Designed with developer experience in mind, it includes type-safe environment variables, component documentation with Storybook, and a clean project structure that scales with your application.

Whether you're building a portfolio manager, blog admin panel, or any content-driven dashboard, this template gives you a solid foundation with best practices baked in.

---

## Quick Start

```bash
# Clone the repository
git clone https://github.com/SeanardK/cms_template-tanstack_start.git
cd cms_template-tanstack_start

# Copy environment file and configure
cp .env.example .env
# Edit .env with your API and Keycloak settings

# Install dependencies and run
pnpm install
pnpm dev
```

Or using Docker:
```bash
docker build -t cms-template .
docker run -p 3000:3000 --env-file .env cms-template
```

---

## Features

- **TanStack Start Framework** - Full-stack React framework with Vite and Nitro for SSR
- **Keycloak Authentication** - Secure OIDC authentication with protected routes
- **Rich Text Editor** - Tiptap editor with formatting, links, code blocks, and more
- **Image Upload** - Built-in image handling with preview and validation
- **Mantine UI Components** - Beautiful, accessible UI components out of the box
- **Type-Safe Forms** - TanStack Form with Zod validation for robust form handling
- **Data Fetching** - TanStack Query for efficient server state management
- **File-Based Routing** - TanStack Router with automatic route generation
- **Storybook Documentation** - Component library with visual testing
- **Tailwind CSS Styling** - Utility-first CSS with Mantine integration
- **Docker Ready** - Production Dockerfile with multi-stage build
- **Biome Linting** - Fast linting and formatting in one tool

---

## Table of Contents

- [Requirements](#requirements)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Development](#development)
- [Docker Deployment](#docker-deployment)
- [Authentication](#authentication)
- [Storybook](#storybook)
- [Author](#author)

---

## Requirements

- Node.js 20 or higher
- pnpm 9+
- Keycloak Server (for authentication)
- Docker & Docker Compose (optional, for containerized deployment)

---

## Tech Stack

<table>
<tr>
<td><b>Category</b></td>
<td><b>Technology</b></td>
</tr>
<tr>
<td>Framework</td>
<td><a href="https://tanstack.com/start">TanStack Start</a> (Vite + Nitro)</td>
</tr>
<tr>
<td>UI Library</td>
<td><a href="https://mantine.dev/">Mantine v8</a></td>
</tr>
<tr>
<td>Styling</td>
<td><a href="https://tailwindcss.com/">Tailwind CSS v4</a></td>
</tr>
<tr>
<td>Routing</td>
<td><a href="https://tanstack.com/router">TanStack Router</a></td>
</tr>
<tr>
<td>Data Fetching</td>
<td><a href="https://tanstack.com/query">TanStack Query</a></td>
</tr>
<tr>
<td>Forms</td>
<td><a href="https://tanstack.com/form">TanStack Form</a> + <a href="https://zod.dev/">Zod</a></td>
</tr>
<tr>
<td>Rich Text</td>
<td><a href="https://tiptap.dev/">Tiptap</a></td>
</tr>
<tr>
<td>Auth</td>
<td><a href="https://www.keycloak.org/">Keycloak</a></td>
</tr>
<tr>
<td>Icons</td>
<td><a href="https://tabler.io/icons">Tabler Icons</a></td>
</tr>
<tr>
<td>Testing</td>
<td><a href="https://vitest.dev/">Vitest</a></td>
</tr>
<tr>
<td>Linting</td>
<td><a href="https://biomejs.dev/">Biome</a></td>
</tr>
</table>

---

## Installation

### Local Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/SeanardK/cms_template-tanstack_start.git
   cd cms_template-tanstack_start
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your configuration (see [Configuration](#configuration))

4. **Run the application**
   ```bash
   pnpm dev
   ```

---

## Configuration

Create a `.env` file in the root directory with the following variables:

```env
# Application
VITE_APP_TITLE=CMS Template

# API Server
SERVER_URL=http://localhost:8080/api

# Keycloak Authentication
VITE_KEYCLOAK_URL=http://localhost:8180
VITE_KEYCLOAK_REALM=your-realm
VITE_KEYCLOAK_CLIENT_ID=your-client-id
VITE_KEYCLOAK_LOGOUT_REDIRECT_URL=http://localhost:3000
```

### Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `VITE_APP_TITLE` | Application title | No | - |
| `SERVER_URL` | Backend API server URL | Yes | - |
| `VITE_KEYCLOAK_URL` | Keycloak server base URL | Yes | - |
| `VITE_KEYCLOAK_REALM` | Keycloak realm name | Yes | - |
| `VITE_KEYCLOAK_CLIENT_ID` | Keycloak client ID | Yes | - |
| `VITE_KEYCLOAK_LOGOUT_REDIRECT_URL` | Redirect URL after logout | Yes | - |

---

## Running the Application

### Development Mode

```bash
pnpm dev
```

The application will start on **http://localhost:3000**

### Production Build

```bash
pnpm build
pnpm preview
```

---

## Project Structure

```
.
├── public/                       # Static assets
│   ├── manifest.json             # PWA manifest
│   └── robots.txt                # SEO robots file
├── src/
│   ├── components/               # Reusable UI components
│   │   ├── navbar/               # Sidebar navigation
│   │   ├── page-header/          # Page header with actions
│   │   ├── portfolio-card/       # Content card component
│   │   ├── modal-delete/         # Delete confirmation modal
│   │   ├── render-form-field/    # Dynamic form field renderer
│   │   │   ├── image-input/      # Image upload component
│   │   │   └── rich-editor/      # Tiptap rich text editor
│   │   └── storybook/            # Design system components
│   ├── config/                   # App configuration
│   │   └── keycloak.ts           # Keycloak client setup
│   ├── constants/                # Application constants
│   ├── helper/                   # Utility functions
│   │   └── usePrivateRoute.ts    # Route protection hook
│   ├── hooks/                    # Custom React hooks
│   ├── integrations/             # Third-party integrations
│   │   └── tanstack-query/       # Query client provider
│   ├── lib/                      # Library configurations
│   │   └── axios.ts              # Axios instance setup
│   ├── pages/                    # Page components
│   │   ├── NotFound.tsx          # 404 page
│   │   └── portfolio/            # Portfolio pages
│   ├── query/                    # TanStack Query hooks
│   │   └── portfolio.ts          # Portfolio data queries
│   ├── routes/                   # File-based route definitions
│   │   ├── __root.tsx            # Root layout
│   │   ├── _dashboardLayout.tsx  # Dashboard layout
│   │   └── _dashboardLayout/     # Protected routes
│   ├── services/                 # API service layer
│   │   └── portfolio.ts          # Portfolio API calls
│   ├── theme/                    # Mantine theme configuration
│   ├── env.ts                    # Type-safe environment variables
│   ├── router.tsx                # Router configuration
│   └── styles.css                # Global styles
├── biome.json                    # Biome configuration
├── Dockerfile                    # Docker build configuration
├── package.json                  # Project dependencies
├── tsconfig.json                 # TypeScript configuration
├── vite.config.ts                # Vite configuration
└── README.md                     # This file
```

---

## Development

### Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server on port 3000 |
| `pnpm build` | Build for production |
| `pnpm preview` | Preview production build |
| `pnpm test` | Run tests with Vitest |
| `pnpm lint` | Lint code with Biome |
| `pnpm format` | Format code with Biome |
| `pnpm check` | Run lint and format checks |
| `pnpm storybook` | Start Storybook on port 6006 |
| `pnpm build-storybook` | Build Storybook for deployment |

### Adding New Pages

1. Create a route file in `src/routes/`
2. Create a page component in `src/pages/`
3. Add navigation link in `src/components/navbar/`

### Adding New API Services

1. Create service functions in `src/services/`
2. Create TanStack Query hooks in `src/query/`
3. Use the hooks in your page components

---

## Docker Deployment

### Using Docker

1. **Build the image**
   ```bash
   docker build -t cms-template .
   ```

2. **Run the container**
   ```bash
   docker run -d \
     -p 3000:3000 \
     --env-file .env \
     --name cms-template \
     cms-template
   ```

3. **View logs**
   ```bash
   docker logs -f cms-template
   ```

4. **Stop the container**
   ```bash
   docker stop cms-template
   ```

### Production Deployment

For production deployment, consider:

- Using a reverse proxy (Nginx, Traefik)
- Setting up SSL/TLS certificates
- Configuring proper CORS origins
- Implementing rate limiting
- Setting up monitoring and logging (e.g., Prometheus, Grafana)
- Using environment-specific configuration
- Implementing health check endpoints

---

## Authentication

This application uses Keycloak for authentication with OpenID Connect (OIDC). Protected routes require users to be authenticated.

### Setting Up Keycloak

1. Create a new realm in Keycloak
2. Create a client with the following settings:
   - Client Protocol: `openid-connect`
   - Access Type: `public`
   - Valid Redirect URIs: `http://localhost:3000/*`
   - Web Origins: `http://localhost:3000`
3. Configure the environment variables with your Keycloak settings

### Protected Routes

Routes under `_dashboardLayout/` are protected and require authentication. The `usePrivateRoute` hook handles the authentication check and redirects unauthenticated users to the login page.

---

## Storybook

Storybook provides component documentation and visual testing.

### Running Storybook

```bash
pnpm storybook
```

Storybook will be available at **http://localhost:6006**

### Building Storybook

```bash
pnpm build-storybook
```

The built Storybook will be in the `storybook-static/` directory.

---

## Author

- [**Seanard K**](https://github.com/SeanardK)
