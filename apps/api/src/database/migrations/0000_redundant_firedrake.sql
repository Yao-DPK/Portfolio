CREATE TABLE "daily_visits" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"visit_date" date NOT NULL,
	"visitor_count" integer DEFAULT 1 NOT NULL,
	CONSTRAINT "daily_visits_visit_date_unique" UNIQUE("visit_date")
);
--> statement-breakpoint
CREATE TABLE "total_visitors" (
	"id" integer PRIMARY KEY DEFAULT 1 NOT NULL,
	"total_count" integer DEFAULT 0 NOT NULL
);
