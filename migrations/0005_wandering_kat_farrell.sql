CREATE TABLE `projects` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`detail` text,
	`create_user_id` integer NOT NULL,
	`update_user_id` integer NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `projects_users_relation` (
	`id` integer PRIMARY KEY NOT NULL,
	`project_id` integer NOT NULL,
	`user_id` integer NOT NULL,
	`role` integer
);
--> statement-breakpoint
CREATE TABLE `tasks` (
	`id` integer PRIMARY KEY NOT NULL,
	`task_number` integer NOT NULL,
	`assignee_id` integer NOT NULL,
	`project_id` integer NOT NULL,
	`parent_task_id` integer DEFAULT 0 NOT NULL,
	`create_user_id` integer NOT NULL,
	`update_user_id` integer NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `task_detail` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`detail` text,
	`status` integer DEFAULT 0 NOT NULL,
	`category_id` integer NOT NULL,
	`pv` real,
	`ev` real,
	`ac` real,
	`due_date` text,
	`start_date` text,
	`create_user_id` integer NOT NULL,
	`update_user_id` integer NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `categories` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`detail` text,
	`project_id` integer NOT NULL,
	`create_user_id` integer NOT NULL,
	`update_user_id` integer NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `templates` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`detail` text,
	`create_user_id` integer NOT NULL,
	`update_user_id` integer NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
