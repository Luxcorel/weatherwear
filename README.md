<h1 align="center">WeatherWear</h1>

<p align="center">
  <a href="#overview">Overview</a> •
  <a href="#setup">Setup</a> •
  <a href="#screenshots">Screenshots</a>
</p>

<div align="center">
  <table>
    <tr>
      <td>
        <img alt="Main page (dark mode)" src="https://github.com/user-attachments/assets/e44ba44e-fc63-46ce-ab25-6e811cf9f232">
      </td>
      <td>
        <img alt="Main page (light mode)" src="https://github.com/user-attachments/assets/beccc6f7-7fd3-4e59-bcd4-80ab33562292">
      </td>
    </tr>
    <tr>
      <td>
        <p>Main page (dark mode)</p>
      </td>
        <td>
        <p>Main page (light mode)</p>
      </td>
    </tr>
  </table>
</div>

## Overview
WeatherWear is a web app that suggests what to wear based on the current weather. This project was built in a university web services course for the purpose of learning about how to use and create RESTful APIs. API documentation for this project's REST API is available at [Apiary](https://weatherwear.docs.apiary.io).

> [!NOTE]
> As we use Spotify for auth, there is no hosted demo site for this project. This is because Spotify restricts non-verified projects from having non-whitelisted users authenticate against their API. To remove this restriction a review process application must be made, which hasn't been done for this project.

### How to use
1. Sign in with a Spotify account
2. Select your current location or search for a specific location.
3. Add your clothes to the wardrobe
4. Get outfit suggestion based on current weather

### Key features
* What clothes to wear based on current weather
* Playlist that (hopefully) matches the weather
* Current weather for chosen location
* Dark & light mode
* Responsive UI

### RESTful APIs used
| Name                                                                   | Description                                           |
|------------------------------------------------------------------------|-------------------------------------------------------|
| [Weather API](https://www.weatherapi.com/)                             | Used to get weather data and geocoding                |
| [Spotify web API](https://developer.spotify.com/documentation/web-api) | Used to search for Spotify playlists and for auth     |
| [WeatherWear API](https://weatherwear.docs.apiary.io/)                 | Used to provide WeatherWear's functionality           |

### Technologies used

| Name                                           | Description                          |
|------------------------------------------------|--------------------------------------|
| [Next.js](https://nextjs.org/)                 | Full-stack JavaScript framework      |
| [Tailwind](https://tailwindcss.com/)           | CSS styling library                  |
| [Kysely](https://github.com/kysely-org/kysely) | SQL query builder                    |
| [Zod](https://github.com/colinhacks/zod)       | Data validation library              |
| [Shadcn UI](https://github.com/shadcn-ui/ui)   | UI component library                 |
| [SWR](https://swr.vercel.app/)                 | Client-side data fetching library    |
| [Auth.js](https://authjs.dev/)                 | Auth library                         |
| [Vercel](https://vercel.com/)                  | Database hosting and deployment      |

## Setup

### Prerequisites

-   [Node.js](https://nodejs.org/)
-   [Spotify API key](https://developer.spotify.com/documentation/web-api)
-   [WeatherAPI.com API key](https://www.weatherapi.com/)
-   [Vercel PostgreSQL DB](https://vercel.com/docs/storage/vercel-postgres/quickstart)

> [!NOTE]
> Remember to add the auth callback url on the Spotify project's settings page.
> For local setup add: http://localhost:3000/api/auth/callback/spotify.
> For hosted setup add https://example.org/api/auth/callback/spotify

### Local setup

0. Make sure the database is running and is set up using the schema.sql script.
1. Rename `.env.example` to `.env.local` and fill in the environment variables.
2. Run `npm install` to install dependencies.
3. Run `npm run dev` to start the development server.
4. Open [http://localhost:3000](http://localhost:3000).

### Hosted setup using Vercel
0. Make sure the database is running and is set up using the schema.sql script.
1. Clone this repo.
2. Visit the [Vercel dashboard](https://vercel.com/dashboard) and create a new project.
3. Link the project to your GitHub repository.
4. Add the environment variables on the Vercel project settings page. Remember to change the BASE_URL environment variables to point to your Vercel project URL.

## Screenshots

<div align="center">
  <table>
    <tr>
      <td>
        <img alt="Setup page" src="https://github.com/user-attachments/assets/2c16390a-18d7-48f2-b450-aa81a1701475">
      </td>
      <td>
        <img alt="Setup page" src="https://github.com/user-attachments/assets/efdb9194-c195-42fe-ac08-0cb92c441519">
      </td>
    </tr>
    <tr>
      <td>
        <p>Setup page (dark mode)</p>
      </td>
        <td>
        <p>Setup page (light mode)</p>
      </td>
    </tr>
  </table>
</div>

<div align="center">
  <table>
    <tr>
      <td>
        <img alt="Main page (dark mode)" src="https://github.com/user-attachments/assets/0015ba5e-26c8-426c-9b01-7d1629882511">
      </td>
      <td>
        <img alt="Main page (light mode)" src="https://github.com/user-attachments/assets/4844d788-3199-4424-9c0c-597fbc0a583e">
      </td>
    </tr>
    <tr>
      <td>
        <p>Main page (dark mode)</p>
      </td>
        <td>
        <p>Main page (light mode)</p>
      </td>
    </tr>
  </table>
</div>

<div align="center">
  <table>
    <tr>
      <td>
        <img alt="Wardrobe page (dark mode)" src="https://github.com/user-attachments/assets/c71b40b2-fa22-4192-acda-52936ebd971a">
      </td>
      <td>
        <img alt="Wardrobe page (light mode)" src="https://github.com/user-attachments/assets/72ebffa4-92c7-4104-b4bc-f9dddef39e96">
      </td>
    </tr>
    <tr>
      <td>
        <p>Wardrobe page (dark mode)</p>
      </td>
        <td>
        <p>Wardrobe page (light mode)</p>
      </td>
    </tr>
  </table>
</div>

<div align="center">
  <table>
    <tr>
      <td>
        <img alt="Profile page (dark mode)" src="https://github.com/user-attachments/assets/c13d3462-120e-47a3-9a98-dd23ad7d275b">
      </td>
      <td>
        <img alt="Profile page (light mode)" src="https://github.com/user-attachments/assets/04a59976-3032-4d1f-aa8a-40b175e3347e">
      </td>
    </tr>
    <tr>
      <td>
        <p>Profile page (dark mode)</p>
      </td>
        <td>
        <p>Profile page (light mode)</p>
      </td>
    </tr>
  </table>
</div>
