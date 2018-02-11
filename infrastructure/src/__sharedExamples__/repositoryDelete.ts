"use strict";

import { BaseEntity, IRepository } from "~/core";

const repositoryDelete = <T extends BaseEntity>(repository: IRepository<T>, newEntityFactory: () => T) => {
  describe("Delete", () => {
    const entity = newEntityFactory();
    let resource: T;

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
};

export { repositoryDelete };
