"use strict";
/* tslint:disable:max-classes-per-file */

import * as Faker from "faker";
import Knex = require("knex");
import { Column, Length, Table } from "sequelize-typescript";
import { BaseEntity, IMapper } from "~/core";
import { Database, SequelizeRepository } from "~/infrastructure";
import BaseModel from "~/infrastructure/src/postgres/models/baseModel";

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
  beforeAll(async () => {
      await Database!.addModels([FakeModel]);
      const knex =  Knex(require("../knexfile"))
      const schema = knex.schema;
      if (!(await schema.hasTable("fakes"))) {
        await schema.createTable("fakes", (table: Knex.CreateTableBuilder) => {
         table.increments();
         table.string("name").notNullable().unique();
         table.timestamps(true, true);
         table.timestamp("deleted_at");
        }).then();
      }
      await knex.destroy();
  });

  afterAll(async() => {
    await Database!.close();
  });

  let repository: FakeRepository;
  beforeEach(async () => {
    await FakeModel.truncate({ cascade: true, force: true });
    repository = new FakeRepository(FakeModel, new FakeEntityMapper());
  });

  describe("List", async () => {
    test("returns all resources", async () => {
      const entity = new FakeEntity({ name: Faker.lorem.sentence() });
      await repository.add(entity);
      const result = await repository.list();
      expect(result.length).toEqual(1);
    });
  });

  test("returns specific page", async () => {
    const entity = new FakeEntity({ name: Faker.lorem.sentence() });
    await repository.add(entity);
    const result = await repository.list({ limit: 1, offset: 1});
    expect(result.length).toEqual(0);
  });

  describe("GetById", () => {
    const entity = new FakeEntity({ name: Faker.lorem.sentence() });

    test("that is found", async () => {
      const resource = await repository.add(entity);
      const result = await repository.getById(resource!.id);
      expect(result).not.toBeNull();
    });

    test("that is unknown", async () => {
      const result = await repository.getById(-999);
      expect(result).toBeNull();
    });
  });

  describe("Add", () => {
    test("creates a new resource", async () => {
      const name = Faker.random.alphaNumeric(Faker.random.number({ min: 1, max: 255}));
      const entity = new FakeEntity({ name });
      const result = await repository.add(entity);
      expect(result.id).toBeDefined();
    });
  });

  describe("Update", () => {
    const name = Faker.lorem.sentence();
    const entity = new FakeEntity({ name: Faker.lorem.sentence() });
    let resource: FakeEntity;

    beforeEach(async () => {
      resource = (await repository.add(entity))!;
    });

    test("updates to new name", async () => {
      resource.name = name;
      await repository.update(resource);
      const result = await repository.getById(resource.id);
      expect(result!.name).toEqual(name);
    });

    test("reuses same name", async () => {
      await repository.update(resource);
      const result = await repository.getById(resource.id);
      expect(result!.name).toEqual(resource.name);
    });

    test("that is unknown", async () => {
      resource.id = -999;
      resource.name = name;
      await expect(repository.update(resource)).rejects.toEqual(undefined);
    });
  });

  describe("Delete", () => {
    const entity = new FakeEntity({ name: Faker.lorem.sentence() });
    let resource: FakeEntity;

    beforeEach(async () => {
      resource = (await repository.add(entity))!;
    });

    test("removes resource", async () => {
      await repository.delete(resource);
      const result = await repository.getById(resource!.id);
      expect(result).toBeNull();
    });

    test("that is unknown", async () => {
      resource.id = -999;
      await expect(repository.delete(resource)).rejects.toEqual(undefined);
    });
  });
});
