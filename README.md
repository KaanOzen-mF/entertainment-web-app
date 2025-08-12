# Full-Stack Entertainment Web App - Frontend

This is the frontend for a full-stack web application built as a solution to a Frontend Mentor challenge. It allows users to browse, search, and bookmark movies and TV series, fetching live data from The Movie Database (TMDB) and connecting to a custom backend for user authentication and bookmark management.

**Live Demo:** [Live Demo](https://your-live-demo-url.com)

## Table of Contents

- [Overview](#overview)
- [Screenshots](#screenshots)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Backend API](#backend-api)
- [Getting Started](#getting-started)
- [Acknowledgements](#acknowledgements)

## Overview

The application provides a seamless experience for discovering and tracking entertainment content. It features a clean, responsive interface designed from a Figma file, a secure authentication system, and a dynamic content delivery pipeline that combines a custom backend with the extensive TMDB API.

## Screenshots

Here are some screenshots of the application in action.

|                         Home Page (Logged In)                         |                        Movies Page                         |
| :-------------------------------------------------------------------: | :--------------------------------------------------------: |
| ![Home Page Screenshot](./ScreenShots/Home%20Page%20with%20Login.png) | ![Movies Page Screenshot](./ScreenShots/Movies%20Page.png) |

|                           TV Series Page                           |                          Bookmarked Page                           |
| :----------------------------------------------------------------: | :----------------------------------------------------------------: |
| ![TV Series Page Screenshot](./ScreenShots/TV%20Series%20Page.png) | ![Bookmarked Page Screenshot](./ScreenShots/Bookmarked%20Page.png) |

|                        Login Page                        |                          Sign Up Page                          |
| :------------------------------------------------------: | :------------------------------------------------------------: |
| ![Login Page Screenshot](./ScreenShots/Login%20Page.png) | ![Register Page Screenshot](./ScreenShots/Register%20Page.png) |

## Features

- **Full Authentication:** Users can sign up and log in via a custom backend API.
- **Protected Routes & UI:** Pages like "Bookmarked Shows" and features like the "Recommended" section are only accessible/visible to authenticated users.
- **Live Data from TMDB:** All movie and TV show information is fetched in real-time from The Movie Database API.
- **Dynamic Search:** A debounced search functionality allows users to perform live searches for movies and TV shows on their respective pages.
- **Persistent Bookmarking:** Authenticated users can add or remove movies/TV shows from their personal bookmark list, with data persisted in the backend database.
- **Trailer Playback:** Users can click a "Play" button to watch the official trailer in a modal window directly within the app.
- **Responsive Design:** The layout is fully optimized for desktop, tablet, and mobile devices.
- **Secure API Proxy:** The TMDB API key is kept secure on the server-side using a Next.js API route as a proxy, preventing exposure to the client.

## Tech Stack

### Frontend

![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

### Backend

![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring-6DB33F?style=for-the-badge&logo=spring&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)

## Backend API

This is a full-stack project. The backend is a separate Spring Boot application responsible for user registration, login (JWT authentication), and managing user bookmarks.

➡️ **The backend repository can be found here:** [https://github.com/KaanOzen-mF/entertainment-web-app-api](https://github.com/KaanOzen-mF/entertainment-web-app-api)

You will need to have the backend server running locally for the authentication and bookmarking features to work.

## Getting Started

To get the frontend running locally, follow these simple steps.

### Prerequisites

- Node.js & npm
- A running instance of the [backend API](https://github.com/KaanOzen-mF/entertainment-web-app-api).

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/your-frontend-repo-name.git](https://github.com/your-username/your-frontend-repo-name.git)
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd your-frontend-repo-name
    ```
3.  **Install Dependencies:**
    ```bash
    npm install
    ```
4.  **Set Up Environment Variables:**
    - Create a file named `.env.local` in the root of the project.
    - Add your TMDB API key to this file. See the [Environment Variables](#environment-variables) section below.
5.  **Run the Development Server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:3000`.

## Environment Variables

To run this project, you will need to add the following environment variable to your `.env.local` file:

`TMDB_API_KEY=your_tmdb_api_key_here`

## Acknowledgements

- This project was a premium challenge from [Frontend Mentor](https://www.frontendmentor.io).
- Movie and TV Show data provided by [The Movie Database (TMDB)](https://www.themoviedb.org/).
