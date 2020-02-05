const properties = require('./json/properties.json');
const users = require('./json/users.json');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {

  const values = [`${email}`];

  return pool.query(`
  SELECT *
  FROM users
  WHERE email = $1;
  `, values)
  .then((res) => {
    //res.row[0] = { name: 'string', password: 'string', email: 'string', id: number }
    return(res.rows[0]);
  })
}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {

  const values = [`${id}`];

  return pool.query(`
  SELECT *
  FROM users
  WHERE id = $1;
  `, values)
  .then((res) => {
    return(res.rows[0]);
  })
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {

  const values = [`${user.name}`, `${user.email}`, `${user.password}`];

  return pool.query(`
  INSERT INTO users (name, email, password) 
    VALUES ($1, $2, $3)
  RETURNING *;
  `, values)
  .then((res) => {
    return res.rows;
  })
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  const values = [`${guest_id}`, `${limit}`];

  return pool.query(`
  SELECT *
  FROM properties
  JOIN reservations ON properties.id = reservations.guest_id
  WHERE reservations.guest_id = $1
  ORDER BY reservations.start_date
  LIMIT $2;
  `, values)
  .then(res => {
    return(res.rows);
  });
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {

  // 1
  const queryParams = [];

  // 2
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  LEFT JOIN property_reviews ON properties.id = property_id
  `;
 
  // 3
  if (options.city) {
    // options.city become owner_id check if number
    if (typeof(parseInt(options.city)) === 'number') {
      queryParams.push(options.city);
      queryString += `WHERE properties.owner_id = $${queryParams.length} `;
    } else {
      queryParams.push(`%${options.city}%`);
      queryString += `WHERE city LIKE $${queryParams.length} `;
    }
  }
  // check minimum & maximum
  if (options.minimum_price_per_night) {
    queryParams.push(`${options.minimum_price_per_night}`);
    queryString += `AND properties.cost_per_night > $${queryParams.length} `
  }
  if (options.maximum_price_per_night) {
    queryParams.push(`${options.maximum_price_per_night}`);
    queryString += `AND properties.cost_per_night < $${queryParams.length} `
  }

  // 4
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

  // 6
  return pool.query(queryString, queryParams)
  .then(res => {
    return res.rows;
  });
}
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
//   const propertyId = Object.keys(properties).length + 1;
//   property.id = propertyId;
//   properties[propertyId] = property;
//   return Promise.resolve(property);
// }

  const values = [
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

  return pool.query(`
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
  RETURNING *;
  `, values)
  .then((res) => {
    return res.rows;
  })
}
exports.addProperty = addProperty;
