import { sqliteTable, text, int } from "drizzle-orm/sqlite-core";

export const projects = sqliteTable("projects", {
  id: int("id").primaryKey(),
  name: text("name").notNull(),
  detail: text("detail"),
  createUserId: text("create_user_id").notNull(),
  updateUserId: text("update_user_id").notNull(),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});
