CREATE TABLE "todos" (
	"id" SERIAL PRIMARY KEY,
	"task" VARCHAR(70) NOT NULL,
	"due" DATE,
	"completed" DATE DEFAULT NULL,
	"priority" INT DEFAULT 1,
	"status" VARCHAR(10) DEFAULT 'Pending'
);

INSERT INTO "todos" ("task", "due", "completed", "priority", "status")
VALUES ('Call mom', '2021-01-07', '2021-01-09', 3, 'Complete'),
('Finish weekend project', '2021-01-11', '2021-01-10', 1, 'Complete');

INSERT INTO "todos" ("task", "due", "priority", "status")
VALUES ('Gotta get that taco bell', '2021-01-11', 2, 'Pending'),
('Clean my room', '2021-01-15', 4, 'Pending');