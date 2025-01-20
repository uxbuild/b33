// express, client(db), port(db)
const { express, client, PORT } = require("./common");

// db functions..
const {
  getEmployees,
  getDepartments,
  addEmployee,
  editEmployee,
  deleteEmployee,
} = require("./db");

// app
const app = express();

// path
const path = require("path");

// init
const init = async () => {
  // init
  console.log("init express");

  //connect db
  await client.connect();
  console.log("connected db");

  // middleware
  // note: middleware run in order they are defined
  // note: error-handling at end

  // JSON
  app.use(express.json());

  //morgan
  app.use(require("morgan")("dev"));

  // ROUTES **
  // index route
  app.get("/", (req, res) => {
    res.send("B33 Workshop: ACME HR Department");
  });

  //GET route: employees
  app.get("/api/employees", async (req, res, next) => {
    try {
      console.log("GET /api/employees");
      res.status(200).json(await getEmployees());
    } catch (error) {
      next(error);
    }
  });
  //GET route: departments
  app.get("/api/departments", async (req, res, next) => {
    try {
      console.log("GET /api/departments");
      res.status(200).json(await getDepartments());
    } catch (error) {
      next(error);
    }
  });

  // POST route: add employee
  app.post("/api/employees", async (req, res, next) => {
    try {
      res.status(201).json(
        await addEmployee({
          name: req.body.name,
          department_id: req.body.department_id,
        })
      );
    } catch (error) {
      next(error);
    }
  });

  // ERROR handling, invoked when there are 4 arguments.
  app.use((err, req, res, next) => {
    res.status(err.status || 500).send({ error: err.message || err });
  });

  // APP listen
  app.listen(PORT, () => {
    console.log(`express listening on port ${PORT}`);
  });
};
// start
init();
