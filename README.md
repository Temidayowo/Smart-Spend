This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Authentication

This project uses **NextAuth.js** with a Prisma adapter.

#### Environment variables

Create a `.env` file at the project root and add the following:

```env
DATABASE_URL=postgresql://user:pass@host:5432/dbname
NEXTAUTH_SECRET=your-random-secret (use `openssl rand -hex 32` or similar)
GOOGLE_CLIENT_ID=...       # optional if using Google OAuth
GOOGLE_CLIENT_SECRET=...   # optional
```

The `NEXTAUTH_SECRET` is required for production; in development NextAuth will generate one for you.

You will also need a hashing library; install it with:

```bash
npm install bcryptjs
# or yarn add bcryptjs
```

#### API endpoints

- `POST /api/auth/register` – creates a new user with hashed password.
- `GET|POST /api/auth/[...nextauth]` – NextAuth handler (credentials + Google).

Forms in `/app/(auth)/register` and `/app/(auth)/login` use these endpoints.

Refer to the `src/lib/auth.ts` file for the authentication configuration and provider setup.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
