import { sqliteTable, text, int } from "drizzle-orm/sqlite-core";

export const tasks = sqliteTable("tasks", {
  id: int("id").primaryKey(),
  taskNumber: int("task_number").notNull(),
  assigneeId: int("assignee_id").notNull(),
  projectId: int("project_id").notNull(),
  parentTaskId: int("parent_task_id").notNull().default(0),
  createUserId: int("create_user_id").notNull(),
  updateUserId: int("update_user_id").notNull(),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});
