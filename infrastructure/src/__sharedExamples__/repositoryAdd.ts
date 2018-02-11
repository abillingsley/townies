"use strict";

import { BaseEntity, IRepository } from "~/core";

const add = <T extends BaseEntity>(repository: IRepository<T>, newEntityFactory: () => T) => {
  describe("Add", () => {
    test("creates a new resource", async () => {
      const entity = newEntityFactory();
      const result = await repository.add(entity);
      expect(result.id).toBeDefined();
    });
  });
};

export { add };
