import { createSlice } from "@reduxjs/toolkit";
import { fetchRecipes } from "./recipeActions";

const recipeSlice = createSlice({
  name: "recipes",
  initialState: {
    recipeList: [],
    loading: false,
    error: null,
  },
  reducers: {}, // You can define additional reducers here if needed

  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error when fetching starts
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        // console.log(action.payload.data, 4444);
        state.recipeList = action.payload; // No need for action.payload.data
        state.loading = false;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        console.log(action, 333);
        state.error = action.payload; // Access error message directly
        state.loading = false;
      });
  },
});

export default recipeSlice.reducer;
