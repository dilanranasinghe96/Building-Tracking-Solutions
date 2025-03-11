
// Required Modules
import bcrypt from "bcryptjs";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import rateLimit from "express-rate-limit";
import mysql from "mysql";

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();
const port = process.env.PORT;

// Middleware
app.use(cors());
app.use(express.json());


// Trust proxy for rate limiting
app.set("trust proxy", 1);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later",
});

app.use(limiter);


// Database connection configuration
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.message);
    console.error( err.message);
    return setTimeout(() => db.connect(), 5000); // Retry after 5s
  }
  console.log("Connected to the database.");
});


app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, email, password, confirmPassword, phone, role, plant } = req.body;

    if (!username || !email || !password || !confirmPassword || !phone || !role || !plant) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    if (!isStrongPassword(password)) {
      return res.status(400).json({ message: 'Password must be strong' });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ message: 'Invalid email address' });
    }

    if (!isValidPhone(phone)) {
      return res.status(400).json({ message: 'Invalid phone number' });
    }

    db.query(
      'SELECT * FROM users WHERE username = ? OR email = ?',
      [username, email],
      (error, results) => {
        if (error) {
          console.error('Database query error:', error);
          return res.status(500).json({ message: 'Server error during registration' });
        }
        if (results.length > 0) {
          return res.status(400).json({ message: 'User already exists' });
        }

        bcrypt.hash(password, 10, (err, hashedPassword) => {
          if (err) {
            console.error('Bcrypt error:', err);
            return res.status(500).json({ message: 'Server error during password hashing' });
          }

          db.query(
            'INSERT INTO users (username, email, password, phone, role, plant) VALUES (?, ?, ?, ?, ?, ?)',
            [username, email, hashedPassword, phone, role, plant],
            (error, result) => {
              if (error) {
                console.error('Database insert error:', error);
                return res.status(500).json({ message: 'Server error during registration' });
              }
              res.status(201).json({
                message: 'User registered successfully',
                userId: result.insertId
              });
            }
          );
        });
      }
    );
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
});





// User login
app.post('/api/auth/login', (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    db.query(
      'SELECT * FROM users WHERE username = ?',
      [username],
      (error, results) => {
        if (error) {
          console.error('Database query error:', error);
          return res.status(500).json({ message: 'Server error during login' });
        }

        if (results.length === 0) {
          return res.status(400).json({ message: 'Invalid credentials' });
        }

        const user = results[0];
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) {
            console.error('Bcrypt compare error:', err);
            return res.status(500).json({ message: 'Server error during login' });
          }

          if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
          }

          const { password: excludedPassword, ...userData } = user;
          res.json({ message: 'Login successful', user: userData });
        });
      }
    );
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

// Get all users
app.get('/api/auth/users', (req, res) => {
  db.query(
    'SELECT id, username, email, phone, role, plant FROM users',
    (error, results) => {
      if (error) {
        console.error('Database query error:', error);
        return res.status(500).json({ message: 'Server error retrieving users' });
      }
      res.json(results);
    }
  );
});

// Update user
app.put('/api/auth/users/:id', (req, res) => {
  const { id } = req.params;
  const { username, email, phone, role } = req.body;

  db.query(
    'UPDATE users SET username = ?, email = ?, phone = ?, role = ? WHERE id = ?',
    [username, email, phone, role, id],
    (error, results) => {
      if (error) {
        console.error('Database query error:', error);
        return res.status(500).json({ message: 'Server error updating user' });
      }
      res.json({ message: 'User updated successfully' });
    }
  );
});

// Delete user
app.delete('/api/auth/users/:id', (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM users WHERE id = ?', [id], (error, results) => {
    if (error) {
      console.error('Database query error:', error);
      return res.status(500).json({ message: 'Server error deleting user' });
    }
    res.json({ message: 'User deleted successfully' });
  });
});

// Cut-out item routes
app.get('/api/items/cut-out/:bno', (req, res) => {
  const { bno } = req.params;

  db.query(
    'SELECT * FROM cut_out WHERE bno = ?',
    [bno],
    (error, results) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }

      if (results.length > 0) {
        res.json(results[0]);
      } else {
        res.status(404).json({ message: 'Item not found' });
      }
    }
  );
});




