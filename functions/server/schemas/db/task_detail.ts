import { sqliteTable, text, int, real } from "drizzle-orm/sqlite-core";

export const taskDetail = sqliteTable("task_detail", {
  id: int("id").primaryKey(),
  name: text("name").notNull(),
  detail: text("detail"),
  status: int("status").notNull().default(0),
  categoryId: int("category_id").notNull(),
  pv: real("pv"),
  ev: real("ev"),
  ac: real("ac"),
  dueDate: text("due_date"),
  startDate: text("start_date"),
  createUserId: int("create_user_id").notNull(),
  updateUserId: int("update_user_id").notNull(),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});
