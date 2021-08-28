import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';
import { ICarsRepository } from '../repositories/ICarsRepository';
import { Car } from '../infra/typeorm/entities/Car';

interface IRequest {
  id: string;
  name: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  brand: string;
  category_id: string
}

@injectable()
class UpdateCarService {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
  ) { }

  public async execute({
    id,
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id
  }: IRequest): Promise<Car> {
    const car = await this.carsRepository.findById(id);

    if (!car) {
      throw new AppError('This car does not exist.');
    }

    name ? car.name = name : car.name = ''
    description ? car.description = description : car.description = ''
    daily_rate ? car.daily_rate = daily_rate : car.daily_rate
    license_plate ? car.license_plate = license_plate : car.license_plate = ''
    fine_amount ? car.fine_amount = fine_amount : car.fine_amount
    brand ? car.brand = brand : car.brand = ''
    category_id ? car.category_id = category_id : car.category_id = ''

    const carUpdate = await this.carsRepository.save(car);

    return carUpdate;
  }
}

export default UpdateCarService;
