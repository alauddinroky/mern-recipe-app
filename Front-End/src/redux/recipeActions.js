import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = "http://localhost:5000";
const API = axios.create({ baseURL });

const token = JSON.parse(localStorage.getItem("AuthVerification"));

API.interceptors.request.use((config) => {
  if (token) {
    config.headers.Authorization = `Bearer ${token.token}`;
  }
  return config;
});

export const fetchRecipes = createAsyncThunk(
  "recipes/fetchRecipes",
  async (_, thunkAPI) => {
    try {
      if (!token) {
        throw new Error("Please login to enter this page");
      }
      const response = await API.get("/getRecipe");
      return response.data;
    } catch (error) {
      // let errorMessage = "An unknown error occurred";
      // if (error.response && error.response.data && error.response.data.msg) {
      //   errorMessage = error.response.data.msg;
      // } else if (error.message) {
      //   errorMessage = error.message;
      // }
      return thunkAPI.rejectWithValue(
        error.response?.data?.msg || error.message
      );
    }
  }
);
