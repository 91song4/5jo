import { Controller, Get, Query } from '@nestjs/common';
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get('/current')
  async getCurrentWeather(
    @Query('lat') lat: number,
    @Query('lon') lon: number,
  ) {
    const apiKey = '6426e8bf5d9f204eda715c3a7862755c';
    const weatherData = await this.weatherService.getCurrentWeather(
      lat,
      lon,
      apiKey,
    );
    return weatherData.current;
  }
}
