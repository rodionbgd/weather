import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { City } from "../types";

const initialState = [] as City[];

export const citySlice = createSlice({
  name: "cities",
  initialState,
  reducers: {
    setCityList: {
      reducer: (state, action: PayloadAction<City[]>) => {
        state = action.payload;
        return state;
      },
      prepare: (value) => ({
        payload: value,
      }),
    },
    addCity: {
      reducer: (state, action: PayloadAction<City>) => {
        state.forEach((city) => {
          city.isCurrentCity = false;
        });
        const cityIndex = state.findIndex(
          (city) => city.name === action.payload.name
        );
        if (cityIndex === -1) {
          state.push(action.payload);
          return;
        }
        state[cityIndex] = action.payload;
      },
      prepare: (value) => ({
        payload: value,
      }),
    },
  },
});

let { actions } = citySlice;
export const { addCity, setCityList } = actions;
