"use strict";

import { BaseEntity, IRepository } from "~/core";

const update = <T extends BaseEntity>(repository: IRepository<T>,
                                      newEntityFactory: () => T,
                                      updateEntityFactory: (entity: T) => T) => {
  describe("Update", () => {
    const entity = newEntityFactory();
    let resource: T;

    beforeEach(async () => {
      resource = (await repository.add(entity))!;
    });

    test("applies update", async () => {
      const updated = updateEntityFactory(resource);
      await repository.update(updated);
      const result = await repository.getById(resource.id);
      expect(result!).toMatchObject(updated);
    });

    test("that is unknown", async () => {
      const updated = updateEntityFactory(resource);
      updated.id = -999;
      await expect(repository.update(updated)).rejects.toEqual(undefined);
    });
  });
};

export { update };
