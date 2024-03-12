const { Router } = require("express");
const router = Router();

const mysqlConnection = require("../database/database");

router.post("/register", (req, res)=> {
    const { first_name, last_name, email, password} = req.body;
    mysqlConnection.query('INSERT INTO user(first_name, last_name, email, password) VALUES (?, ?, ?, ?)', [first_name, last_name, email, password], (error, rows, fields) => {
        if(error) {
            res.json({success: true, message: "User registered successfully"});
        } else {
            console.log(error);
            res.status(500).json({success: false, message: "internal server error"})
        }
    });
});

router.post("/login", (req, res) => {
    const { email, password} = req.body;
    mysqlConnection.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (error, row, fields) => {
        if(!error && rows.length > 0 ) {
            res.json({success: true, message: "Login succesfull"});
        } else {
            res.status(401).json({ success: false, message: "Invalid email or password"})
        }
    });
});


router.get("/", (req, res) => {
    res.status(200).json('Server on port 4000 and Database is connected');
});

// Bu endpoint, kullanıcılarla ilgili tüm bilgileri döndürür.
router.get("/:users", (req, res) => {
    mysqlConnection.query('SELECT * FROM users', (error, rows, fields) => {
        if(!error) {
            res.json(rows);
        } else {
            console.log(error);
        }
    });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    mysqlConnection.query('DELETE FROM user WHERE id = ?', [id], (error, rows, fields) => {
        if (!error) {
            res.json({ success: true, message: "User deleted successfully" });
        } else {
            console.log(error);
            res.status(500).json({ success: false, message: "Internal server error" });
        }
    });
});

module.exports = router;