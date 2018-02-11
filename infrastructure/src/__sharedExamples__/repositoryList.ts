"use strict";

import { BaseEntity, IRepository } from "~/core";

const list = <T extends BaseEntity>(repository: IRepository<T>, newEntityFactory: () => T) => {
  describe("List", async () => {
    test("returns all resources", async () => {
      const entity = newEntityFactory();
      await repository.add(entity);
      const result = await repository.list();
      expect(result.length).toEqual(1);
    });

    test("returns specific page", async () => {
      const entity = newEntityFactory();
      await repository.add(entity);
      const result = await repository.list({ limit: 1, offset: 1});
      expect(result.length).toEqual(0);
    });
  });
};

export { list };
