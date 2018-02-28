"use strict";

import { Request, Server as HapiServer } from "hapi";
import { Auth0 } from "~/config";
import { Identifiers, ILogger } from "~/core";
import Container from "./container";
import Plugins from "./plugins";
import Routes from "./plugins/routes";

export interface IJWTToken {
  aud: string;
  exp: number;
  iat: number;
  iss: string;
  sub: string;
  scope?: string;
}

export interface IUserToken extends IJWTToken {
  email: string;
  email_verified: boolean;
  given_name: string;
  family_name: string;
  nickname: string;
  name: string;
  picture: string;
  locale: string;
}

export interface IServerOptions {
  host?: string;
  port?: number;
}

export class Server {
  protected server: HapiServer;

  constructor(options?: IServerOptions) {
    this.server = new HapiServer();
    this.server.connection(options);
    this.server.on("request-error", (request: Request, error: Error) =>
      Container.get<ILogger>(Identifiers.RemoteLogger).error(error),
    );
  }

  public async register(): Promise<HapiServer> {
    return new Promise<HapiServer>((resolve, reject) => {
      this.server.register(Plugins, (registrationError: Error) => {
        if (registrationError) {
          reject(registrationError);
        } else {
          this.server.auth.strategy("jwt", "jwt", "required", {
            complete: true,
            key: require("jwks-rsa").hapiJwt2Key({
              cache: Auth0.jks.cache,
              rateLimit: Auth0.jks.rateLimit,
              jwksRequestsPerMinute: Auth0.jks.requestsPerMinute,
              jwksUri: Auth0.jks.uri,
            }),
            // TODO Ideally pull from DI
            //key: Container.get<IKeyLocator>(Identifiers.KeyLocator),
            // TODO: use the following key impl for tests so we can skip the auth0 dependency
//             key: (decoded: any, callback: (err: Error | null, key: Buffer | null, extraInfo: any) => void): void => {
//               if (!decoded || !decoded.header) {
//                 return callback(null, null, null);
//               }
//
//               if (decoded.header.alg !== "RS256") {
//                 return callback(null, null, null);
//               }
//               const publicKey: Buffer = Buffer.from(`-----BEGIN CERTIFICATE-----
// MIIDtTCCAp2gAwIBAgIJAMKR/NsyfcazMA0GCSqGSIb3DQEBBQUAMEUxCzAJBgNV
// BAYTAkFVMRMwEQYDVQQIEwpTb21lLVN0YXRlMSEwHwYDVQQKExhJbnRlcm5ldCBX
// aWRnaXRzIFB0eSBMdGQwHhcNMTIxMTEyMjM0MzQxWhcNMTYxMjIxMjM0MzQxWjBF
// MQswCQYDVQQGEwJBVTETMBEGA1UECBMKU29tZS1TdGF0ZTEhMB8GA1UEChMYSW50
// ZXJuZXQgV2lkZ2l0cyBQdHkgTHRkMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIB
// CgKCAQEAvtH4wKLYlIXZlfYQFJtXZVC3fD8XMarzwvb/fHUyJ6NvNStN+H7GHp3/
// QhZbSaRyqK5hu5xXtFLgnI0QG8oE1NlXbczjH45LeHWhPIdc2uHSpzXic78kOugM
// Y1vng4J10PF6+T2FNaiv0iXeIQq9xbwwPYpflViQyJnzGCIZ7VGan6GbRKzyTKcB
// 58yx24pJq+CviLXEY52TIW1l5imcjGvLtlCp1za9qBZa4XGoVqHi1kRXkdDSHty6
// lZWj3KxoRvTbiaBCH+75U7rifS6fR9lqjWE57bCGoz7+BBu9YmPKtI1KkyHFqWpx
// aJc/AKf9xgg+UumeqVcirUmAsHJrMwIDAQABo4GnMIGkMB0GA1UdDgQWBBTs83nk
// LtoXFlmBUts3EIxcVvkvcjB1BgNVHSMEbjBsgBTs83nkLtoXFlmBUts3EIxcVvkv
// cqFJpEcwRTELMAkGA1UEBhMCQVUxEzARBgNVBAgTClNvbWUtU3RhdGUxITAfBgNV
// BAoTGEludGVybmV0IFdpZGdpdHMgUHR5IEx0ZIIJAMKR/NsyfcazMAwGA1UdEwQF
// MAMBAf8wDQYJKoZIhvcNAQEFBQADggEBABw7w/5k4d5dVDgd/OOOmXdaaCIKvt7d
// 3ntlv1SSvAoKT8d8lt97Dm5RrmefBI13I2yivZg5bfTge4+vAV6VdLFdWeFp1b/F
// OZkYUv6A8o5HW0OWQYVX26zIqBcG2Qrm3reiSl5BLvpj1WSpCsYvs5kaO4vFpMak
// /ICgdZD+rxwxf8Vb/6fntKywWSLgwKH3mJ+Z0kRlpq1g1oieiOm1/gpZ35s0Yuor
// XZba9ptfLCYSggg/qc3d3d0tbHplKYkwFm7f5ORGHDSD5SJm+gI7RPE+4bO8q79R
// PAfbG1UGuJ0b/oigagciHhJp851SQRYf3JuNSc17BnK2L5IEtzjqr+Q=
// -----END CERTIFICATE-----`, "utf8");
//
//               return callback(null, publicKey, null);
//             },
            tokenType: "bearer",
            verifyOptions: {
              audience: [Auth0.webClient], // Restrict the clients that are allowed
              issuer: [Auth0.issuer], // Restrict the authorization server allowed to provide tokens
              algorithms: [Auth0.algorithm], // Restrict the signing alogrithms
            },
            validateFunc: async (decoded: IUserToken, request: any, callback: any) => {
              const { sub, email, email_verified, given_name, family_name } = decoded;
              const scope = decoded.scope ? decoded.scope.split(" ") : [];
              const user = {
                id: sub,
                email,
                firstName: given_name,
                lastName: family_name,
              };
              callback(null, email_verified, { user, scope });
            },
          });
          this.server.register(Routes, (routingError: Error) => {
            if (routingError) {
              reject(routingError);
            } else {
              resolve(this.server);
            }
          });
        }
      });
    });
  }

  public async start(): Promise<void> {
    return this.register().then((server: HapiServer) => {
      server.start((err: Error) => {
        if (err) {
          Promise.reject(err);
        } else {
          Promise.resolve();
        }
      });
    });
  }
}
