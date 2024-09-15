import { int, sqliteTable } from "drizzle-orm/sqlite-core";

export const projectsUsersRelation = sqliteTable("projects_users_relation", {
  projectId: int("project_id").primaryKey(),
  userId: int("user_id").primaryKey(),
  role: int("role"),
});
