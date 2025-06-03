import { BaseMongoRepository } from '@backend/data-access';

import { UserEntity } from './user.entity';
import { UserFactory } from './user.factory';
import { Injectable } from '@nestjs/common';
import { UserModel } from './user.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model, SortOrder } from 'mongoose';
import { UserQuery } from './user.query';
import { UserRole } from '@backend/core';

@Injectable()
export class UserRepository extends BaseMongoRepository<UserEntity, UserModel> {
  constructor(
    entityFactory: UserFactory,
    @InjectModel(UserModel.name) userModel: Model<UserModel>
  ) {
    super(entityFactory, userModel);
  }

  public async findByEmail(email: string): Promise<UserEntity | null> {
    const document = await this.model.findOne({ email }).exec();
    return this.createEntityFromDocument(document);
  }

  public async findAll(query: UserQuery) {
    const filter: Record<string, any> = {};
    let sortOrder: SortOrder = 'asc';

    if (query.locations) {
      filter.location = { $in: query.locations };
    }

    if (query.specializations) {
      filter['questionnaire.types'] = { $in: query.specializations };
    }

    if (query.level) {
      filter['questionnaire.level'] = query.level;
    }

    if (query.role === UserRole.Sportsman) {
      sortOrder = 'desc';
    }

    const documents = await this.model.find(filter).sort([['role', sortOrder], ['createdAt', 'desc']]).exec();
    return documents.map((document) => this.createEntityFromDocument(document));
  }

  public async getFriends(id: string) {
    const { friends } = await this.findById(id);
    const documents = await this.model.find({ _id: { $in: friends } }).exec();
    return documents.map((document) => this.createEntityFromDocument(document));
  }

}
