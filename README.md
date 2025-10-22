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

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Features

### Newsletter Subscription

The website includes a newsletter subscription feature in the footer that allows visitors to subscribe using their phone number. This feature uses Supabase as the database backend.

#### Setup Requirements

1. Create a Supabase project at [https://supabase.com](https://supabase.com)
2. Run the SQL schema in `sql/newsletter-schema.sql` using the Supabase SQL Editor
3. Set up environment variables in `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anon key
   - `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase service role key (for server-side operations)

#### Testing

You can test the newsletter subscription feature without setting up Supabase by using the test endpoint:

1. Temporarily modify the `handleSubscribe` function in `components/footer.tsx` to use `/api/test-newsletter` instead of `/api/newsletter`
2. Run the development server
3. Fill in the subscription form in the footer with any phone number
4. Check the console for the test response

Once Supabase is properly configured, switch back to using the `/api/newsletter` endpoint.
