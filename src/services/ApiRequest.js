import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import axios from "axios";

import { ToastMessage } from "../utils/ToastMessage";
import { setToken, setRefreshToken, logout } from "../store/reducer/AuthConfig";
import { endPoints } from "./ENV";
import { store } from "../store";

let instance = axios.create({
  baseURL: endPoints.BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

const checkInternetConnection = async () => {
  try {
    const state = await NetInfo.fetch();
    if (!state.isConnected) {
      ToastMessage("No Internet Connection", "error");
      throw new Error("No Internet Connection");
    }
  } catch (error) {
    console.error("Network check failed:", error);
    throw error;
  }
};

/**
 * Renew the token using refresh token
 */
const renewAuthToken = async (refreshToken) => {
  console.log("🔄 Renewing token with refresh token:", refreshToken);
  try {
    const response = await axios.post(
      `${endPoints.BASE_URL}auth/refresh-token`,
      { refreshToken },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    const newTokens = response.data.tokens;
    store.dispatch(setToken(newTokens?.accessToken));
    store.dispatch(setRefreshToken(newTokens?.refreshToken));

    console.log("✅ Token refreshed successfully");
    return newTokens.accessToken;
  } catch (error) {
    console.error(
      "❌ Token renewal failed:",
      error.response?.data || error.message
    );
    throw error;
  }
};

/**
 * Error handler with token refresh logic
 */
const handleApiError = async (error, operation, url) => {
  console.log(`🚨 Error with URL: ${endPoints.BASE_URL}${url}`);
  console.log("================================================");
  console.log("-->", error.response);

  if (error.response) {
    const { status } = error.response;
    const message = error.response.data?.message || "Something went wrong";

    console.log(`${operation} Error Status:`, status);
    console.log(`${operation} Error Message:`, message);

    // 🔁 If 401, attempt to renew token
    if (status === 401) {
      try {
        const refreshToken = store.getState()?.authConfig?.refreshToken;
        if (!refreshToken) {
          throw new Error("No refresh token available");
        }

        const newAccessToken = await renewAuthToken(refreshToken);

        // Retry the failed request
        const originalRequest = error.config;
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        const retryResponse = await instance(originalRequest);

        console.log("✅ Retried request after token refresh");
        return retryResponse;
      } catch (refreshError) {
        console.error("❌ Token refresh or retry failed:", refreshError);
        store.dispatch(logout());
        ToastMessage("Session expired. Please login again.", "error");

        return {
          status,
          message: "Session expired. Please login again.",
          error: refreshError,
        };
      }
    }

    return {
      status,
      data: error.response.data,
      message,
    };
  } else if (error.request) {
    console.log(`${operation} Network Error:`, error.message);
    ToastMessage("Network error. Please check your connection.", "error");
    return {
      status: 0,
      message: "Network error",
      originalError: error.message,
    };
  } else {
    console.log(`${operation} Unexpected Error:`, error.message);
    ToastMessage("An unexpected error occurred", "error");
    return {
      status: -1,
      message: error.message,
    };
  }
};

// 🔹 Interceptors
instance.interceptors.request.use(
  async (config) => {
    try {
      await checkInternetConnection();
      const token = store.getState()?.authConfig?.token;
      const socketId = await AsyncStorage.getItem("socketId");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
        if (socketId) config.headers["socket-id"] = socketId;
      }
      return config;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response,
  async (error) => Promise.reject(error)
);

// 🔹 Request Helpers
const requestGet = async (url, params = {}) => {
  try {
    const response = await instance.get(url, { params });
    return response;
  } catch (error) {
    return await handleApiError(error, "GET", url);
  }
};

const requestPost = async (url, data = {}) => {
  try {
    const response = await instance.post(url, data);
    return response;
  } catch (error) {
    return await handleApiError(error, "POST", url);
  }
};

const requestPatch = async (url, data = {}) => {
  try {
    const response = await instance.patch(url, data);
    return response;
  } catch (error) {
    return await handleApiError(error, "PATCH", url);
  }
};

const requestPut = async (url, data = {}) => {
  try {
    const response = await instance.put(url, data);
    return response;
  } catch (error) {
    return await handleApiError(error, "PUT", url);
  }
};

const requestDelete = async (url, data = {}) => {
  try {
    const response = await instance.delete(url, { data });
    return response;
  } catch (error) {
    return await handleApiError(error, "DELETE", url);
  }
};

// 🔹 Exports
const get = requestGet;
const post = requestPost;
const put = requestPut;
const patch = requestPatch;
const del = requestDelete;
const renewToken = renewAuthToken;

export { del, get, patch, post, put, renewToken };
