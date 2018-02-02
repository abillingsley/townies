"use strict";

import * as Faker from "faker";
import * as Joi from "joi";
import { BaseEntity } from "~/core";
import { BasePresenter as Presenter } from "../basePresenter";

class FakeEntity extends BaseEntity {
  public name: string;

  constructor(options?: any) {
    super(options);
    this.name = options.name;
  }
}

describe("BasePresenter", () => {
  const attributes: string[] = ["name"];
  const FakeEntitySchema = Joi.object({
    name: Joi.string().required().example("fake"),
  });
  const FakeEntitiesSchema = Joi.array().required().items(FakeEntitySchema);

  describe("with single entity", () => {
    const id = Faker.random.uuid();
    const name = Faker.lorem.sentence();
    const entity = new FakeEntity({ id, name });
    const presenter = new Presenter(entity, attributes);
    const json = presenter.toJson();

    test("has correct name", () => {
      expect(json.name).toEqual(name);
    });

    test("matches schema definition", () => {
      Joi.assert(json, FakeEntitySchema);
    });
  });

  describe("with no entities", () => {
    const entities: FakeEntity[] = [];
    const presenter = new Presenter(entities, attributes);
    const json = presenter.toJson();

    test("matches schema definition", () => {
      Joi.assert(json, FakeEntitiesSchema);
    });
  });

  describe("with multiple entities", () => {
    const entities = [1, 2].map(() =>
      new FakeEntity({
        id: Faker.random.number(),
        name: Faker.lorem.sentence(),
      }));
    const presenter = new Presenter(entities, attributes);
    const json = presenter.toJson();

    test("matches schema definition", () => {
      Joi.assert(json, FakeEntitiesSchema);
    });
  });
});
