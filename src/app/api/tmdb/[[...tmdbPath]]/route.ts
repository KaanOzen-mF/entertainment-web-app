import { NextResponse } from "next/server";

// 1. Load the secret TMDB API key from environment variables.
//    This ensures the key is never exposed to the client-side/browser.
const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_API_URL = "https://api.themoviedb.org/3";

/**
 * This is a Next.js API Route that acts as a secure proxy for the TMDB API.
 * The file structure `[[...tmdbPath]]` creates a "catch-all" route, meaning any request
 * to `/api/tmdb/...` will be handled by this function.
 *
 * @param request The incoming request object from the client.
 * @param context An object containing the dynamic route parameters.
 */
export async function GET(
  request: Request,
  context: { params: Promise<{ tmdbPath?: string[] }> }
) {
  // Extract any query parameters from the original client request (e.g., ?page=2).
  const { searchParams } = new URL(request.url);
  // Await the dynamic path segments from the URL.
  const { tmdbPath } = await context.params;
  // Join the path segments into a single string (e.g., ['trending', 'all', 'week'] becomes 'trending/all/week').
  const path = tmdbPath ? tmdbPath.join("/") : "";

  // 2. Construct the final URL to be sent to the actual TMDB API.
  const url = new URL(`${TMDB_API_URL}/${path}`);
  // Securely append the secret API key to the request.
  url.searchParams.append("api_key", TMDB_API_KEY || "");

  // Forward any additional query parameters from the client to the TMDB API.
  searchParams.forEach((value, key) => {
    url.searchParams.append(key, value);
  });

  // 3. Make the request to the TMDB API and handle the response.
  try {
    const response = await fetch(url.toString());
    // If the response from TMDB is not successful, forward the error.
    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.status_message },
        { status: response.status }
      );
    }
    // If successful, parse the JSON data and send it back to our client.
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    // If the fetch itself fails (e.g., network error), log it and return a generic server error.
    console.error("TMDB Proxy Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch data from TMDB" },
      { status: 500 }
    );
  }
}
