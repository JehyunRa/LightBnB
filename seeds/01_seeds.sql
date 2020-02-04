INSERT INTO users (name, email, password)
  VALUES ('Eva Stanley', 'Lincolnsebastianguerra@mail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
  ('Louisa Meyer', 'jacksonrose@hotmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
  ('Dominic Parks', 'victoriablackwell@outlook.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
  ('Sue Luna', 'jacksonvincent@gmx.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
  ('Rosalie Garza', 'jacksondavid@gmx.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
  ('Etta West', 'charlielevy@yahoo.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
  ('Margaret Wong', 'makaylaweiss@icloud.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
  ('Leroy Hart', 'jaycereynolds@inbox.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
  VALUES (1, 'Speed lamp', 'description', 'www.google.ca', 'www.google.ca', 930.61, 6, 4, 8, 'Canada', '536 Namsub Highway', 'Sotboske', 'Quebec', 28742, true),
  (1, 'Black corner', 'description', 'www.google.ca', 'www.google.ca', 852.34, 6, 6, 7, 'Canada', '651 Nami Road', 'Bohbatev', 'Alberta', 83680, true),
  (2, 'Habit mix', 'description', 'www.google.ca', 'www.google.ca', 460.58, 0, 5, 6, 'Canada', '1650 Hejto Center', 'Genwezuj', 'Newfoundland And Labrador', 44583, true),
  (4, 'Headed know', 'description', 'www.google.ca', 'www.google.ca', 826.40, 0, 5, 5, 'Canada', '513 Powov Grove', 'Jaebvap', 'Ontario', 38051, true),
  (6, 'Port out', 'description', 'www.google.ca', 'www.google.ca', 23.58, 2, 8, 0, 'Canada', '1392 Gaza Junction', 'Upetafpuv', 'Nova Scotia', 81059, true),
  (6, 'Fun glad', 'description', 'www.google.ca', 'www.google.ca', 342.91, 6, 6, 4, 'Canada', '169 Nuwug Circle', 'Vutgapha', 'Newfoundland And Labrador', 00159, true),
  (7, 'Shine twenty', 'description', 'www.google.ca', 'www.google.ca', 136.44, 1, 7, 8, 'Canada', '340 Dokto Park', 'Upfufa', 'Nova Scotia', 29045, true),
  (8, 'Game fill', 'description', 'www.google.ca', 'www.google.ca', 234.28, 5, 6, 4, 'Canada', '834 Buwmi Road', 'Rotunif', 'Newfoundland And Labrador', 58224, true);

INSERT INTO reservations (property_id, guest_id, start_date, end_date)
  VALUES (2, 3, '2018-09-11', '2018-09-26'),
 (2, 2, '2019-01-04', '2019-02-01'),
 (1, 4, '2021-10-01', '2021-10-14'),
 (3, 5, '2014-10-21', '2014-10-21'),
 (3, 4, '2016-07-17', '2016-08-01'),
 (4, 8, '2018-05-01', '2018-05-27'),
 (5, 1, '2022-10-04', '2022-10-23'),
 (6, 8, '2015-09-13', '2015-09-30'),
 (4, 2, '2023-05-27', '2023-05-28'),
 (8, 1, '2023-04-23', '2023-05-02');

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
  VALUES (2, 5, 10, 3, 'messages'),
  (1, 4, 1, 4, 'messages'),
  (8, 1, 2, 4, 'messages'),
  (3, 8, 5, 4, 'messages'),
  (4, 2, 7, 5, 'messages'),
  (4, 3, 4, 4, 'messages'),
  (5, 6, 3, 5, 'messages');