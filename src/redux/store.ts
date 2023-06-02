import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { issuesApi } from "./issuesApi";
import repoInfoReducer from "./repoInfoSlice";
import sortedIssusReducer from "./sortedIssuesSlice";
import authReducer from "./authSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

// const issuesPersistConfig = {
//   key: "issues",
//   whitelist: ["open", "closed", "withAssignee"],
//   storage,
// };

// const repoInfoConfig = {
//   key: "repoInfo",
//   whitelist: ["name", "url", "stars"],
//   storage,
// };

// const issuesConfig = {
//   key: "reposIssues",
//   // whitelist: ["name", "url", "stars"],
//   storage,
// };

const sortedIssuesConfig = {
  key: "sortedIssues",
  storage,
};

const makeStore = () => {
  const store: any = configureStore({
    reducer: {
      auth: authReducer,
      [issuesApi.reducerPath]: issuesApi.reducer,
      repoInfo: repoInfoReducer,
      sortedIssusSlice: persistReducer(sortedIssuesConfig, sortedIssusReducer),
    },

    middleware: (getDefaultMiddleWare) =>
      getDefaultMiddleWare({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(issuesApi.middleware),
  });

  store.persistor = persistStore(store);
  return store;
};

export const wrapper = createWrapper(makeStore);
