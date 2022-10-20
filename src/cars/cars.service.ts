import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { ICar } from './interfaces/car.interface';

@Injectable()
export class CarsService {
  private cars: ICar[] = [
    // {
    //   id: uuid(),
    //   brand: 'Toyota',
    //   model: 'Corolla',
    // },
  ];

  findAll() {
    return this.cars;
  }

  findOneById(id: string) {
    const car = this.cars.find((car) => car.id === id);
    if (!car) {
      throw new NotFoundException(`Car with id ${id} Not Found`);
    }
    return car;
  }

  create({ brand, model }: CreateCarDto) {
    this.cars.push({ id: uuid(), brand, model });
    return this.cars;
  }

  update(id: string, UpdateCarDto: UpdateCarDto) {
    let carDB = this.findOneById(id);

    if (UpdateCarDto.id && UpdateCarDto.id !== id) {
      throw new BadRequestException(`Car id is not valid inside body`);
    }

    this.cars.map((car) => {
      if (car.id === id) {
        carDB = { ...carDB, ...UpdateCarDto, id };
        return carDB;
      }
      return car;
    });

    return carDB;
  }

  delete(id: string) {
    const car = this.findOneById(id);
    this.cars.filter((cars) => cars !== car);
  }

  fillCarsWithSeddData(cars: ICar[]) {
    return (this.cars = cars);
  }
}
