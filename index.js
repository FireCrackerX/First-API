const express = require('express'); // import express package
const app = express();
const PORT = 4551; 

const Database = require('better-sqlite3');
const db = new Database('chinook.db');

app.use(express.json()) // use middleware to parse json before response

app.listen(
    PORT,
    () => console.log(`it's alive on http://localhost:${PORT}`)
);

// get data from TABLE employees
app.get('/chinook', (request, response) => { 
    const statement = db.prepare(`SELECT * FROM employees`);
    const info = statement.all();
    response.json(info);
});

// insert new data TABLE employees
app.post('/chinook', (request, response) => { 
    const {EmployeeId, LastName, FirstName, Title, ReportsTo, BirthDate, HireDate, Address, City, State, Country, PostalCode, Phone, Fax, Email} = request.body;

    const statement = db.prepare(
        "INSERT INTO employees (EmployeeId, LastName, FirstName, Title, ReportsTo, BirthDate, HireDate, Address, City, State, Country, PostalCode, Phone, Fax, Email) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
    );

    const info = statement.run(EmployeeId, LastName, FirstName, Title, ReportsTo, BirthDate, HireDate, Address, City, State, Country, PostalCode, Phone, Fax, Email); // go to ? = placeholder
    response.json(info);
});
