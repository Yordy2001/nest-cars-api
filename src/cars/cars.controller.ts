import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CarsService } from './cars.service';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}
  @Get()
  getAllCars() {
    try {
      return this.carsService.findAll();
    } catch (error) {}
  }

  @Get(':id')
  getCar(@Param('id', ParseIntPipe) id: string) {
    try {
      return this.carsService.findOneById(+id);
    } catch (error) {
      return 'NOT FOUND';
    }
  }

  @Post()
  createCar(@Body() payload: any) {
    return payload;
  }

  @Patch(':id')
  updateCar(@Param() id: string, @Body() payload: any) {
    return payload;
  }

  @Delete(':id')
  deleteCar(@Param() id: string) {
    return '';
  }
}
