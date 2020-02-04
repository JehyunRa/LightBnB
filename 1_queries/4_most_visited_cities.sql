SELECT properties.city, count(reservations.*)
FROM reservations
JOIN properties ON property_id = properties.id
GROUP BY properties.city
ORDER BY count(reservations.*) DESC
LIMIT 10;