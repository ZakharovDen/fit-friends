import { AuthUser, Entity, StorableEntity, UserLocation, UserRole, Sex, Questionnaire } from '@backend/core';
import { compare, genSalt, hash } from 'bcrypt';
import { SALT_ROUNDS } from './user.constant';

export class UserEntity extends Entity implements StorableEntity<AuthUser>{
  public email: string;
  public name: string;
  public passwordHash: string;
  public avatar: string;
  public createdAt: Date;
  public updatedAt: Date;
  public backgroundImage: string;
  public location: UserLocation;
  public role: UserRole;
  public sex: Sex;
  public dateOfBirth: Date;
  public description: string;
  public questionnaire: Questionnaire;
  public friends: string[];

  constructor(user?: AuthUser) {
    super();
    this.populate(user);
  }

  populate(user?: AuthUser): void {
    if (! user) {
      return;
    }

    this.id = user.id ?? '';
    this.email = user.email;
    this.name = user.name;
    this.passwordHash = user.passwordHash;
    this.avatar = user.avatar ?? undefined;
    this.createdAt = user.createdAt ?? undefined;
    this.updatedAt = user.updatedAt ?? undefined;
    this.backgroundImage = user.backgroundImage;
    this.location = user.location;
    this.role = user.role;
    this.sex = user.sex;
    this.dateOfBirth = user.dateOfBirth ?? undefined;
    this.description = user.description ?? undefined;
    this.questionnaire = user.questionnaire ?? undefined;
    this.friends = user.friends ?? [];
  }

  toPOJO(): AuthUser {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
      passwordHash: this.passwordHash,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      avatar: this.avatar,
      backgroundImage: this.backgroundImage,
      location: this.location,
      role: this.role,
      sex: this.sex,
      dateOfBirth: this.dateOfBirth,
      description: this.description,
      questionnaire: this.questionnaire,
      friends: this.friends,
    };
  }

  public async setPassword(password: string): Promise<UserEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }
}
