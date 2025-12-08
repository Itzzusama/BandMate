import { authorize } from "react-native-app-auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { endPoints } from "./ENV";
import { setSpotifyTokens } from "../store/reducer/spotifyAuthSlice";

const config = {
  clientId: endPoints.clientId,
  clientSecret: endPoints.clientSecret,
  redirectUrl: "com.solagroup.bandmate://oauth/", //"com.chainai.app://oauth/"
  scopes: [
    "user-read-email",
    "user-top-read",
    "playlist-read-private",
    "user-library-read",
    "user-read-recently-played",
    "user-follow-read",
  ],
  serviceConfiguration: {
    authorizationEndpoint: "https://accounts.spotify.com/authorize",
    tokenEndpoint: "https://accounts.spotify.com/api/token",
  },
  usePKCE: true,
  skipCodeExchange: false,
  prefersEphemeralSession: false,
};

export const loginWithSpotify = () => async (dispatch) => {
  try {
    const authState = await authorize(config);
    console.log("✅ Spotify Auth Success:", authState);

    const expirationDate = new Date(
      authState.accessTokenExpirationDate
    ).getTime();

    await AsyncStorage.multiSet([
      ["spToken", authState.accessToken],
      ["spRefreshToken", authState.refreshToken],
      ["expirationDate", expirationDate.toString()],
    ]);

    dispatch(
      setSpotifyTokens({
        accessToken: authState.accessToken,
        refreshToken: authState.refreshToken,
        expirationDate,
      })
    );
    console.log(authState);
    return authState;
  } catch (error) {
    console.error("❌ Spotify login error:", error);
    throw error;
  }
};

export const refreshSpotifyToken = () => async (dispatch) => {
  try {
    const refreshToken = await AsyncStorage.getItem("spRefreshToken");
    if (!refreshToken) throw new Error("Missing Spotify refresh token");

    const body = new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      client_id: endPoints.clientId,
      client_secret: endPoints.clientSecret,
    });

    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    });

    const data = await response.json();

    if (!data.access_token) throw new Error("Failed to refresh token");

    const newExpirationDate = Date.now() + data.expires_in * 1000;

    await AsyncStorage.multiSet([
      ["spToken", data.access_token],
      ["expirationDate", newExpirationDate.toString()],
    ]);

    if (data.refresh_token) {
      await AsyncStorage.setItem("spRefreshToken", data.refresh_token);
    }

    dispatch(
      setSpotifyTokens({
        accessToken: data.access_token,
        refreshToken: data.refresh_token || refreshToken,
        expirationDate: newExpirationDate,
      })
    );

    return data.access_token;
  } catch (error) {
    console.error("❌ Spotify token refresh error:", error);
    throw error;
  }
};

export const checkSpotifyTokenValidity = () => async (dispatch) => {
  const [token, refreshToken, expirationStr] = await AsyncStorage.multiGet([
    "spToken",
    "spRefreshToken",
    "expirationDate",
  ]);

  const expiration = parseInt(expirationStr?.[1] || "0", 10);

  if (token?.[1] && expiration && Date.now() < expiration) {
    dispatch(
      setSpotifyTokens({
        accessToken: token[1],
        refreshToken: refreshToken?.[1],
        expirationDate: expiration,
      })
    );
    return token[1];
  }

  if (refreshToken?.[1]) {
    return dispatch(refreshSpotifyToken());
  }

  return null;
};

const getAccessToken = () => async (dispatch) => {
  try {
    const token = await dispatch(checkSpotifyTokenValidity());
    console.log("sp token", token);
    return token;
  } catch (err) {
    console.log(err);
  }
};

export const spotifyDataService = {
  async getProfile() {
    const token = await getAccessToken();
    const response = await fetch("https://api.spotify.com/v1/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.json();
  },

  async searchArtists(query, limit = 20) {
    const token = await getAccessToken();
    const response = await fetch(
      `https://api.spotify.com/v1/search?type=artist&q=${encodeURIComponent(
        query
      )}&limit=${limit}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const data = await response.json();
    return data.artists?.items || [];
  },

  async getArtist(artistId) {
    const token = await getAccessToken();
    const response = await fetch(
      `https://api.spotify.com/v1/artists/${artistId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.json();
  },

  async getArtistTopTracks(artistId, market = "US") {
    const token = await getAccessToken();
    const response = await fetch(
      `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=${market}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const data = await response.json();
    return data.tracks || [];
  },

  async getRelatedArtists(artistId) {
    const token = await getAccessToken();
    const response = await fetch(
      `https://api.spotify.com/v1/artists/${artistId}/related-artists`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const data = await response.json();
    return data.artists || [];
  },

  async getUserPlaylists() {
    const token = await getAccessToken();
    const response = await fetch("https://api.spotify.com/v1/me/playlists", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    return data.items || [];
  },
  async getArtistAlbums(artistId, limit = 10, include_groups = "album,single") {
    const token = await getAccessToken();
    const response = await fetch(
      `https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=${include_groups}&limit=${limit}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const data = await response.json();
    return data.items || [];
  },
};
export const getLatestReleases = async (dispatch, artistId) => {
  try {
    const token = await dispatch(checkSpotifyTokenValidity());

    const res = await fetch(
      `https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=album&limit=5`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();

    if (!data.items || data.items.length === 0) {
      console.warn("No albums found for artist:", artistId);
      return [];
    }

    return data.items.map((album) => ({
      title: album.name,
      des: `${album.release_date} • Album`,
      img: { uri: album.images?.[0]?.url },
    }));
  } catch (error) {
    console.error("Error fetching latest releases:", error);
    return [];
  }
};

export const getTopTracks = async (dispatch, artistId) => {
  try {
    const token = await dispatch(checkSpotifyTokenValidity());

    const res = await fetch(
      `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();

    if (!data.tracks || data.tracks.length === 0) {
      console.warn("No top tracks found for artist:", artistId);
      return [];
    }

    return data.tracks.map((track) => ({
      title: track.name,
      des: track.artists[0]?.name,
      img: { uri: track.album.images?.[0]?.url },
    }));
  } catch (error) {
    console.error("Error fetching top tracks:", error);
    return [];
  }
};

const formatDuration = (ms) => {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

export const getAllArtistsTopTracks = async (dispatch, artistIds) => {
  try {
    const token = await dispatch(checkSpotifyTokenValidity());
    if (!token) throw new Error("Spotify token not found.");

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const results = [];

    for (const artistId of artistIds) {
      const artistRes = await fetch(
        `https://api.spotify.com/v1/artists/${artistId}`,
        { headers }
      );
      console.log(artistRes);
      const artistData = await artistRes.json();
      console.log(artistData);
      if (!artistData?.name) continue;

      const artistName = artistData.name;

      const res = await fetch(
        `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`,
        { headers }
      );
      const data = await res.json();

      if (!data?.tracks?.length) continue;

      const songs = data.tracks.map((track) => ({
        title: track.name,
        duration: formatDuration(track.duration_ms),
        img: track.album?.images?.[0]?.url,
      }));

      results.push({
        artistName,
        songs,
      });
    }

    return results;
  } catch (error) {
    console.error("Error fetching artists top tracks:", error);
    return [];
  }
};
