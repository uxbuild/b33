# B30: ACME HR Directory

## Completions
- seed data
- GET employees
- GET departments
- POST employees (add)

## API for ACME HR Department
- GET /api/employees = returns array of employees
- GET /api/departments = returns array of departments
- POST /api/employees = returns a created employee, payload (new employee)
- DELETE /api/employees/:id = returns nothing; id passed in URL
- PUT /api/employees/:id = returns updated employee; payload (new employee details)

- USE error handling middleware, returns error object

## Department
- id PRIMARY KEY
- name STRING

## Employee
- id PRIMARY KEY
- name STRING
- created_at TIMESTAMP
- updated_at TIMESTAMP
- department_id INTEGER (or UUID)??