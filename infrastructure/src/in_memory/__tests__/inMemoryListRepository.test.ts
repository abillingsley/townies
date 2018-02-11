"use strict";
/* tslint:disable:max-classes-per-file */

import * as Faker from "faker";

import { BaseEntity, IMapper } from "~/core";
import { behavesLike } from "../../__sharedExamples__";
import { SimpleIdFactory } from "../factory/simpleIdFactory";
import { InMemoryListRepository } from "../inMemoryListRepository";
import { UUIDProvider } from "../uuidProvider";

class FakeEntity extends BaseEntity {
  public name: string;

  constructor(options?: any) {
    super(options);
    this.name = options.name;
  }
}

class FakeEntityMapper implements IMapper<FakeEntity> {
  public map(resource: any): FakeEntity {
    return new FakeEntity(resource);
  }
}

describe("InMemoryListRepository", () => {
  const repository = new InMemoryListRepository(new SimpleIdFactory(new UUIDProvider()), new FakeEntityMapper());
  const newEntityFactory = () => {
    return new FakeEntity({ name: Faker.lorem.sentence() });
  };
  const updateEntityFactory = (entity: FakeEntity): FakeEntity => {
    entity.name = Faker.lorem.sentence();
    return entity;
  };
  beforeEach(async () => {
    await repository.drop();
  });

  behavesLike.repository.list(repository, newEntityFactory);
  behavesLike.repository.getById(repository, newEntityFactory);
  behavesLike.repository.add(repository, newEntityFactory);
  behavesLike.repository.update(repository, newEntityFactory, updateEntityFactory);
  behavesLike.repository.delete(repository, newEntityFactory);
});
