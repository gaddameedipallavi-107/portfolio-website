const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "system",
    password: "manager",
    database: "portfolio"
});


db.connect((err) => {
    if (err) {
        console.log("MySQL Connection Failed ❌", err);
    } else {
        console.log("MySQL Connected ✅");
    }
});


app.get("/", (req, res) => {
    res.send("Backend Running 🚀");
});

app.post("/projects", (req, res) => {
    const { title, description, tech } = req.body;

    const sql = "INSERT INTO projects(title, description, tech) VALUES (?, ?, ?)";

    db.query(sql, [title, description, tech], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Error adding project" });
        }
        res.json({ message: "Project Added Successfully" });
    });
});


app.get("/projects", (req, res) => {
    db.query("SELECT * FROM projects", (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Error fetching projects" });
        }
        res.json(result);
    });
});


app.delete("/projects/:id", (req, res) => {
    const id = req.params.id;

    const sql = "DELETE FROM projects WHERE id = ?";

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Error deleting project" });
        }
        res.json({ message: "Project Deleted Successfully" });
    });
});


app.listen(5000, () => {
    console.log("Server running on port 5000 🚀");
});