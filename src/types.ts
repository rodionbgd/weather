declare global {
  interface Window {
    TOUCH: boolean;
    WE: any;
    google: any;
    googleAutoComplete: any;
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

export type CityWeather = {
  timezone: string;
  timezone_offset: number;
  lat: number;
  lon: number;
  current: {
    humidity: number;
    pressure: number;
    sunrise: number;
    sunset: number;
    temp: number;
    weather: [{ icon: string; description: string }];
    wind_deg: number;
    wind_speed: number;
  };
  hourly: [{ temp: number }];
};
export type Coords = {
  latitude: number;
  longitude: number;
};
export type City = {
  name: string;
  coords: Coords;
  isCurrentCity?: boolean;
  updateTime: string;
  weather: CityWeather;
};
