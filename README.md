# WeatherWear

Weatherwear is a web application that suggests what to wear based on the current weather.

This project was made in a university web services course.
The purpose of the course was to learn about web services and how to use/create them.

## Stack

The main technologies used in this project are:

[Next.js](https://nextjs.org/) - framework for frontend and backend

[Tailwind](https://tailwindcss.com/) - for styling

[Kysely](https://github.com/kysely-org/kysely) - for SQL queries

[Zod](https://github.com/colinhacks/zod) - for data validation

[Shadcn UI](https://github.com/shadcn-ui/ui) - for some UI components

[SWR](https://swr.vercel.app/) - for client side data fetching

[Auth.js](https://authjs.dev/) - for auth

[Vercel](https://vercel.com/) - for database and deployment

## Prerequisites

-   [Node.js](https://nodejs.org/)
-   [Spotify API key](https://developer.spotify.com/documentation/web-api)
    (remember to add callback url to your app:
    "http://localhost:3000/api/auth/callback/spotify" or "https://example.org/api/auth/callback/spotify")
-   [WeatherAPI.com API key](https://www.weatherapi.com/)
-   [Vercel PostgreSQL DB](https://vercel.com/docs/storage/vercel-postgres/quickstart)

## Setup

1. Rename `.env.example` to `.env.local` and fill in the environment variables.
2. Run `npm install` to install dependencies.
3. Run schema.sql to set up the database.
4. Run `npm run dev` to start the development server.
5. Open [http://localhost:3000](http://localhost:3000).
6. Optional: Deploy to Vercel:
    - Visit the [Vercel dashboard](https://vercel.com/dashboard) and create a new project.
    - Link the project to your GitHub repository.
    - Add the environment variables to the project.
    - Remember to change the BASE_URL environment variables to your Vercel project URL
      and to add that URL to the Spotify callback URL list in the Spotify app settings.
