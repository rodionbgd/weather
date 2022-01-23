declare global {
  interface Window {
    TOUCH: boolean;
    WE: any;
    google: any;
    googleAutoComplete: any;
    Slip: any;
  }
}

export type MarkerWebGL = {
  setLatLng: any;
  bindPopup: any;
};

export type MapWebGL = {
  fitBounds: any;
  panInsideBounds: any;
  setView: any;
};

export type TemperatureObj = {
  min?: number;
  max?: number;
  day?: number;
  night?: number;
};

export type Weather = {
  moon_phase: number;
  moonset: number;
  moonrise: number;
  pop: number;
  feels_like: number;
  uvi: number;
  dt: number;
  humidity: number;
  pressure: number;
  sunrise: number;
  sunset: number;
  temp: TemperatureObj | number;
  weather: [
    {
      main: string;
      icon: string;
      description: string;
    }
  ];
  wind_deg: number;
  wind_speed: number;
};
export type CityWeather = {
  timezone: string;
  timezone_offset: number;
  lat: number;
  lon: number;
  current: Weather;
  hourly: Weather[];
  daily: Weather[];
};
export type Coords = {
  latitude: number;
  longitude: number;
};
export enum LOCATION {
  LOCATION_NO,
  LOCATION_OK,
  LOCATION_ERROR,
}
export type City = {
  id: number;
  name: string;
  location: LOCATION;
  coords: Coords;
  isCurrentCity?: boolean;
  updateTime: string;
  weather: CityWeather;
};
