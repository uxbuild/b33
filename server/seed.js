const { client } = require("./common");

const seed = async () => {
  try {
    await client.connect();

    const SQL = `

    DROP TABLE IF EXISTS Employees CASCADE;
    DROP TABLE IF EXISTS Departments CASCADE;
    
      CREATE TABLE Employees(
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name VARCHAR(100) NOT NULL,
      department_id UUID,
      FOREIGN_KEY (department_id) REFERENCES Departments(id) 
    );
      CREATE TABLE Departments(
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name VARCHAR(100) NOT NULL
    );
  
    
    
    INSERT INTO Departments(name) VALUES('Public Affairs');
    INSERT INTO Departments(name) VALUES('Internal Affairs');
    INSERT INTO Departments(name) VALUES('Late-night Affairs');
    
    INSERT INTO Employees(name, department_id) 
    VALUES( "Bob Dylan", (SELECT id FROM Departments WHERE name ='Public Affairs') );
    
    INSERT INTO Employees(name, department_id) 
    VALUES( "Bob Marley", (SELECT id FROM Departments WHERE name ='Internal Affairs') );
    
    INSERT INTO Employees(name, department_id) 
    VALUES( "Bob Seger", (SELECT id FROM Departments WHERE name ='Late-night Affairs') );
     
        `;
    await client.query(SQL);
    console.log("HR seeded..");
    await client.end();
  } catch (error) {
    console.error(error);
  }
};

seed();