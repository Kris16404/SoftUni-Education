export interface Weather {
  base?: string;
  clouds?: object;
  cod?: number;
  coord?: object;
  dt?: number;
  id?: number;
  main?: {
    temp: number;
    humidity: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
  };
  name?: string;
  sys?: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone?: number;
  visibility?: number;

  wind?: { speed: number; deg: number };
}
