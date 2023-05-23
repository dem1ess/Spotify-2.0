import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const shazamCoreAPI = createApi({
  reducerPath: 'shazamCoreApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://shazam-core.p.rapidapi.com',
    prepareHeaders: (headers) => {
      headers.set('X-RapidAPI-Key', '333e0aba1fmsh2c7f4778cf47a34p1f601fjsn28c552d8c06c');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({ query: () => '/v1/charts/world' }),
    getSongDetails: builder.query({ query: ({ songid }) => `/v1/tracks/details?track_id=${songid}` })
  }),
});

export const {
  useGetTopChartsQuery,
  useGetSongDetailsQuery,
} = shazamCoreAPI;
