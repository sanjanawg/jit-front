const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3000;
const SECRET_KEY = '1234';
app.use(bodyParser.urlencoded({ extended: true }));

const connection = mysql.createConnection({
  host: 'localhost', // Changed from 'DESKTOP-J63LA4J' to 'localhost'
  user: 'root',
  password: 'Deeku@2003',
  database: 'jit',
  port: 3306,
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ', err);
    return;
  }
  console.log('Connected to MySQL database');
});

app.post('/student/register', (req, res) => {
  const { full_name, email, password, confirm_password, grade, subjects, bio, agree } = req.body;

  if (password !== confirm_password) {
    return res.status(400).send('Passwords do not match');
  }

  bcrypt.hash(password, 10, (hashErr, hashedPassword) => {
    if (hashErr) {
      console.error('Error hashing password: ', hashErr);
      return res.status(500).send('Internal Server Error');
    }

    const insertQuery = 'INSERT INTO students (name, email, password, grade, subjects, bio) VALUES (?, ?, ?, ?, ?, ?)';

    connection.query(insertQuery, [full_name, email, hashedPassword, grade, subjects, bio], (insertErr, results) => {
      if (insertErr) {
        console.error('Error inserting data: ', insertErr);
        return res.status(500).send('Internal Server Error');
      }

      res.send('Registration successful');
    });
  });
});

app.post('/teacher/register', (req, res) => {
  const { name, email, password, confirm_password, subjects, bio, agree } = req.body;

  if (password !== confirm_password) {
    return res.status(400).send('Passwords do not match');
  }

  bcrypt.hash(password, 10, (hashErr, hashedPassword) => {
    if (hashErr) {
      console.error('Error hashing password: ', hashErr);
      return res.status(500).send('Internal Server Error');
    }

    const insertQuery = 'INSERT INTO teachers (full_name, email, password, subjects, bio) VALUES (?, ?, ?, ?, ?)';

    connection.query(insertQuery, [name, email, hashedPassword, subjects, bio], (insertErr, results) => {
      if (insertErr) {
        console.error('Error inserting data: ', insertErr);
        return res.status(500).send('Internal Server Error');
      }

      res.send('Registration successful');
    });
  });
});

app.post('/student/login', (req, res) => {
  const { username, password } = req.body;

  const query = 'SELECT * FROM students WHERE name = ?'; // Changed from 'username' to 'name'

  connection.query(query, [username], (err, results) => {
    if (err) {
      console.error('Error executing query: ', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    if (results.length > 0) {
      const hashedPasswordFromDB = results[0].password;

      bcrypt.compare(password, hashedPasswordFromDB, (bcryptErr, isPasswordMatch) => {
        if (bcryptErr) {
          console.error('Error comparing passwords: ', bcryptErr);
          res.status(500).send('Internal Server Error');
          return;
        }

        if (isPasswordMatch) {
          res.send('Login successful');
        } else {
          res.status(401).send('Invalid username or password');
        }
      });
    } else {
      res.status(401).send('Invalid username or password');
    }
  });
});

app.post('/teacher/login', (req, res) => {
  const { username, password } = req.body;

  const query = 'SELECT * FROM teachers WHERE full_name = ?'; // Changed from 'username' to 'full_name'

  connection.query(query, [username], (err, results) => {
    if (err) {
      console.error('Error executing query: ', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    if (results.length > 0) {
      const hashedPasswordFromDB = results[0].password;

      bcrypt.compare(password, hashedPasswordFromDB, (bcryptErr, isPasswordMatch) => {
        if (bcryptErr) {
          console.error('Error comparing passwords: ', bcryptErr);
          res.status(500).send('Internal Server Error');
          return;
        }

        if (isPasswordMatch) {
          res.send('Login successful');
        } else {
          res.status(401).send('Invalid username or password');
        }
      });
    } else {
      res.status(401).send('Invalid username or password');
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
