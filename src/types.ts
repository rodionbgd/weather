export interface BeforeInstallPromptEvent extends Event {
  readonly platforms: Array<string>;
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;

  prompt(): Promise<void>;
}

declare global {
  interface Window {
    TOUCH: boolean;
    standalone: boolean;
    WE: any;
    getLocation: (force?: boolean) => void;
    google: any;
    googleAutoComplete: any;
    Slip: any;
    deferredPrompt: BeforeInstallPromptEvent;
  }
}

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

// eslint-disable-next-line
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
