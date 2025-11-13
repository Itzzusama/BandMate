import { combineReducers } from "redux";

import { authConfigsSlice } from "./AuthConfig";
import { usersSlice } from "./usersSlice";
import { chatSlice } from "./ChatSlice";
import { navSlice } from "./appSlice";
import bottomSheetSliceReducer from "./bottomSheetSlice";
import { themeSlice } from "./themeSlice";
import { spotifyAuthSlice } from "./spotifyAuthSlice";

export const rootReducer = combineReducers({
  users: usersSlice.reducer,
  authConfig: authConfigsSlice.reducer,
  chat: chatSlice.reducer,
  navApp: navSlice.reducer,
  navBottomSheet: bottomSheetSliceReducer,
  theme: themeSlice,
  spotifyAuth: spotifyAuthSlice.reducer,
});
