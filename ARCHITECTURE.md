# Devanta System Design

## System Architecture

```mermaid
graph TD
    User([User])
    GitHub([GitHub API])
    Stripe([Stripe API])
    
    subgraph "Frontend (Next.js)"
        UI[User Interface]
        ClientState[Client State Management]
    end
    
    subgraph "Backend (Node.js/Express)"
        API[API Gateway/Express Server]
        Auth[Auth Service (JWT/GitHub OAuth)]
        Importer[GitHub Import Service]
        Generator[Portfolio Generator Service]
        TemplateEngine[Template Engine]
    end
    
    subgraph "Data Persistence"
        DB[(PostgreSQL)]
        Redis[(Redis Cache/Session)]
    end
    
    subgraph "Static Hosting"
        PublicPage[Public Portfolio Pages]
    end
    
    User <--> UI
    UI <--> API
    API <--> DB
    API <--> Redis
    API <--> GitHub
    API <--> Stripe
    API --> PublicPage
```

## Database Schema (PostgreSQL)

### Tables & Relationships

#### `users`
- `id` (UUID, PK) - Primary identifier
- `github_id` (String, Unique) - From GitHub OAuth
- `username` (String, Unique)
- `email` (String, Unique)
- `avatar_url` (String)
- `created_at`, `updated_at` (Timestamp)

#### `projects`
- `id` (UUID, PK)
- `user_id` (UUID, FK → users.id) - Owner of the project
- `repo_name` (String)
- `description` (Text)
- `language` (String)
- `stars` (Integer)
- `github_url` (Text)
- `is_featured` (Boolean) - For manual sorting
- `updated_at`, `created_at` (Timestamp)

#### `portfolios`
- `id` (UUID, PK)
- `user_id` (UUID, FK → users.id)
- `template` (String) - e.g., 'minimal', 'creative'
- `theme` (String) - e.g., 'dark', 'light'
- `domain` (String, Unique) - Optional custom domain
- `slug` (String, Unique) - e.g., 'jaypee' for devanta.com/p/jaypee
- `is_published` (Boolean)
- `config` (JSONB) - Flexible UI overrides
- `created_at`, `updated_at` (Timestamp)

#### `subscriptions`
- `id` (UUID, PK)
- `user_id` (UUID, FK → users.id)
- `plan` (String) - 'free', 'pro', 'elite'
- `status` (String) - 'active', 'canceled'
- `stripe_subscription_id` (String, Unique)
- `current_period_end` (Timestamp)
- `created_at`, `updated_at` (Timestamp)

#### `portfolio_views` (Analytics)
- `id` (UUID, PK)
- `portfolio_id` (UUID, FK → portfolios.id)
- `visitor_ip` (INET) - For unique visitor counts
- `clicked_project` (UUID, FK → projects.id) - Event tracking
- `user_agent` (Text)
- `timestamp` (Timestamp)

### Database Performance & Scalability
- **UUIDs**: Used as primary keys to avoid collision in distributed environments and simplify horizontal scaling.
- **JSONB**: Used in `portfolios.config` for storing semi-structured UI data without requiring a rigid schema.
- **Normalization**: Separated analytics (`portfolio_views`) and subscriptions to keep the core `users` and `portfolios` tables lean.
- **Indexes**:
  - `idx_users_github_id` for fast OAuth lookups.
  - `idx_portfolios_slug` for fast public portfolio routing.
  - `idx_portfolio_views_timestamp` for efficient analytics reporting.
  - Foreign key indexes for optimized joins across all related tables.

## API Endpoints

### Auth
- `GET /api/auth/github` - Initiate OAuth
- `GET /api/auth/github/callback` - Callback handler
- `POST /api/auth/logout`

### GitHub Import
- `GET /api/github/repos` - List user repos
- `POST /api/github/import` - Import selected repos into portfolio data

### Portfolios
- `GET /api/portfolios` - Get user's portfolios
- `POST /api/portfolios` - Create a new portfolio
- `GET /api/portfolios/:id` - Get details
- `PUT /api/portfolios/:id` - Update
- `DELETE /api/portfolios/:id`
- `GET /api/portfolios/public/:slug` - Public access endpoint

### Templates
- `GET /api/templates` - List available templates

### Payments
- `POST /api/payments/checkout` - Create Stripe session
- `POST /api/payments/webhook` - Stripe webhook handler

### Health
- `GET /api/v1/health` - Health check (e.g., http://localhost:5001/api/v1/health)

## Scalability Considerations (100k Users)
- **Database Indexing**: Crucial on `github_id`, `username`, and `slug`.
- **Caching**: Use Redis for GitHub API responses and frequently visited public portfolios.
- **Serverless/Scaling**: Deploy backend as containerized services (Docker/K8s) to scale horizontally.
- **CDN**: Serve static portfolio assets and templates via CDN for fast global access.
- **Background Jobs**: Use a task queue (like BullMQ) for heavy GitHub imports and portfolio generations to avoid blocking the main thread.
