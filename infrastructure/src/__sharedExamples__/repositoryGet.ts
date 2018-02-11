"use strict";

import { BaseEntity, IRepository } from "~/core";

const getById = <T extends BaseEntity>(repository: IRepository<T>, newEntityFactory: () => T) => {
  describe("GetById", () => {
    const entity = newEntityFactory();

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
};

export { getById };
