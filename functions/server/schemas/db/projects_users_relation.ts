import { int, sqliteTable } from "drizzle-orm/sqlite-core";

export const projectsUsersRelation = sqliteTable("projects_users_relation", {
  id: int("id").primaryKey(),
  projectId: int("project_id").notNull(),
  userId: int("user_id").notNull(),
  role: int("role"),
});
