# Bloquera

Next.js 16 app for Bloquera.

## Mission

Bloquera exists to make crypto simple, clear, and accessible for everyone. We believe that understanding Bitcoin and blockchain should not feel overwhelming or technical, but instead be a calm and guided learning journey. Our goal is to break down complex ideas into easy steps, so anyone can learn with confidence.

We are building a space where curiosity is welcomed and learning happens at your own pace. With structured lessons and helpful guidance, Bloquera helps people move from confusion to clarity, empowering them to make smarter and safer decisions in the world of crypto.

## Local Development

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Useful commands:

```bash
npm run lint
npm run build
```

## Vercel Deployment

Before deploying to Vercel, configure these project environment variables:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `STRIPE_PRO_MONTHLY_PRICE_ID`
- `STRIPE_PRO_YEARLY_PRICE_ID`
- `OPENAI_API_KEY`
- `OPENAI_MODEL`

Notes:

- Set `NEXT_PUBLIC_SITE_URL` to your production domain, for example `https://bloquera.com`.
- Do not copy local secret values from `.env.local` into source control.
- Vercel can use the existing `npm run build` command with this Next.js app directly.

## Git Flow

This repository uses the Gitflow branching model.

- `main` stores production-ready history.
- `develop` is the main integration branch for ongoing work.
- `feature/*` branches are created from `develop` and merged back into `develop`.
- `release/*` branches are created from `develop` and merged into both `main` and `develop`.
- `hotfix/*` branches are created from `main` and merged into both `main` and `develop`.

### Branch Model

Use these branch names:

- `feature/<short-description>`
- `release/<version>`
- `hotfix/<short-description>`

Examples:

```bash
git checkout develop
git checkout -b feature/auth-flow
git checkout -b release/0.1.0
git checkout -b hotfix/fix-login-redirect
```

### Commit Style

Keep commits focused and readable. Prefer imperative messages:

- `Add login form validation`
- `Fix build script for webpack`
- `Update CI to run lint and build`

## Pull Requests

Every pull request should:

- target the correct base branch for Gitflow
- use `develop` for feature work
- use `main` only for release and hotfix promotion
- describe the user-facing change
- reference any related issue
- include screenshots for UI changes
- pass `npm run lint` and `npm run build`

Detailed expectations live in [CONTRIBUTING.md](./CONTRIBUTING.md).
