"use strict";
/* tslint:disable:max-classes-per-file */

import * as Faker from "faker";
import Knex = require("knex");
import { Column, Length, Sequelize, Table } from "sequelize-typescript";
import { BaseEntity, IMapper } from "~/core";
import { ConsoleLogger, Database, SequelizeRepository } from "~/infrastructure";
import BaseModel from "~/infrastructure/src/postgres/models/baseModel";
import { behavesLike } from "../../__sharedExamples__";
import SequelizeConfig from "../sequelizefile";

class FakeEntity extends BaseEntity {
  public name: string;

  constructor(options?: any) {
    super(options);
    this.name = options.name;
  }
}

@Table({ tableName: "fakes" })
class FakeModel extends BaseModel<FakeModel> {
    @Length({min: 1, max: 255})
    @Column({ unique: true, allowNull: false })
    public name: string;
}

class FakeEntityMapper implements IMapper<FakeEntity> {
  public map(resource: any): FakeEntity {
    return new FakeEntity(resource);
  }
}
class FakeRepository extends SequelizeRepository<FakeEntity, FakeModel> {}

describe("SequelizeRepository", () => {
  const sequelize = new Sequelize(SequelizeConfig);
  const database = new Database(new ConsoleLogger(), sequelize);
  beforeAll(async () => {
    await database.connect();
    sequelize.addModels([FakeModel]);
    const knex = Knex(require("../knexfile"));
    const schema = knex.schema;
    if (!(await schema.hasTable("fakes"))) {
      await schema.createTable("fakes", (table: Knex.CreateTableBuilder) => {
        table.increments();
        table.string("name").notNullable().unique();
        table.timestamps(true, true);
        table.timestamp("deleted_at");
      });
    }
    await knex.destroy();
  });

  afterAll(async () => {
    await database.disconnect();
  });

  const repository: FakeRepository = new FakeRepository(FakeModel, new FakeEntityMapper());
  const newEntityFactory = (): FakeEntity => {
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
