export interface IWeatherApiQueryDTO {
  cloudcover?: number;
  temperature?: number;
  humidity?: string;
  weather?: string;
  lat: string;
  lon: string;
}
