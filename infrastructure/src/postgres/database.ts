"use strict";

import * as fs from "fs";
import * as Inflected from "inflected";
import { DefineAttributeColumnOptions, DefineAttributes, ValidationError } from "sequelize";
import { Sequelize } from "sequelize-typescript";
import { ILogger } from "~/core";
import { ConsoleLogger } from "../logging/consoleLogger";
import SequelizeConfig from "./sequelizefile";

let sequelize: Sequelize | null = null;
// TODO: configure with DI
const logger: ILogger = new ConsoleLogger();

const init = async (): Promise<Sequelize> => {
  if (!sequelize) {
    logger.info("Initializing sequelize...");
    try {
      sequelize = new Sequelize(SequelizeConfig);
      sequelize.addHook("beforeDefine", (attributes: DefineAttributes) => {
        Object.keys(attributes).forEach((key) => {
          if (!(attributes[key] as DefineAttributeColumnOptions).field) {
            (attributes[key] as DefineAttributeColumnOptions).field = Inflected.underscore(key);
          }
        });
      });
      const modelPath = __dirname + "/models";
      if (fs.existsSync(modelPath)) {
        logger.debug("Adding models");
        sequelize.addModels([modelPath]);
        logger.debug("Done adding models");
      }

      const err: ValidationError = await sequelize.validate();
      if (err && err.errors.length > 0) {
        throw new Error("Error connecting to postgres: " + err.errors[0].message);
      }
      logger.info("Sequelize initialized.");
    } catch (err) {
      throw err;
    }
  }

  return sequelize;
};

const close = (): void => {
  if (sequelize) {
    logger.info("Stopping sequelize...");
    sequelize.close();
    sequelize = null;
    logger.info("Sequelize stopped.");
  }
};

export {
  init,
  close,
  sequelize,
};
