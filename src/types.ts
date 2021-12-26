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
export type WeatherData = {
  name: string;
  timezone_offset: number;
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
