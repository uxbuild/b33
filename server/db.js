//client db
const { client } = require("./common");
//uuid
const uuid = require("uuid");

//create tables
const createTables = async () => {
  const SQL = `

    DROP TABLE IF EXISTS vacations;
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS places;
    CREATE TABLE users(
        id UUID PRIMARY KEY,
        name VARCHAR(50) NOT NULL UNIQUE
    );

    CREATE TABLE places(
        id UUID PRIMARY KEY,
        name VARCHAR(50) NOT NULL UNIQUE
    );

    CREATE TABLE vacations(
        id UUID PRIMARY KEY,
        departure_date DATE NOT NULL,
        user_id UUID REFERENCES users(id) NOT NULL,
        place_id UUID REFERENCES places(id) NOT NULL
    );

    `;

  await client.query(SQL);
};

const createUser = async ({name}) => {
  const SQL = `
        INSERT INTO users(id, name) VALUES($1, $2) RETURNING *
    `;
  const response = await client.query(SQL, [uuid.v4(), name]);
  return response.rows[0];
};

const createPlace = async ({name}) => {
  const SQL = `INSERT INTO places(id, name) VALUES($1, $2) RETURNING *`;
  const response = await client.query(SQL, [uuid.v4(), name]);
  return response.rows[0];
};

const fetchUsers = async () => {
  const SQL = `SELECT * FROM users`;
  const response = await client.query(SQL);
  return response.rows;
};

const fetchPlaces = async () => {
  const SQL = `SELECT * FROM places`;
  const response = await client.query(SQL);
  return response.rows;
};

const fetchVacations = async ()=>{
    const SQL = `SELECT * FROM vacations`;
    const response = await client.query(SQL);
    return response.rows;
};

const createVacation = async ({place_id, user_id, departure_date})=>{
    const SQL = `
        INSERT INTO vacations(id, place_id, user_id, departure_date) VALUES($1, $2, $3, $4) RETURNING *
    `;
    const response = await client.query(SQL, [uuid.v4(), place_id, user_id, departure_date]);
    return response.rows[0];
};

const destroyVacation = async({id, user_id})=>{
    console.log(id, user_id);
    const SQL = `
        DELETE FROM vacations WHERE id = $1 AND user_id = $2
    `;
    await client.query(SQL,[id, user_id]);
    
};

//export
module.exports = {
  createTables,
  createUser,
  createPlace,
  fetchUsers,
  fetchPlaces,
  createVacation,
  fetchVacations,
  destroyVacation,
};