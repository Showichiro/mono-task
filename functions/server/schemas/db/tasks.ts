import { sqliteTable, text, int } from "drizzle-orm/sqlite-core";

export const tasks = sqliteTable("tasks", {
  id: int("id").primaryKey(),
  taskNumber: int("task_number").notNull(),
  assigneeId: text("assignee_id").notNull(),
  projectId: int("project_id").notNull(),
  parentTaskId: int("parent_task_id").notNull().default(0),
  createUserId: text("create_user_id").notNull(),
  updateUserId: text("update_user_id").notNull(),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});
