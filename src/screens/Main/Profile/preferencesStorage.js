import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEYS = {
  currency: "pref_currency",
  language: "pref_language",
  addressing: "pref_addressing",
  serviceProviders: "pref_service_providers",
  map: "pref_map",
  units: "pref_units",
  temperature: "pref_temperature",
  firstDay: "pref_first_day",
  dateFormat: "pref_date_format",
};

export const setPreference = async (key, value) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS[key], JSON.stringify(value));
  } catch {}
};

export const getPreference = async (key) => {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEYS[key]);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const KEYS = STORAGE_KEYS;


