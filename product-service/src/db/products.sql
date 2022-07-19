CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS "products";

-- Create our table if it doesn't already exist
CREATE TABLE "products"
(
    "id"          uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    "title"       text not null,
    "description" text,
    "price"       integer
);

-- Add seed data
INSERT INTO "products"
values ('ff3463f5-d46e-48a3-bc93-1d93e89262bc', 'Смартфон HONOR X9 6GB/128GB (титановый серебристый)', 'Android, экран 6.81" IPS (1080x2388), Qualcomm Snapdragon 680, ОЗУ 6 ГБ, флэш-память 128 ГБ, камера 64 Мп, аккумулятор 4800 мАч, 2 SIM', 940),
       ('d2dc5489-975e-4032-8d57-54e827133d6c', 'Смартфон Huawei P50 ABR-LX9 8GB/256GB (черный)', 'HarmonyOS, экран 6.5" OLED (1228x2700), Qualcomm Snapdragon 888, ОЗУ 8 ГБ, флэш-память 256 ГБ, карты памяти, камера 50 Мп, аккумулятор 4100 мАч, 2 SIM, влагозащита IP68', 1990),
       ('6b2a2a8e-e657-4860-b242-eb8d6ed969e1', 'Смартфон ZTE Blade A31 NFC (серый)', 'Android, без оболочки, экран 5.45" IPS (720x1440), UniSoC SC9863A, ОЗУ 2 ГБ, флэш-память 32 ГБ, карты памяти, камера 8 Мп, аккумулятор 3000 мАч, 2 SIM', 249),
       ('088b8ccc-d27b-43e0-9912-7502237386ce', 'Смартфон Apple iPhone 13 128GB (темная ночь)', 'Apple iOS, экран 6.1" OLED (1170x2532), Apple A15 Bionic, ОЗУ 4 ГБ, флэш-память 128 ГБ, камера 12 Мп, аккумулятор 3227 мАч, 1 SIM, влагозащита IP68', 2590),
       ('d26588a1-c211-49c2-9e55-b000bf220ca2', 'Смартфон Apple iPhone 11 64GB (черный)', 'Apple iOS, экран 6.1" IPS (828x1792), Apple A13 Bionic, ОЗУ 4 ГБ, флэш-память 64 ГБ, камера 12 Мп, аккумулятор 3046 мАч, 1 SIM, влагозащита IP68', 1689),
       ('3cfe89fa-a402-45ca-b549-aa3f731a7e49', 'Смартфон Samsung Galaxy A52 SM-A525F/DS 4GB/128GB (черный)', 'Android, экран 6.5" AMOLED (1080x2400), Qualcomm Snapdragon 720G, ОЗУ 4 ГБ, флэш-память 128 ГБ, карты памяти, камера 64 Мп, аккумулятор 4500 мАч, 2 SIM, влагозащита IP67', 895),
       ('fdde63f3-697e-41f7-99cc-0d70fcb2bf17', 'Смартфон Apple iPhone 13 Pro 128GB (графитовый)', 'Apple iOS, экран 6.1" OLED (1170x2532), Apple A15 Bionic, ОЗУ 6 ГБ, флэш-память 128 ГБ, камера 12 Мп, аккумулятор 3095 мАч, 1 SIM, влагозащита IP68', 3220),
       ('4c3c50d6-7c8e-476d-a1d7-521eb3f192c1', 'Смартфон Xiaomi Redmi Note 10 Pro 8GB/128GB международная версия (серый оникс)', 'Android, экран 6.67" AMOLED (1080x2400), Qualcomm Snapdragon 732G, ОЗУ 8 ГБ, флэш-память 128 ГБ, карты памяти, камера 108 Мп, аккумулятор 5020 мАч, 2 SIM, влагозащита IP53', 850),
       ('1cb65915-2a1e-4264-921d-b477e672d03e', 'Смартфон Samsung Galaxy S21 5G 8GB/256GB (фиолетовый фантом)', 'Android, экран 6.2" AMOLED (1080x2400), Exynos 2100, ОЗУ 8 ГБ, флэш-память 256 ГБ, камера 64 Мп, аккумулятор 4000 мАч, 2 SIM, влагозащита IP68', 2490)
