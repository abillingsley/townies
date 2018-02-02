"use strict";
/* tslint:disable:max-line-length */

import * as Faker from "faker";
import { ILogger } from "~/core";
import { GoodLogger } from "../goodLogger";

describe("GoodLogger", () => {
  let serverLogger: GoodLogger;
  let messages: {
    debug: string [],
    info: string [],
    warn: string [],
    error: string [],
  };
  const logger: ILogger = {
    debug: jest.fn().mockImplementation((format: string, ...params: any[]) => {
      messages.debug.push(format);
    }),
    info: jest.fn().mockImplementation((format: string, ...params: any[]) => {
      messages.info.push(format);
    }),
    warn: jest.fn().mockImplementation((format: string, ...params: any[]) => {
      messages.warn.push(format);
    }),
    error: jest.fn().mockImplementation((format: string, ...params: any[]) => {
      messages.error.push(format);
    }),
  };
  beforeEach(() => {
    messages = {
      debug: [],
      info: [],
      warn: [],
      error: [],
    };
    serverLogger = new GoodLogger(logger);
  });

  describe("log events", () => {
    let data: any;
    const event = {
      event: "log",
      tags: [],
      data,
    };

    describe("when data is empty", () => {
      beforeEach(() => {
        data = "";
        event.data = data;
      });

      test("message is formatted properly", () => {
        serverLogger._write(event, "utf8", (e: Error, d: any) => {}); // tslint:disable-line no-empty
        expect(messages.info).toEqual([`[log] `]);
      });
    });

    describe("when data is a string", () => {
      beforeEach(() => {
        data = Faker.lorem.sentence();
        event.data = data;
      });

      test("message is formatted properly", () => {
        serverLogger._write(event, "utf8", (e: Error, d: any) => {}); // tslint:disable-line no-empty
        expect(messages.info).toEqual([`[log] "${data}"`]);
      });
    });

    describe("when data is an object", () => {
      beforeEach(() => {
        data = {
          content: Faker.lorem.sentence(),
        };
        event.data = data;
      });

      test("message is formatted properly", () => {
        serverLogger._write(event, "utf8", (e: Error, d: any) => {}); // tslint:disable-line no-empty
        expect(messages.info).toEqual([`[log] ${JSON.stringify(data)}`]);
      });
    });
  });

  describe("ops events", () => {
    const event = {
      event: "ops",
      proc: {
        mem: {
          rss: Faker.random.number(),
        },
        uptime: Faker.random.number(),
      },
      os: {
        load: Faker.random.number(),
      },
      tags: [],
    };

    test("message is formatted properly", () => {
      serverLogger._write(event, "utf8", (e: Error, d: any) => {}); // tslint:disable-line no-empty
      const memory = Math.round(event.proc.mem.rss / (1024 * 1024));
      expect(messages.debug).toEqual([`[ops] memory: ${memory}Mb, uptime: ${event.proc.uptime}s, load: ${event.os.load}`]);
    });
  });

  describe("request events", () => {
    const event = {
      event: "request",
      instance: Faker.random.uuid(),
      method: "GET",
      path: "/fake/fakest",
      tags: [],
      data: {
        content: Faker.lorem.sentence(),
      },
    };

    test("message is formatted properly", () => {
      serverLogger._write(event, "utf8", (e: Error, d: any) => {}); // tslint:disable-line no-empty
      expect(messages.info).toEqual([`[request] ${event.instance}: GET ${event.path} ${JSON.stringify(event.data)}`]);
    });
  });

  describe("response events", () => {
    const event = {
      event: "response",
      instance: Faker.random.uuid(),
      method: "GET",
      path: "/fake/fakest",
      statusCode: 200,
      responseTime: Faker.random.number(),
      tags: [],
      query: {
        content: Faker.lorem.sentence(),
      },
    };

    test("message is formatted properly", () => {
      serverLogger._write(event, "utf8", (e: Error, d: any) => {}); // tslint:disable-line no-empty
      expect(messages.info).toEqual([`[response] ${event.instance}: GET ${event.path} ${JSON.stringify(event.query)} 200 (${event.responseTime}ms)`]);
    });
  });

  describe("error events", () => {
    const error = new Error("example error");
    const event = {
      event: "error",
      error,
    };

    test("message is formatted properly", () => {
      serverLogger._write(event, "utf8", (e: Error, d: any) => {}); // tslint:disable-line no-empty
      expect(messages.error).toEqual([`[error] message: ${error.message}, stack: ${error.stack}`]);
    });
  });

  describe("when data is an error", () => {
    const error = new Error("example error");
    const event = {
      data: error,
    };

    test("message is formatted properly", () => {
      serverLogger._write(event, "utf8", (e: Error, d: any) => {}); // tslint:disable-line no-empty
      expect(messages.error).toEqual([`[] message: ${error.message}, stack: ${error.stack}`]);
    });
  });
});
