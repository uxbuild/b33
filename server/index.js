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
      // add employee
      const employee = await addEmployee({
        name: req.body.name,
        department_id: req.body.department_id,
      });
      console.log("new employee: ", employee);

      // return response: 201 status + message
      res.status(201).json({
        message: "Employee added.",
        employee: employee,
      });
    } catch (error) {
      next(error);
    }
  });

  // PUT employee (edit)
  app.put("/api/employees/:id", async (req, res, next) => {
    console.log('**********');
    console.log('PUT update employee');
    console.log('**********');
    
    try {
        console.log('PUT employee ID', req.params.id);
        console.log('PUT employee NAME', req.body.name);
        console.log('PUT employee DEPARTMENT', req.body.department_id);
        
      const employee = await editEmployee({
        id: req.params.id,
        name: req.body.name,
        department_id: req.body.department_id,
      });
      console.log("new employee: ", employee);

      // return response: 201 status + message
      res.status(200).json({
        message: "Employee updated.",
        employee: employee,
      });
    } catch (error) {
      next(error);
    }
  });

  // DELETE employee
  app.delete("/api/employees/:id", async (req, res, next) => {
    try {
      console.log("employee id", req.params.id);
      const employee = await deleteEmployee(req.params.id);
      res.status(200).json({
        message: "Employee deleted.",
        employee: employee,
      });
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
