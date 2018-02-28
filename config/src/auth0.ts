"use strict";

import { Secrets } from "./secrets";

export class Auth0 {
  public static readonly domain: string = Secrets.Auth0Domain;
  public static readonly baseUrl: string = `https://${Auth0.domain}`;
  public static readonly resourceServer: string = Secrets.Auth0ResourceServer;
  public static readonly webClient: string = Secrets.Auth0WebClientID;
  public static readonly issuer: string = `https://${Auth0.domain}/`;
  public static readonly jks = {
    uri: `${Auth0.issuer}.well-known/jwks.json`,
    cache: true,
    rateLimit: true,
    requestsPerMinute: 5,
  };
  public static readonly algorithm: string = "RS256";
}
