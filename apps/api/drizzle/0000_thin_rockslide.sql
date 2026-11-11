CREATE TYPE "public"."status" AS ENUM('assigned', 'completed', 'cancelled', 'hidden');--> statement-breakpoint
CREATE TYPE "public"."relationshipStatus" AS ENUM('pending', 'active', 'ended');--> statement-breakpoint
CREATE TYPE "public"."rolesStatus" AS ENUM('student', 'teacher');--> statement-breakpoint
CREATE TABLE "assignment" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"teacherId" uuid NOT NULL,
	"studentId" uuid NOT NULL,
	"exerciseId" uuid NOT NULL,
	"assignedStatus" "status" NOT NULL
);
--> statement-breakpoint
CREATE TABLE "exercise" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"text" text NOT NULL,
	"type" varchar(255) NOT NULL,
	"variantes" jsonb NOT NULL,
	"creatorId" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "lesson" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"list" jsonb NOT NULL,
	"creatorId" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "relationship" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"teacherId" uuid NOT NULL,
	"studentId" uuid NOT NULL,
	"relationshipStatus" "relationshipStatus" NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"roles" "rolesStatus"[] NOT NULL,
	"password" varchar(255) NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "assignment" ADD CONSTRAINT "assignment_teacherId_users_id_fk" FOREIGN KEY ("teacherId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "assignment" ADD CONSTRAINT "assignment_studentId_users_id_fk" FOREIGN KEY ("studentId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "assignment" ADD CONSTRAINT "assignment_exerciseId_exercise_id_fk" FOREIGN KEY ("exerciseId") REFERENCES "public"."exercise"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "exercise" ADD CONSTRAINT "exercise_creatorId_users_id_fk" FOREIGN KEY ("creatorId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lesson" ADD CONSTRAINT "lesson_creatorId_users_id_fk" FOREIGN KEY ("creatorId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "relationship" ADD CONSTRAINT "relationship_teacherId_users_id_fk" FOREIGN KEY ("teacherId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "relationship" ADD CONSTRAINT "relationship_studentId_users_id_fk" FOREIGN KEY ("studentId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;