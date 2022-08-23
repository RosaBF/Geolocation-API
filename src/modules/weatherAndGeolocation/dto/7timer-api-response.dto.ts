export interface IWeatherApiResponse {
  dataseries: [
    {
      cloudcover: number;
      liftedindex: number;
      prec_type: string;
      prec_amount: number;
      temp2m: number;
      rh2m: string;
      weather: string;
    }
  ];
}
