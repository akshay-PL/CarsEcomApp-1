//http://localhost:3000/api-docs/

const express = require('express');
const swaggerUi = require('swagger-ui-express');
const sql = require('mssql');
const app = express();
const PORT = process.env.PORT || 3000;
const swaggerJsdoc = require('swagger-jsdoc');
const jwt = require('jsonwebtoken');
const rolesRouter = require('./crud/roles.js'); // Assuming your router file is named "roles.js"
const usersRouter = require('./crud/users.js');
const productsRouter = require('./crud/products.js');
const userMapRolesRouter = require('./crud/usermaproles.js');
const userCredentialsRouter = require('./crud/usercredentials.js');
const ordersRouter = require('./crud/ordersRouter.js');
const orderItemsRouter = require('./crud/orderItemsRouter.js');


const multer = require('multer');
const upload = multer({ dest: 'C:/Users/PL AKSHAY/Desktop/images' });
//AWC BUCKET
//CLOUDINARY

//cors error
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Add 'Authorization' header here
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



app.use('/roles', rolesRouter);
app.use('/users', usersRouter); 
app.use('/usercredentials', userCredentialsRouter);
app.use('/usermaproles', userMapRolesRouter);
app.use('/cars', productsRouter);
app.use('/orders', ordersRouter);
app.use('/orderitems', orderItemsRouter);




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



// Middleware function to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from Authorization header
  if (!token) {
    return res.status(401).json({ error: "Token not provided" });
  }

  try {
    const decoded = jwt.verify(token, jwtKey);
    // Attach user information to request object for use in protected routes if needed
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};




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

// Protected route example
app.get("/protected", verifyToken, (req, res) => {
  // If the token is valid, the user object will be attached to the request object
  const user = req.user;
  res.json({ message: "Access granted", user });
});







// Route for getting all shipping addresses
app.get('/shippingaddresses', async (req, res) => {
  try {
    const result = await sql.query`SELECT * FROM Shipping_address`;
    res.json(result.recordset);
  } catch (error) {
    console.error('Error fetching shipping address:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});











// Route for getting a shipping address by ID


app.get('/shippingaddress/:id', async (req, res) => {
  const addressId = req.params.id;
  try {
    const result = await sql.query`
      SELECT *
      FROM Shipping_address 
      WHERE id = ${addressId}`;
    if (result.recordset.length > 0) {
      res.json(result.recordset[0]);
    } else {
      res.status(404).json({ error: 'Shipping address not found' });
    }
  } catch (error) {
    console.error('Error fetching Shipping Address by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});







// Route for creating a new shipping address
app.post('/shipping_address', async (req, res) => {
  const { fullName, email, address, city, zipCode, createdBy } = req.body;
  try {
    const result = await sql.query`
      INSERT INTO Shipping_address (fullName, email, address, city, zipCode, createdBy) 
      VALUES (${fullName}, ${email}, ${address}, ${city}, ${zipCode}, ${createdBy})`;

    const newAddressId = result.recordset[0].newAddressId;
    res.status(201).json({ message: 'Shipping address created successfully', id: newAddressId });
  } catch (error) {
    console.error('Error creating shipping address:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});











// Route for getting all billing addresses
app.get('/billing-addresses', (req, res) => {
  const sql = 'SELECT * FROM Billing_address';
  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(results);
    }
  });
});





// Route for getting a billing address by ID
app.get('/billing-address/:id', (req, res) => {
  const addressId = req.params.id;
  const sql = 'SELECT * FROM Billing_address WHERE id = ?';
  db.query(sql, [addressId], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (result.length === 0) {
      res.status(404).json({ message: 'Billing address not found' });
    } else {
      res.json(result[0]);
    }
  });
});



// Route for creating a new billing address
app.post('/billing-address', (req, res) => {
  const { fullName, email, address, city, zipCode } = req.body;
  const sql = 'INSERT INTO Billing_address (fullName, email, address, city, zipCode) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [fullName, email, address, city, zipCode], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json({ message: 'Billing address created successfully', id: result.insertId });
    }
  });
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
    
    const filename = req.file.filename; // Accessing the filename instead of path
    const description = req.body.description; 

    // You can use `filename` to construct the path if needed
    const imagePath = 'C:/Users/PL AKSHAY/Desktop/images/' + filename;
    
    res.status(200).send("Image uploaded successfully.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error uploading image.");
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


