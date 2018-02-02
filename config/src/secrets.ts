"use strict";

export class Secrets {
  public static readonly DBHost: string = process.env.DB_HOST || "localhost";
  public static readonly DBPort: number = Number(process.env.DB_PORT || 5432);
  public static readonly DBName: string = process.env.DB_NAME || "dt-townies";
  public static readonly DBUser: string = process.env.DB_USER || "dt-townies";
  public static readonly DBPass: string = process.env.DB_PASS || "seinwotdt";

  public static readonly RollbarAccessToken: string | undefined = process.env.ROLLBAR_ACCESS_TOKEN;
}
