import { handle } from "hono/cloudflare-pages";
import { appFactory } from "../server/appFactory";
import { authenticatedHandler, authHandler } from "~/routes";

const app = appFactory()
  .basePath("/api")
  .get("/hello", (c) => {
    return c.text("Hello Hono");
  })
  .route("/auth", authHandler)
  .route("/authenticated", authenticatedHandler);

export type AppType = typeof app;

export const onRequest = handle(app);
