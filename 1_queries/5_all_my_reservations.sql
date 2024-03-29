SELECT properties.id, properties.title, reservations.start_date, properties.cost_per_night, AVG(rating) as average_rating
FROM reservations
JOIN properties ON property_id = properties.id
JOIN property_reviews ON reservations.property_id = property_reviews.property_id
WHERE reservations.guest_id = 1 AND reservations.end_date < now()::date
GROUP BY properties.id, reservations.start_date
ORDER BY start_date;