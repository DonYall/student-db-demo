const express = require("express");
const bodyParser = require("body-parser");
const { Pool } = require("pg");
const methodOverride = require("method-override");

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

const pool = new Pool({
  host: process.env.PGHOST || "localhost",
  port: process.env.PGPORT ? Number(process.env.PGPORT) : 5432,
  database: process.env.PGDATABASE || "comp3005",
  user: process.env.PGUSER || "postgres",
  password: process.env.PGPASSWORD || "don",
});

app.get("/", (_req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// GET /students -> calls getAllStudents()
app.get("/students", async (_req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM getAllStudents();");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /students -> calls addStudent(first_name, last_name, email, enrollment_date)
app.post("/students", async (req, res) => {
  const { first_name, last_name, email, enrollment_date } = req.body || {};
  if (!first_name || !last_name || !email) {
    return res
      .status(400)
      .json({ error: "first_name, last_name, email required" });
  }
  try {
    await pool.query("SELECT addStudent($1,$2,$3,$4);", [
      first_name,
      last_name,
      email,
      enrollment_date || null,
    ]);
    res.status(201).json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /students/email -> calls updateStudentEmail(student_id, new_email)
app.post("/students/email", async (req, res) => {
  const id = Number(req.body.id);
  const { email } = req.body || {};
  if (!id || !email)
    return res.status(400).json({ error: "id and email required" });
  try {
    await pool.query("SELECT updateStudentEmail($1,$2);", [id, email]);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /students/delete -> calls deleteStudent(student_id)
app.post("/students/delete", async (req, res) => {
  const id = Number(req.body.id);
  if (!id) return res.status(400).json({ error: "valid id required" });
  try {
    await pool.query("SELECT deleteStudent($1);", [id]);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));
