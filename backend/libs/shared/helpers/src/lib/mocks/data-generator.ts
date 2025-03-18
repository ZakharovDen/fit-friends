import { getDescriptions, getImages, getTitles, getVideos } from './trainings';
import { getUsers } from './user';
import { Sex, Training, TrainingDuration, TrainingLevel, TrainingType } from "@backend/core";

enum Price {
  Min = 0,
  Max = 10000
}

enum Calories {
  Min = 1000,
  Max = 5000,
}

export class DataGenerator {

  private generateRandomValue(min: number, max: number, numAfterDigit = 0) {
    return +((Math.random() * (max - min)) + min).toFixed(numAfterDigit);
  }

  private getRandomItem<T>(items: T[]): T {
    return items[this.generateRandomValue(0, items.length - 1)];
  }

  private generateRandomDate(): Date {
    const startTime = new Date(2024, 0, 1).getTime();
    const endTime = new Date().getTime();
    const randomTime = startTime + Math.random() * (endTime - startTime);
    return new Date(randomTime);
  }

  public generateTraining(): Training {
    return {
      userId: this.getRandomItem(getUsers()).id,
      title: this.getRandomItem<string>(getTitles()),
      image: this.getRandomItem<string>(getImages()),
      level: this.getRandomItem<TrainingLevel>(Object.values(TrainingLevel)),
      type: this.getRandomItem<TrainingType>(Object.values(TrainingType)),
      duration: this.getRandomItem<TrainingDuration>(Object.values(TrainingDuration)),
      price: this.generateRandomValue(Price.Min, Price.Max),
      calories: this.generateRandomValue(Calories.Min, Calories.Max),
      description: this.getRandomItem<string>(getDescriptions()),
      sex: this.getRandomItem<Sex>(Object.values(Sex)),
      video: this.getRandomItem<string>(getVideos()),
      specialOffer: this.getRandomItem<boolean>(Object.values([true, false])),
      createdAt: this.generateRandomDate()
    };
  }
}
