import { Training, Entity, StorableEntity, TrainingLevel, TrainingType, TrainingDuration, Sex } from '@backend/core';
import { DataGenerator, getImages } from '@backend/helpers';

export class FitTrainingEntity extends Entity implements StorableEntity<Training> {
  public userId: string;
  public title: string;
  public image: string;
  public level: TrainingLevel;
  public type: TrainingType;
  public duration: TrainingDuration;
  public price: number;
  public calories: number;
  public description: string;
  public sex: Sex;
  public video: string;
  public specialOffer: boolean;
  public rating: number;
  public createdAt?: Date;
  public updatedAt?: Date;

  private dataGenerator = new DataGenerator();

  constructor(training?: Training) {
    super();
    this.populate(training);
  }

  populate(training?: Training): void{
    if (!training) {
      return;
    }

    this.id = training.id ?? undefined;
    this.userId = training.userId;
    this.title = training.title;
    this.image = training.image ?? this.dataGenerator.getRandomItem<string>(getImages());
    this.level = training.level;
    this.type = training.type;
    this.duration = training.duration;
    this.price = training.price;
    this.calories = training.calories;
    this.description = training.description;
    this.sex = training.sex;
    this.video = training.video ?? undefined;
    this.specialOffer = training.specialOffer ?? false;
    this.rating = training.rating ?? 0;
    this.createdAt = training.createdAt ?? undefined;
    this.updatedAt = training.updatedAt ?? undefined;
  }

  toPOJO(): Training {
    return {
      id: this.id,
      userId: this.userId,
      title: this.title,
      image: this.image,
      level: this.level,
      type: this.type,
      duration: this.duration,
      price: this.price,
      calories: this.calories,
      description: this.description,
      sex: this.sex,
      video: this.video,
      specialOffer: this.specialOffer,
      rating: this.rating,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }

}