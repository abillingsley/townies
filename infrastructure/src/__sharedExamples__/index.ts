"use strict";

import { add } from "./repositoryAdd";
import { repositoryDelete } from "./repositoryDelete";
import { getById } from "./repositoryGet";
import { list } from "./repositoryList";
import { update } from "./repositoryUpdate";

const behavesLike = {
  repository: {
    list,
    getById,
    add,
    update,
    delete: repositoryDelete,
  },
};

export { behavesLike };
