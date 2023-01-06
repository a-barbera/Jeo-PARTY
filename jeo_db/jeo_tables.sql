-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.

DROP TABLE IF EXISTS contestants;
CREATE TABLE "contestants" (
    "contestant_id" int   NOT NULL,
    "name" varchar   NOT NULL,
    "notes" varchar   NOT NULL,
    "games_played" int   NOT NULL,
    "total_ winnings" int   NOT NULL,
    CONSTRAINT "pk_contestants" PRIMARY KEY (
        "contestant_id"
     )
);

