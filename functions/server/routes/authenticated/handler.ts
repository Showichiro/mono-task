import { factory } from "~/appFactory";
import { authenticatedMiddleware } from "./middleware";
import { projectsHandler } from "./projects";

export const authenticatedHandler = factory
  .createApp()
  .use(authenticatedMiddleware)
  .route("/projects", projectsHandler);
