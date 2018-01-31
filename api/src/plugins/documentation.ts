"use strict";

import { PluginRegistrationObject } from "hapi";

export default [
  {
    register: require("inert"),
  } as PluginRegistrationObject<any>,
  {
    register: require("vision"),
  } as PluginRegistrationObject<any>,
  {
    register: require("hapi-swaggered"),
    options: {
      info: {
        title: "Application API Documentation",
        version: "V1",
      },
      tags: [

      ],
      tagging: {
        mode: "tags",
      },
    },
  } as PluginRegistrationObject<any>,
  {
    register: require("hapi-swaggered-ui"),
    options: {
      title: "Application API Documentation",
      path: "/documentation",
      swaggerOptions: {
        docExpansion: "list",
      },
    },
  } as PluginRegistrationObject<any>,
];
