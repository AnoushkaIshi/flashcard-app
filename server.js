const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Anoushka@26',
  database: 'flashcard_db'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

// API routes
app.get('/flashcards', (req, res) => {
  connection.query('SELECT * FROM flashcards', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post('/flashcards', (req, res) => {
  const { question, answer } = req.body;
  connection.query('INSERT INTO flashcards (question, answer) VALUES (?, ?)', [question, answer], (err, results) => {
    if (err) throw err;
    res.json({ id: results.insertId, question, answer });
  });
});

app.put('/flashcards/:id', (req, res) => {
  const { id } = req.params;
  const { question, answer } = req.body;
  connection.query('UPDATE flashcards SET question = ?, answer = ? WHERE id = ?', [question, answer, id], (err) => {
    if (err) throw err;
    res.json({ id, question, answer });
  });
});

app.delete('/flashcards/:id', (req, res) => {
  const { id } = req.params;
  connection.query('DELETE FROM flashcards WHERE id = ?', [id], (err) => {
    if (err) throw err;
    res.json({ id });
  });
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