app.get('/api/items/fg', (req, res) => {
  const { plant } = req.query;
  let query;
  let params = [];

  if (plant) {
    query = 'SELECT Id, bno, SO, Style, Style_Name, Cut_No, Colour, Size, BQty, Plant, Line, Damage_Pcs, Cut_Panel_Shortage, Good_Pcs, User, DATE(DateTime) AS Date,Subtraction FROM fg WHERE Plant = ? ORDER BY DateTime DESC;';
    params = [plant];
  } else {
    // Allow fetching all records when no plant is specified
    query = 'SELECT Id, bno, SO, Style, Style_Name, Cut_No, Colour, Size, BQty, Plant, Line, Damage_Pcs, Cut_Panel_Shortage, Good_Pcs, User, DATE(DateTime) AS Date,Subtraction FROM fg ORDER BY DateTime DESC;';
  }

  db.query(query, params, (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.json(results);
  });
});

//Fg stock- fetch available quantity
app.get('/api/items/availableQty', (req, res) => {
  const { plant } = req.query;
  let query;
  let params = [];

  if (plant) {
    query = 'SELECT SO, Style, Style_Name, Cut_No, Colour, Size, Plant, Available_Qty FROM fg_available WHERE Plant = ? ;';
    params = [plant];
  } else {
    // Allow fetching all records when no plant is specified
    query = 'SELECT SO, Style, Style_Name, Cut_No, Colour, Size, Plant, Available_Qty FROM fg_available ;';
  }

  db.query(query, params, (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.json(results);
  });
});


//Fg stock- fetch available qty summary
app.get('/api/items/availableQtySummary', (req, res) => {
  const { plant } = req.query;
  let query;
  let params = [];

  if (plant) {
    query = 'SELECT Style, Style_Name, Colour, Size, Plant, Available_Qty FROM fg_available_summary WHERE Plant = ? ;';
    params = [plant];
  } else {
    // Allow fetching all records when no plant is specified
    query = 'SELECT Style, Style_Name, Colour, Size, Plant, Available_Qty FROM fg_available_summary;';
  }

  db.query(query, params, (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.json(results);
  });
});



//Get All production summary from fg_available_summary table
app.get('/api/items/allProductionSummary', (req, res) => {
  const { plant } = req.query;
  let query;
  let params = [];

  if (plant) {
    query = `SELECT Style_Name AS Style_Name, SUM(Available_Qty) AS finish_goods,Plant
             FROM fg_available_summary 
             WHERE Plant = ? 
             GROUP BY Style_Name `;
    params = [plant, plant];  // Adding plant twice to the params array
  } else {
    // Allow fetching all records when no plant is specified
    query = `SELECT Style_Name AS Style_Name, SUM(Available_Qty) AS finish_goods,Plant 
             FROM fg_available_summary 
             GROUP BY Style_Name;`;
  }

  db.query(query, params, (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.json(results);
  });
});

//wip production view
app.get('/api/items/wipproduction', (req, res) => {
  const { plant } = req.query;
  let query;
  let params = [];

  if (plant) {
    query = 'SELECT SO, Style, Style_Name, Cut_No, Colour, Size, Plant, Available_Qty FROM wip_production WHERE Plant = ? ;';
    params = [plant];
  } else {
    // Allow fetching all records when no plant is specified
    query = 'SELECT SO, Style, Style_Name, Cut_No, Colour, Size, Plant, Available_Qty FROM wip_production ;';
  }

  db.query(query, params, (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.json(results);
  });
});


//wip production summary view
app.get('/api/items/wipproductions-summary', (req, res) => {
  let query ='SELECT Style_Name, Available_Qty FROM wip_production_summary;';

  db.query(query, (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.json(results);
  });
});


//wipproductions summary plant
app.get('/api/items/wipproductions-summary-plant', (req, res) => {
  const { plant } = req.query;
  let query;
  let params = [];

  if (plant) {
    query = 'SELECT Plant,Style_Name ,Available_Qty FROM wip_production_summary_plant WHERE Plant = ? ;';
    params = [plant];
  } else {
    // Allow fetching all records when no plant is specified
    query = 'SELECT Plant,Style_Name ,Available_Qty FROM wip_production_summary_plant;';
  }

  db.query(query, params, (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.json(results);
  });
});

