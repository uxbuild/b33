//client db
const { client } = require("./common");
//uuid
const uuid = require("uuid");

// DB functions

// GET (all) employees
const getEmployees = async () => {
  const SQL = `SELECT * FROM Employees`;
  const response = await client.query(SQL);
  return response.rows;
};

// GET (all) departments
const getDepartments = async () => {
  const SQL = `SELECT * FROM Departments`;
  const response = await client.query(SQL);
  return response.rows;
};

// POST (create) employee
const addEmployee = async ({ name, department_id }) => {
  const SQL = `
    INSERT INTO Employees(name, department_id)
    VALUES($1, $2) RETURNING *;
    `;
  const result = await client.query(SQL, [name, department_id]);
  return result.rows[0];
};

// DELETE employee
const deleteEmployee = async (id) => {
  console.log(id);
  const SQL = `
        DELETE FROM Employees WHERE id = $1 RETURNING *
    `;
  const result = await client.query(SQL, [id]);
  return result.rows[0];
};

// PUT (edit) employee
const editEmployee = async ({ id, name, department_id }) => {
  const SQL = `
        UPDATE Employees
        SET name = $2, department_id = $3
        WHERE id = $1 
        RETURNING *;
    `;
  const response = await client.query(SQL, [id, name, department_id]);
  return response.rows[0];
};

//export
module.exports = {
  getEmployees,
  getDepartments,
  addEmployee,
  editEmployee,
  deleteEmployee,
};
