"use strict";

export class Secrets {
  public static readonly DBHost: string = process.env.DB_HOST || "localhost";
  public static readonly DBPort: number = Number(process.env.DB_PORT || 5432);
  public static readonly DBName: string = process.env.DB_NAME || "dt-townies";
  public static readonly DBUser: string = process.env.DB_USER || "dt-townies";
  public static readonly DBPass: string = process.env.DB_PASS || "seinwotdt";

  public static readonly RollbarAccessToken: string | undefined = process.env.ROLLBAR_ACCESS_TOKEN;
  public static readonly Auth0Domain: string = process.env.AUTH0_DOMAIN || "dt-townies.auth0.com";
  public static readonly Auth0ResourceServer: string = process.env.AUTH0_RESOURCE_SERVER || "http://localhost:8080/api";
  public static readonly Auth0WebClientID: string = process.env.AUTH0_WEB_CLIENT_ID || "2FPnIEGtRn22KC3q6nrEo9k6bxIRYL3D";
}
