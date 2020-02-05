const { Pool } = require('pg')

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});

module.exports = {
  getUserWithEmail: (email) => {
    const queryString = `SELECT * FROM users WHERE email = $1;`;
    const queryParams = [`${email}`];
    return pool.query(queryString, queryParams);
  },

  getUserWithId: (id) => {
    const queryString = `SELECT * FROM users WHERE id = $1;`;
    const queryParams = [`${id}`];
    return pool.query(queryString, queryParams);
  },

  addUser: (user) => {
    const queryString = `
    INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3)
    RETURNING *;`;
    const queryParams = [`${user.name}`, `${user.email}`, `${user.password}`];
    return pool.query(queryString, queryParams);
  },

  getAllReservations: (guest_id, limit) => {
    const queryString = `
    SELECT *
    FROM properties
    JOIN reservations ON properties.id = reservations.guest_id
    WHERE reservations.guest_id = $1
    ORDER BY reservations.start_date
    LIMIT $2;`;
    const queryParams = [`${guest_id}`, `${limit}`];
    return pool.query(queryString, queryParams);
  },

  getAllProperties: (options, limit) => {
    let queryString = `
    SELECT properties.*, avg(property_reviews.rating) as average_rating
    FROM properties `;
    const queryParams = [];

    if (options.city) {
      // options.city become owner_id check if number
      if (typeof(parseInt(options.city)) === 'number') {
        queryParams.push(options.city);
        queryString += `
        LEFT JOIN property_reviews ON properties.id = property_id
        WHERE properties.owner_id = $${queryParams.length} `;
      } else {
        queryParams.push(`%${options.city}%`);
        queryString += `
        JOIN property_reviews ON properties.id = property_id
        WHERE city LIKE $${queryParams.length} `;
      }
    } else queryString += `JOIN property_reviews ON properties.id = property_id `;

    // check minimum & maximum
    if (options.minimum_price_per_night) {
      queryParams.push(`${options.minimum_price_per_night}`);
      queryString += `AND properties.cost_per_night > $${queryParams.length} `
    }
    if (options.maximum_price_per_night) {
      queryParams.push(`${options.maximum_price_per_night}`);
      queryString += `AND properties.cost_per_night < $${queryParams.length} `
    }

    queryString += `GROUP BY properties.id `;

    // check rating
    if (options.minimum_rating) {
      queryParams.push(`${options.minimum_rating}`);
      queryString += `HAVING avg(property_reviews.rating) >= $${queryParams.length} `
    };

    queryParams.push(limit);
    queryString += `
    ORDER BY cost_per_night
    LIMIT $${queryParams.length};
  `;

  return pool.query(queryString, queryParams);
  },

  addProperty: (property) => {
    const queryString = `
    INSERT INTO properties (
      owner_id,
      title,
      description,
      thumbnail_photo_url,
      cover_photo_url,
      cost_per_night,
      street,
      city,
      province,
      post_code,
      country,
      parking_spaces,
      number_of_bathrooms,
      number_of_bedrooms
    ) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
      RETURNING *;`;
    const queryParams = [
      `${property.owner_id}`,
      `${property.title}`,
      `${property.description}`,
      `${property.thumbnail_photo_url}`,
      `${property.cover_photo_url}`,
      `${property.cost_per_night}`,
      `${property.street}`,
      `${property.city}`,
      `${property.province}`,
      `${property.post_code}`,
      `${property.country}`,
      `${property.parking_spaces}`,
      `${property.number_of_bathrooms}`,
      `${property.number_of_bedrooms}`
    ];
  return pool.query(queryString, queryParams);
  }
}