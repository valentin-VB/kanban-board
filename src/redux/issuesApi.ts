import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "https://api.github.com/repos";

export const issuesApi = createApi({
  reducerPath: "issuesApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["Issues"],
  endpoints: (builder) => ({
    getRepoIssues: builder.query({
      query: (repoInfo) => ({
        url: `${repoInfo}/issues`,
        params: {
          per_page: 10,
          state: "all",
        },
      }),
    }),
    getRepoInfo: builder.query({
      query: (repoInfo) => `${repoInfo}`,
    }),
  }),
});

export const { useGetRepoIssuesQuery, useGetRepoInfoQuery } = issuesApi;
