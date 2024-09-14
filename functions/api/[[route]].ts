import { handle } from "hono/cloudflare-pages";
import { factory } from "../server/appFactory";
import { googleAuthHandler } from "~/routes";

const app = factory()
  .basePath("/api")
  .get("/hello", (c) => {
    return c.text("Hello Hono");
  })
  .route("/auth/google", googleAuthHandler);

export type AppType = typeof app;

export const onRequest = handle(app);
