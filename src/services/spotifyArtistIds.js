import { checkSpotifyTokenValidity } from "./spotifyAuthService";

export const SPOTIFY_ARTIST_IDS = [
  "4YRxDV8wJFPHPTeXepOstw", // Arijit Singh
  "2CIMQHirSU0MQqyYHq0eOx", // Deadmau5
  "57dN52uHvrHOxijzpIgu3E", // Kygo
  "1vCWHaC5f2uS3yhpwWbIA6", // Avicii
  "3TVXtAsR1Inumwj472S9r4", // Drake
  "6eUKZXaKkcviH0Ku9w2n3V", // Ed Sheeran
  "06HL4z0CvFAxyc27GXpf02", // Taylor Swift
  "66CXWjxzNUsdJxJ2JdwvnR", // Ariana Grande
  "6qqNVTkY8uBg9cP3Jd7DAH", // Billie Eilish
  "7dGJo4pcD2V6oG8kP0tJRR", // Eminem
  "1uNFoZAHBGtllmzznpCI3s", // Justin Bieber
  "53XhwfbYqKCa1cC15pYq2q", // Imagine Dragons
  "7Ln80lUS6He07XvHI8qqHH", // Arctic Monkeys
  "4dpARuHxo51G3z768sgnrY", // Adele

  "1mYsTxnqsietFxj1OgoGbG", // A.R. Rahman
  "5K4W6rqBFWDnAN6FQUkS6x", // Kanye West
  "1dfeR4HaWDbWqFHLkxsg1d", // Queen
];
const CLEAN_PATTERNS = [
  /top/i,
  /best/i,
  /hits/i,
  /playlist/i,
  /mix/i,
  /various/i,
  /^\d+$/,
  /^\d{4}/,
];

const isValidArtist = (name) => {
  return !CLEAN_PATTERNS.some((pattern) => pattern.test(name));
};
export const fetchSpotifyArtistsWithFallback = async (
  dispatch,
  query = "top artists"
) => {
  try {
    const token = await dispatch(checkSpotifyTokenValidity());
    if (!token) throw new Error("Spotify token missing.");

    const res = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(
        query
      )}&type=artist&limit=30`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const data = await res.json();

    if (!data?.artists?.items?.length) {
      console.warn("⚠️ No dynamic artists found. Using fallback list.");
      return SPOTIFY_ARTIST_IDS;
    }

    const cleaned = data.artists.items
      .filter((artist) => isValidArtist(artist.name))
      .map((artist) => artist.id);

    const dynamicIds = cleaned;

    return dynamicIds;
  } catch (error) {
    console.error(
      "❌ Error fetching Spotify artists. Using fallback:",
      error.message
    );
    return SPOTIFY_ARTIST_IDS;
  }
};
