import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { City, LOCATION } from "../types";

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
        let cityIndex;
        if (action.payload.location !== LOCATION.LOCATION_NO) {
          cityIndex = state.findIndex(
            (city) => city.location !== LOCATION.LOCATION_NO
          );
        } else {
          cityIndex = state.findIndex((city) => city.id === action.payload.id);
        }
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
    removeCity: {
      reducer: (state, action: PayloadAction<Number>) => {
        return state.filter((city) => city.id !== action.payload);
      },
      prepare: (value) => ({
        payload: value,
      }),
    },
  },
});

let { actions } = citySlice;
export const { addCity, setCityList, removeCity } = actions;
