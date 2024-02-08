//http://localhost:3000/api-docs/

const express = require('express');
const swaggerUi = require('swagger-ui-express');
const sql = require('mssql');
const app = express();
const PORT = process.env.PORT || 3000;
const swaggerJsdoc = require('swagger-jsdoc');
const jwt = require('jsonwebtoken');
const multer = require('multer');

const upload = multer({ dest: 'C:/Akshay pL Custom Folder/PROGRAMS/react-cars24-dummy-project/react-cars24page/cars-page/src/Components/Assets' });


//cors error
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

//const connectionString = "Server=Akshay\\SQLEXPRESS;Database=CarsEcom;Integrated Security=True;encrypt=true;trustServerCertificate=true;";

const dbConfig = {
  user: 'akshayproject',
  password: 'sql23',
  server: 'Akshay\\SQLEXPRESS',
  database: 'CarsEcom',
  //database: 'CarsEcom',

  options: {
      encrypt: true,
      trustServerCertificate: true,
  },
};

sql.connect(dbConfig)
  .then(() => {
      console.log('Connected to MSSQL database');
  })
  .catch((err) => {
      console.error('Error connecting to MSSQL database:', err);
  });



/*
sql.connect(connectionString)
  .then(() => {
    console.log('Connected to MSSQL database');
  })
  .catch((err) => {
    console.error('Error connecting to MSSQL database:', err);
  });
*/
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'MSSQL CRUD API CarsEcom',
      version: '1.0.0',
      description: 'API for performing CRUD operations on MSSQL database',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Local development server',
      },
    ],
  },
  apis: ['routes/user.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.json());

//ROLES
app.get('/roles', async (req, res) => {
  try {
      const result = await sql.query`SELECT * FROM Roles`;
      res.json(result.recordset);
  } catch (error) {
      console.error('Error fetching roles:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/roles/:id', async (req, res) => {
  const roleId = req.params.id;
  try {
      const result = await sql.query`SELECT * FROM Roles WHERE id = ${roleId}`;
      if (result.recordset.length > 0) {
          res.json(result.recordset[0]);
      } else {
          res.status(404).json({ error: 'Role not found' });
      }
  } catch (error) {
      console.error('Error fetching role by ID:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/roles', async (req, res) => {
  const { roleName } = req.body;

  // Log the request body for debugging
  console.log('Request Body:', req.body);

  if (!roleName) {
    return res.status(400).json({ error: 'RoleName is required in the request body' });
  }

  try {
    const result = await sql.query`INSERT INTO Roles (roleName) VALUES (${roleName})`;
    console.log(result);  // Log the result for debugging
    res.status(201).json({ message: 'Role created successfully' });
  } catch (error) {
    console.error('Error creating role:', error);
    res.status(500).json({ error: `Internal Server Error: ${error.message}` });
  }
});


app.put('/roles/:id', async (req, res) => {
  const roleId = req.params.id;
  const { roleName } = req.body;
  try {
    const result = await sql.query`UPDATE Roles SET roleName=${roleName} WHERE id = ${roleId}`;
    console.log(result);  // Log the result for debugging
    res.json({ message: 'Role updated successfully' });
  } catch (error) {
    console.error('Error updating role:', error);
    res.status(500).json({ error: `Internal Server Error: ${error.message}` });
  }
});



app.delete('/roles/:id', async (req, res) => {
  const roleId = req.params.id;
  try {
      const result = await sql.query`DELETE FROM Roles WHERE id = ${roleId}`;
      res.json({ message: 'Role deleted successfully' });
  } catch (error) {
      console.error('Error deleting role:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});






//USERS
// CRUD operations for Users
app.get('/users', async (req, res) => {
  try {
      const result = await sql.query`SELECT * FROM Users`;
      res.json(result.recordset);
  } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/users/:id', async (req, res) => {
  const userId = req.params.id;
  try {
      const result = await sql.query`SELECT * FROM Users WHERE id = ${userId}`;
      if (result.recordset.length > 0) {
          res.json(result.recordset[0]);
      } else {
          res.status(404).json({ error: 'User not found' });
      }
  } catch (error) {
      console.error('Error fetching user by ID:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/users', async (req, res) => {
  const { username, email, password } = req.body;
  try {
      const result = await sql.query`INSERT INTO Users (username, email) VALUES (${username}, ${email})`;
      res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/users/:id', async (req, res) => {
  const userId = req.params.id;
  const { username, email} = req.body;
  try {
    const result = await sql.query`UPDATE Users SET username=${username}, email=${email} WHERE id = ${userId}`;
    res.json({ message: 'User updated successfully' });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/users/:id', async (req, res) => {
  const userId = req.params.id;
  try {
      const result = await sql.query`DELETE FROM Users WHERE id = ${userId}`;
      res.json({ message: 'User deleted successfully' });
  } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});







//USERCREDENTIQL
app.get('/usercredentials', async (req, res) => {
  try {
    const result = await sql.query`SELECT * FROM User_credential`;
    res.json(result.recordset);
  } catch (error) {
    console.error('Error fetching user credentials:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/usercredentials/:id', async (req, res) => {
  const userCredentialId = req.params.id;
  try {
    // Example: Retrieve user credentials from the database based on ID
    const result = await sql.query`SELECT * FROM User_credential WHERE id = ${userCredentialId}`;
    
    if (result.recordset.length > 0) {
      res.json(result.recordset[0]);
    } else {
      res.status(404).json({ error: 'User credential not found' });
    }
  } catch (error) {
    console.error('Error fetching user credential by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.post('/usercredentials', async (req, res) => {
  const { userId, password } = req.body;

  try {
    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await sql.query`INSERT INTO User_credential (userId, password, createdAt, createdBy) 
                                    VALUES (${userId}, ${hashedPassword}, GETDATE(), ${createdBy})`;

    res.status(201).json({ message: 'User credentials created successfully' });
  } catch (error) {
    console.error('Error creating user credentials:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.put('/usercredentials/:id', async (req, res) => {
  const userCredentialId = req.params.id;
  const { password } = req.body;
  try {
    // WARNING: Storing passwords in plain text is insecure and strongly discouraged.
    const result = await sql.query`UPDATE User_credential SET password = ${password} WHERE id = ${userCredentialId}`;
    res.json({ message: 'User credential updated successfully' });
  } catch (error) {
    console.error('Error updating user credential:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.delete('/usercredentials/:id', async (req, res) => {
  const userCredentialId = req.params.id;
  try {
    const result = await sql.query`DELETE FROM User_credential WHERE id = ${userCredentialId}`;
    res.json({ message: 'User credential deleted successfully' });
  } catch (error) {
    console.error('Error deleting user credential:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});








//USERMAPROLES
// CRUD operations for UserMapRoles
app.get('/usermaproles', async (req, res) => {
  try {
      const result = await sql.query`SELECT * FROM UserMapRoles`;
      res.json(result.recordset);
  } catch (error) {
      console.error('Error fetching user-role mappings:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/usermaproles/:userId', async (req, res) => {
  const userId = req.params.userId;
  try {
      const result = await sql.query`SELECT * FROM UserMapRoles WHERE userId = ${userId}`;
      res.json(result.recordset);
  } catch (error) {
      console.error('Error fetching user-role mappings by userId:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/usermaproles', async (req, res) => {
  const { userId, roleId } = req.body;
  try {
      const result = await sql.query`INSERT INTO UserMapRoles (userId, roleId) VALUES (${userId}, ${roleId})`;
      res.status(201).json({ message: 'User-role mapping created successfully' });
  } catch (error) {
      console.error('Error creating user-role mapping:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/usermaproles/:userId/:roleId', async (req, res) => {
  const { userId, roleId } = req.params;
  const newRoleId = req.body.newRoleId;
  try {
      const result = await sql.query`UPDATE UserMapRoles SET roleId = ${newRoleId} WHERE userId = ${userId} AND roleId = ${roleId}`;
      if (result.rowsAffected[0] === 0) {
          res.status(404).json({ error: 'User-role mapping not found' });
      } else {
          res.status(200).json({ message: 'User-role mapping updated successfully' });
      }
  } catch (error) {
      console.error('Error updating user-role mapping:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/usermaproles/:userId/:roleId', async (req, res) => {
  const { userId, roleId } = req.params;
  try {
      const result = await sql.query`DELETE FROM UserMapRoles WHERE userId = ${userId} AND roleId = ${roleId}`;
      if (result.rowsAffected[0] === 0) {
          res.status(404).json({ error: 'User-role mapping not found' });
      } else {
          res.status(200).json({ message: 'User-role mapping deleted successfully' });
      }
  } catch (error) {
      console.error('Error deleting user-role mapping:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});






app.get('/cars', async (req, res) => {
  try {
    const result = await sql.query`SELECT * FROM Cars WHERE isDeleted = 0`;
    res.json(result.recordset);
  } catch (error) {
    console.error('Error fetching cars:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get car by ID
app.get('/cars/:id', async (req, res) => {
  const carId = req.params.id;
  try {
    const result = await sql.query`SELECT * FROM Cars WHERE id = ${carId} AND isDeleted = 0`;
    if (result.recordset.length > 0) {
      res.json(result.recordset[0]);
    } else {
      res.status(404).json({ error: 'Car not found' });
    }
  } catch (error) {
    console.error('Error fetching car by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create a new car
app.post('/cars', async (req, res) => {
  const { brand, type, model, year, price, stock_quantity, description } = req.body;
  try {
    const result = await sql.query`INSERT INTO Cars (brand, type, model, year, price, stock_quantity, description, createdBy) 
                                      VALUES (${brand}, ${type}, ${model}, ${year}, ${price}, ${stock_quantity}, ${description}, 1)`;
    res.status(201).json({ message: 'Car created successfully' });
  } catch (error) {
    console.error('Error creating car:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Update a car by ID
app.put('/cars/:id', async (req, res) => {
  const carId = req.params.id;
  const { brand,type, model, year, price, stock_quantity,description } = req.body;
  try {
    const result = await sql.query`UPDATE Cars 
                                      SET brand=${brand},type=${type}, model=${model}, year=${year}, price=${price}, 
                                          stock_quantity=${stock_quantity},description=${description}, updatedAt = GETDATE(), updatedBy = 1 
                                      WHERE id = ${carId} AND isDeleted = 0`;
    res.json({ message: 'Car updated successfully' });
  } catch (error) {
    console.error('Error updating car:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a car by ID
app.delete('/cars/:id', async (req, res) => {
  const carId = req.params.id;
  try {
    const result = await sql.query`UPDATE Cars SET isDeleted = 1 WHERE id = ${carId} AND isDeleted = 0`;
    res.json({ message: 'Car deleted successfully' });
  } catch (error) {
    console.error('Error deleting car:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});






//orders

app.get('/orders', async (req, res) => {
  try {
    const result = await sql.query`SELECT * FROM Orders`;
    res.json(result.recordset);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/orders/:id', async (req, res) => {
  const orderId = req.params.id;
  try {
    const result = await sql.query`SELECT * FROM Orders WHERE id = ${orderId}`;
    if (result.recordset.length > 0) {
      res.json(result.recordset[0]);
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  } catch (error) {
    console.error('Error fetching order by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.post('/orders', async (req, res) => {
  const { userId, order_date, total_amount } = req.body;
  try {
    const result = await sql.query`INSERT INTO Orders (userId, order_date, total_amount, createdBy) 
                                      VALUES (${userId}, ${order_date}, ${total_amount}, 1)`;
    res.status(201).json({ message: 'Order created successfully' });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.put('/orders/:id', async (req, res) => {
  const orderId = req.params.id;
  const { userId, order_date, total_amount } = req.body;
  try {
    const result = await sql.query`UPDATE Orders SET customerId=${userId}, order_date=${order_date}, 
                                      total_amount=${total_amount} WHERE id = ${orderId}`;
    res.json({ message: 'Order updated successfully' });
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.delete('/orders/:id', async (req, res) => {
  const orderId = req.params.id;
  try {
    const result = await sql.query`DELETE FROM Orders WHERE id = ${orderId}`;
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



//orderitems
app.get('/orderitems', async (req, res) => {
  try {
    const result = await sql.query`SELECT * FROM OrderItems`;
    res.json(result.recordset);
  } catch (error) {
    console.error('Error fetching order items:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/orderitems/:id', async (req, res) => {
  const orderItemId = req.params.id;
  try {
    const result = await sql.query`SELECT * FROM OrderItems WHERE id = ${orderItemId}`;
    if (result.recordset.length > 0) {
      res.json(result.recordset[0]);
    } else {
      res.status(404).json({ error: 'Order item not found' });
    }
  } catch (error) {
    console.error('Error fetching order item by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.post('/orderitems', async (req, res) => {
  const { orderId, carId, quantity, item_price } = req.body;
  try {
    const result = await sql.query`INSERT INTO OrderItems (orderId, carId, quantity, item_price, createdBy) 
                                      VALUES (${orderId}, ${carId}, ${quantity}, ${item_price}, 1)`;
    res.status(201).json({ message: 'Order item created successfully' });
  } catch (error) {
    console.error('Error creating order item:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.put('/orderitems/:id', async (req, res) => {
  const orderItemId = req.params.id;
  const { orderId, carId, quantity, item_price } = req.body;
  try {
    const result = await sql.query`UPDATE OrderItems SET orderId=${orderId}, carId=${carId}, 
                                      quantity=${quantity}, item_price=${item_price} WHERE id = ${orderItemId}`;
    res.json({ message: 'Order item updated successfully' });
  } catch (error) {
    console.error('Error updating order item:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.delete('/orderitems/:id', async (req, res) => {
  const orderItemId = req.params.id;
  try {
    const result = await sql.query`DELETE FROM OrderItems WHERE id = ${orderItemId}`;
    res.json({ message: 'Order item deleted successfully' });
  } catch (error) {
    console.error('Error deleting order item:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});











// Signup endpoint
app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password) {
      return res.status(400).json({ error: "Username, email, or password missing" });
    }

    // Connect to MSSQL database
    const pool = await sql.connect(dbConfig);

    // Insert the new user into the database
    const result = await pool.request()
      .input('username', sql.VarChar, username)
      .input('email', sql.VarChar, email)
      .input('password', sql.VarChar, password)
      .query('INSERT INTO Signup (username, email, password) VALUES (@username, @email, @password)');
      
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error:", error);
    if (error.number === 2601) {
      // SQL Server error number for unique constraint violation
      return res.status(409).json({ error: "User already exists" });
    }
    res.status(500).json({ error: "Something went wrong during signup process" });
  }
});

// Define your JWT secret key
const jwtKey = "9h0uY9R#wQDZBn3X$nq5rZ7c6yA!E2G*W";

// Login endpoint
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ error: "Email or password missing" });
    }

    // Connect to MSSQL database
    const pool = await sql.connect(dbConfig);

    // Query to find user by email and password
    const result = await pool.request()
      .input('email', sql.VarChar, email)
      .input('password', sql.VarChar, password)
      .query('SELECT * FROM Signup WHERE email = @email AND password = @password');

    // Assuming the result contains the user if found
    const user = result.recordset[0];

    if (!user) {
      return res.status(401).json({ error: "No user found or incorrect email/password combination" });
    }

    // Generate JWT token using jwtKey
    const token = jwt.sign({ user }, jwtKey, { expiresIn: "48h" });

    res.json({ user, auth: token });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Something went wrong during authentication" });
  }
});






// GET method to retrieve all images from the database
app.get('/uploadImage', async (req, res) => {
  try {
    await sql.connect(config);
    const request = new sql.Request();
    const result = await request.query('SELECT * FROM CarImages');
    res.status(200).json(result.recordset);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving images.");
  } finally {
    sql.close();
  }
});

// POST method to upload an image to the database
app.post('/uploadImage', upload.single('imageData'), async (req, res) => {
  try {
    
    const imagePath = req.file.path; 
    const description = req.body.description; 

    
    res.status(200).send("Image uploaded successfully.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error uploading image.");
  }
});





app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


