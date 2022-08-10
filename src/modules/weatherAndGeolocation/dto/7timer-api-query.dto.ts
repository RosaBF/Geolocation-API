export interface IWeatherApiQueryDTO {
  cloudCover?: number;
  temperature?: number;
  humidity?: string;
  weather?: string;
  lat: string;
  lon: string;
}
