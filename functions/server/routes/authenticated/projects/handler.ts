import { factory } from "~/appFactory";
import {
  projectsRelationMiddleware,
  projectsRoleMiddleware,
} from "./middleware";

export const projectsHandler = factory
  .createApp()
  .use("/:projectId?", projectsRelationMiddleware)
  .on(["POST", "PUT", "DELETE"], "/:projectId?", projectsRoleMiddleware);
