"use strict";

import * as Faker from "faker";
import * as Hapi from "hapi";
import * as jwt from "jsonwebtoken";
import { Server } from "../../../../server";
import ApplicationAuthorizedRoute from "../applicationAuthorizedRoute";
import { Unauthorized } from "../schema";

import { Auth0 } from "~/config";

class FakeRoute extends ApplicationAuthorizedRoute implements Hapi.RouteAdditionalConfigurationOptions {
  public response: Hapi.RouteResponseConfigurationObject = {
    status: {
      401: Unauthorized,
    },
  };

  public async handler(request: Hapi.Request, reply: Hapi.Base_Reply) {
    reply({});
  }
}

let server: Hapi.Server;
beforeAll(async () => {
  server = await new Server().register();
  server.route([
    { method: "GET", path: "/api/v1/fake", config: new FakeRoute() },
  ]);
});

describe("GET :/api/v1/fake", () => {
  const request: Hapi.InjectedRequestOptions = {
    method: "GET",
    url: "/api/v1/fake",
  };

  describe("with RS256 jwt token", () => {
    const email: string = Faker.internet.email();
    const firstName: string = Faker.name.firstName();
    const lastName: string = Faker.name.lastName();
    const userName: string = Faker.internet.userName();
    const picture: string = Faker.image.avatar();
    const kid: string = "NUVFQUVGRjIwMkZDNjE3NEUzM0Q4Q0I5QzI2NjkzQTFGOUQ5QUNFRQ";
    const privateKey: Buffer = Buffer.from(`-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEAvtH4wKLYlIXZlfYQFJtXZVC3fD8XMarzwvb/fHUyJ6NvNStN
+H7GHp3/QhZbSaRyqK5hu5xXtFLgnI0QG8oE1NlXbczjH45LeHWhPIdc2uHSpzXi
c78kOugMY1vng4J10PF6+T2FNaiv0iXeIQq9xbwwPYpflViQyJnzGCIZ7VGan6Gb
RKzyTKcB58yx24pJq+CviLXEY52TIW1l5imcjGvLtlCp1za9qBZa4XGoVqHi1kRX
kdDSHty6lZWj3KxoRvTbiaBCH+75U7rifS6fR9lqjWE57bCGoz7+BBu9YmPKtI1K
kyHFqWpxaJc/AKf9xgg+UumeqVcirUmAsHJrMwIDAQABAoIBAQCYKw05YSNhXVPk
eHLeW/pXuwR3OkCexPrakOmwMC0s2vIF7mChN0d6hvhVlUp68X7V8SnS2JxAGo8v
iHY+Et3DdwZ3cxnzwh+BEhzgDfoIOmkoGppZPyX/K6klWtbGUrTtSISOWXbvEXQU
G0qGAvDOzIGTsdMDX7slnU70Ac23JybPY5qBSiE+ky8U4dm2fUHMroWub4QP5vA/
nqyWqX2FB/MEAbcujaknDQrFCtbmtUYlBbJCKGd9V3cGEqp6H7oH+ah2ofMc91gJ
mCHk3YyWZB/bcVXH3CA+s1ywvCOVDBZ3Nw7Pt9zIcv6Rl9UKIy+Nx0QjXxR90Hla
Tr0GHIShAoGBAPsD7uXm+0ksnGyKRYgvlVad8Z8FUFT6bf4B+vboDbx40FO8O/5V
PraBPC5z8YRSBOQ/WfccPQzakkA28F2pXlRpXu5JcErVWnyyUiKpX5sw6iPenQR2
JO9hY/GFbKiwUhVHpvWMcXFqFLSQu2A86jPnFFEfG48ZT4IhTzINKJVZAoGBAMKc
B3YGfVfY9qiRFXzYRdSRLg5c8p/HzuWwXc9vfJ4kQTDkPXe/+nqD67rzeT54uVec
jKoIrsCu4BfEaoyvOT+1KmUfdEpBgYZuuEC4CZf7dgKbXOpPVvZDMyJ/e7HyqTpw
mvIYJLPm2fNAcAsnbrNX5mhLwwzEIltbplUUeRdrAoGBAKhZgPYsLkhrZRXevreR
wkTvdUfD1pbHxtFfHqROCjhnhsFCM7JmFcNtdaFqHYczQxiZ7IqxI7jlNsVek2Md
3qgaa5LBKlDmOuP67N9WXUrGSaJ5ATIm0qrB1Lf9VlzktIiVH8L7yHHaRby8fQ8U
i7b3ukaV6HPW895A3M6iyJ8xAoGAInp4S+3MaTL0SFsj/nFmtcle6oaHKc3BlyoP
BMBQyMfNkPbu+PdXTjtvGTknouzKkX4X4cwWAec5ppxS8EffEa1sLGxNMxa19vZI
yJaShI21k7Ko3I5f7tNrDNKfPKCsYMEwgnHKluDwfktNTnyW/Uk2dgXuMaXSHHN5
XZt59K8CgYArGVOWK7LUmf3dkTIs3tXBm4/IMtUZmWmcP9C8Xe/Dg/IdQhK5CIx4
VXl8rgZNeX/5/4nJ8Q3LrdLau1Iz620trNRGU6sGMs3x4WQbSq93RRbFzfG1oK74
IOo5yIBxImQOSk5jz31gF9RJb15SDBIxonuWv8qAERyUfvrmEwR0kg==
-----END RSA PRIVATE KEY-----`, "utf8");

    const token: string = jwt.sign({
      email,
      email_verified: true,
      given_name: firstName,
      family_name: lastName,
      nickname: userName,
      name: `${firstName} ${lastName}`,
      picture,
      locale: "en",
      sub: "google-oauth2|106243064761677479593", // client.ClientId + "@clients",
    }, privateKey, {
      algorithm: Auth0.algorithm,
      keyid: kid,
      expiresIn: 7200,
      issuer: Auth0.issuer,
      audience: Auth0.webClient,
    });
    beforeEach(() => {
      request.headers = {
        authorization: `Bearer ${token}`,
      };
    });

    describe("with valid token", () => {
      test("returns 200", async () => {
        const response = await server.inject(request);
        expect(response.statusCode).toEqual(200);
      });
    });

    describe("when the token is created for unsupported client", () => {
      test("returns 401", async () => {
        const response = await server.inject(request);
        expect(response.statusCode).toEqual(401);
      });
    });

    describe("when the token is provided by invalid issuer", () => {
      test("returns 401", async () => {
        const response = await server.inject(request);
        expect(response.statusCode).toEqual(401);
      });
    });

    describe("when the token is expired", () => {
      test("returns 401", async () => {
        const response = await server.inject(request);
        expect(response.statusCode).toEqual(401);
      });
    });

    describe("when the user's email is not verified", () => {
      test("returns 401", async () => {
        const response = await server.inject(request);
        expect(response.statusCode).toEqual(401);
      });
    });
  });

  describe("jwt token with invalid algorithm", () => {
    const username: string = Faker.internet.userName();
    const fullname: string = Faker.name.findName();
    const token: string = jwt.sign({ iss: username, sub: fullname }, "secret");
    beforeEach(() => {
      request.headers = {
        authorization: `Bearer ${token}`,
      };
    });

    test("returns 401", async () => {
      const response = await server.inject(request);
      expect(response.statusCode).toEqual(401);
    });
  });

  describe("with malformed token", () => {
    const token: string = Faker.random.uuid();
    beforeEach(() => {
      request.headers = {
        authorization: `Bearer ${token}`,
      };
    });

    test("returns 401", async () => {
      const response = await server.inject(request);
      expect(response.statusCode).toEqual(401);
    });
  });

  describe("without token", () => {
    test("returns 401", async () => {
      const response = await server.inject(request);
      expect(response.statusCode).toEqual(401);
    });
  });
});
