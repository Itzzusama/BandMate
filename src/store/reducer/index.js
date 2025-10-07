import { combineReducers } from "redux";

import { authConfigsSlice } from "./AuthConfig";
import { usersSlice } from "./usersSlice";
import { chatSlice } from "./ChatSlice";
import appSliceReducer from "./appSlice";
import bottomSheetSliceReducer from "./bottomSheetSlice";
import { themeSlice } from "./themeSlice";

export const rootReducer = combineReducers({
  users: usersSlice.reducer,
  authConfig: authConfigsSlice.reducer,
  chat: chatSlice.reducer,
  navApp: appSliceReducer,
  navBottomSheet: bottomSheetSliceReducer,
  theme: themeSlice,
});