//wip cutting view
app.get('/api/items/wip-cutting', (req, res) => {
  let query ='SELECT SO,Style,Style_Name,Cut_No,Colour,Size, Available_Qty FROM wip_cutting;';

  db.query(query, (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.json(results);
  });
});


//wip cutting summary view
app.get('/api/items/wip-cutting-summary', (req, res) => {
  let query ='SELECT Style_Name,Available_Qty FROM wip_cutting_summary;';

  db.query(query, (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.json(results);
  });
});



app.get("/api/charts/all-data", (req, res) => {
  const today = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD
  const firstDayOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split("T")[0];
  const last12Months = new Date(new Date().setMonth(new Date().getMonth() - 11)).toISOString().split("T")[0];

  const query = `
    SELECT
      DATE_FORMAT(Date, '%Y-%m-%d') AS Date,  
      Plant,
      Style,
      SUM(Good_Pcs) AS Good_Pcs,
      SUM(Damage_Pcs) AS Damage_Pcs,
      SUM(Cut_Panel_Shortage) AS Cut_Panel_Shortage,
      MONTH(Date) AS Month,
      YEAR(Date) AS Year
    FROM fg
    WHERE Date >= ?
    GROUP BY Date, Plant, Style
  `;

  db.query(query, [last12Months], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// app.post('/api/items/addItem', (req, res) => {
//   const {
//     bno, SO, Style, Style_Name, Cut_No, Colour, Size, BQty,
//     Plant, Line, Damage_Pcs, Cut_Panel_Shortage, Good_Pcs, User
//   } = req.body;

//   // Check if any required fields are missing
//   const requiredFields = ['bno', 'SO', 'Style', 'Style_Name', 'Cut_No', 'Colour', 'Size', 'BQty', 'Plant', 'Line', 'Good_Pcs', 'User'];
//   for (let field of requiredFields) {
//     if (!req.body[field]) {
//       return res.status(400).json({ error: `${field} is required` });
//     }
//   }

//   // Check if the bno already exists in the fg table
//   const checkBnoSql = 'SELECT * FROM fg WHERE bno = ?';
  
//   db.query(checkBnoSql, [bno], (error, result) => {
//     if (error) {
//       console.error('Database query error:', error);
//       return res.status(500).json({ error: 'Failed to check bno existence' });
//     }

//     if (result.length > 0) {
//       // If the bno exists, return an error message
//       return res.status(400).json({ error: 'BNo already exists in the fg table' });
//     } else {
//       // Proceed with inserting the new item since bno does not exist
//       const sql = `
//         INSERT INTO fg (
//           bno, SO, Style, Style_Name, Cut_No, Colour, Size, BQty,
//           Plant, Line, Damage_Pcs, Cut_Panel_Shortage, Good_Pcs,
//           DateTime, User, Year, Month, Subtraction
//         )
//         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), ?, 
//           YEAR(CURRENT_DATE), MONTH(CURRENT_DATE), 0)
//       `;
    
//       db.query(sql, [
//         bno, SO, Style, Style_Name, Cut_No, Colour, Size, BQty,
//         Plant, Line, Damage_Pcs, Cut_Panel_Shortage, Good_Pcs, User
//       ], (error, result) => {
//         if (error) {
//           console.error('Database insert error:', error);
//           return res.status(500).json({ error: 'Failed to add item' });
//         }
//         res.status(201).json({
//           message: 'Item added successfully',
//           data: result
//         });
//       });
//     }
//   });
// });




app.post('/api/items/addItem', (req, res) => {
  const {
    bno, SO, Style, Style_Name, Cut_No, Colour, Size, BQty,
    Plant, Line, Damage_Pcs, Cut_Panel_Shortage, Good_Pcs, User
  } = req.body;

    // Check if any required fields are missing
    const requiredFields = ['bno', 'SO', 'Style', 'Style_Name', 'Cut_No', 'Colour', 'Size', 'BQty', 'Plant', 'Line', 'Good_Pcs', 'User'];
    for (let field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({ error: `${field} is required` });
      }
    }

  // Convert 0 values to NULL
  const damagePcsValue = Damage_Pcs === 0 ? null : Damage_Pcs;
  const cutPanelShortageValue = Cut_Panel_Shortage === 0 ? null : Cut_Panel_Shortage;

  // Check if the bno already exists in the fg table
  const checkBnoSql = 'SELECT * FROM fg WHERE bno = ?';

  db.query(checkBnoSql, [bno], (error, result) => {
    if (error) {
      console.error('Database query error:', error);
      return res.status(500).json({ error: 'Failed to check bno existence' });
    }

    if (result.length > 0) {
      // If the bno exists, return an error message
      return res.status(400).json({ error: 'BNo already exists in the fg table' });
    } else {
      // Proceed with inserting the new item since bno does not exist
      const sql = `
        INSERT INTO fg (
          bno, SO, Style, Style_Name, Cut_No, Colour, Size, BQty,
          Plant, Line, Damage_Pcs, Cut_Panel_Shortage, Good_Pcs,
          DateTime, User, Year, Month, Subtraction
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), ?, 
          YEAR(CURRENT_DATE), MONTH(CURRENT_DATE), 0)
      `;

      db.query(sql, [
        bno, SO, Style, Style_Name, Cut_No, Colour, Size, BQty,
        Plant, Line, damagePcsValue, cutPanelShortageValue, Good_Pcs, User
      ], (error, result) => {
        if (error) {
          console.error('Database insert error:', error);
          return res.status(500).json({ error: 'Failed to add item' });
        }
        res.status(201).json({
          message: 'Item added successfully',
          data: result
        });
      });
    }
  });
});



app.get('/api/so-list', (req, res) => {
  db.query('SELECT DISTINCT SO FROM cut_in ORDER BY Date DESC', (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.json(results);
  });
});


app.get('/api/cut-no-list', (req, res) => {
  const { SO } = req.query;
  
  if (!SO) {
    return res.status(400).json({ message: 'SO is required' });
  }

  db.query('SELECT DISTINCT Cut_No FROM cut_in WHERE SO = ?', [SO], (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.json(results);
  });
});


app.get('/api/items/cut-in', (req, res) => {
  const { SO, Cut_No } = req.query;

  if (!SO || !Cut_No) {
    return res.status(400).json({ message: 'SO and Cut_No are required' });
  }

  db.query(
    'SELECT * FROM cut_in WHERE SO = ? AND Cut_No = ?', 
    [SO, Cut_No], 
    (error, results) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      res.json(results.length > 0 ? results : { message: 'No data found' });
    }
  );
});

//insert data to print ststus table
app.post('/api/store-print-status', (req, res) => {
  const { SO, Cut_No } = req.body;

  const query = `
      INSERT INTO print_status (SO, Cut_No, status)
      VALUES (?, ?, 'printed')
      ON DUPLICATE KEY UPDATE status = 'printed';
  `;

  db.query(query, [SO, Cut_No], (err, result) => {
      if (err) {
          console.error("Error storing print status:", err);
          return res.status(500).json({ error: "Database error" });
      }
      res.json({ message: "Print status stored successfully" });
  });
});


//get data from print status table to check printed or not
app.get('/api/check-print-status', (req, res) => {
  const { SO, Cut_No } = req.query;

  const query = `SELECT status FROM print_status WHERE SO = ? AND Cut_No = ?`;

  db.query(query, [SO, Cut_No], (err, results) => {
      if (err) {
          console.error("Error checking print status:", err);
          return res.status(500).json({ error: "Database error" });
      }

      if (results.length > 0) {
          res.json({ status: results[0].status });
      } else {
          res.json({ status: "not printed" });
      }
  });
});





// Helper functions
function isStrongPassword(password) {
  const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return strongPasswordRegex.test(password);
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPhone(phone) {
  const phoneRegex = /^\d{10}$/;
  return phoneRegex.test(phone);
}

// Start server
app.listen(port, () => {
  console.log(`https://82.112.230.12:3002`);

});
