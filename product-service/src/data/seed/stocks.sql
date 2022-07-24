CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS "stocks";

-- Create our table if it doesn't already exist
CREATE TABLE "stocks"
(
    "product_id"  uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    "count"       integer
);

-- Add seed data
INSERT INTO "stocks" (product_id, count)
values ('ff3463f5-d46e-48a3-bc93-1d93e89262bc', 5),
       ('d2dc5489-975e-4032-8d57-54e827133d6c', 10),
       ('6b2a2a8e-e657-4860-b242-eb8d6ed969e1', 2),
       ('088b8ccc-d27b-43e0-9912-7502237386ce', 3),
       ('d26588a1-c211-49c2-9e55-b000bf220ca2', 8),
       ('3cfe89fa-a402-45ca-b549-aa3f731a7e49', 33),
       ('fdde63f3-697e-41f7-99cc-0d70fcb2bf17', 1),
       ('4c3c50d6-7c8e-476d-a1d7-521eb3f192c1', 25),
       ('1cb65915-2a1e-4264-921d-b477e672d03e', 0)

