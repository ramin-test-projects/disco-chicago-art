import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "./RootState";
import {
  IArtwork,
  IArtworksResponse,
  IArtworksSearchParams,
} from "../api/collections-apis.types";
import { getArtWork, searchArtWorks } from "../api/collections-apis";

type ArtworksList = IArtworksResponse & { searchTerm?: string; page?: number };

export type ArtworksState = {
  list?: ArtworksList;
  artwork?: IArtwork;
  loading?: boolean;
  error?: string;
};

const search = createAsyncThunk(
  "artworks/search",
  (params: IArtworksSearchParams) => searchArtWorks(params)
);

const getById = createAsyncThunk("artworks/getById", (params: { id: number }) =>
  getArtWork(params)
);

const initialState: ArtworksState = {};

const artworksSlice = createSlice({
  name: "artworks",
  initialState,
  reducers: {
    clear: (state) => {
      state.list = undefined;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(search.pending, (state) => {
        state.loading = true;
      })
      .addCase(search.rejected, (state) => {
        state.loading = false;
        state.error = "Oops! Something went wrong :(";
      })
      .addCase(search.fulfilled, (state, action) => {
        state.loading = false;
        state.error = undefined;
        state.list = {
          ...action.payload,
          items: [...(state.list?.items ?? []), ...action.payload.items],
        };
      })
      .addCase(getById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getById.rejected, (state) => {
        state.loading = false;
        state.error = "Oops! Something went wrong :(";
      })
      .addCase(getById.fulfilled, (state, action) => {
        state.loading = false;
        state.error = undefined;
        state.artwork = action.payload;
      }),
});

export const artworksActions = {
  ...artworksSlice.actions,
  search,
  get: getById,
};
export const artworksReducer = artworksSlice.reducer;

export const useArtworks = () =>
  useSelector((state: RootState) => state.artworks);
