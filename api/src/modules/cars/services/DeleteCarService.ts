import { inject, injectable } from "tsyringe";

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class DeleteCarService {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}

  async execute(id: string): Promise<void> {
    const car = await this.carsRepository.findById(id)

    if (!car) {
      throw new AppError("Car not exist!");
    }

    await this.carsRepository.delete(car);
  }
}

export { DeleteCarService };
