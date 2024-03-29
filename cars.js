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
const bodyParser = require('body-parser');



app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Add 'Authorization' header here
  next();
});

const dbConfig = {
  user: 'akshayproject',
  password: 'sql23',
  server: 'Akshay\\SQLEXPRESS',
  database: 'CarsEcom',

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

app.use(bodyParser.json({ limit: '50mb' })); // Adjust the limit as per your requirement
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));



app.use('/roles', rolesRouter);
app.use('/users', usersRouter); 
app.use('/usercredentials', userCredentialsRouter);
app.use('/usermaproles', userMapRolesRouter);
app.use('/cars', productsRouter);
app.use('/orders', ordersRouter);
app.use('/orderitems', orderItemsRouter);



app.get("/signup", async (req, res) => {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request().query('SELECT * FROM Signup');

    res.status(200).json(result.recordset);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Something went wrong while fetching user information" });
  }
});


app.get("/signup/:email", async (req, res) => {
  const email = req.params.email;

  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .input("email", sql.VarChar, email)
      .query('SELECT * FROM Signup WHERE email = @email');

    if (result.recordset.length > 0) {
      res.status(200).json(result.recordset[0]); // Assuming username is unique
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Something went wrong while fetching user information" });
  }
});




// Signup endpoint
app.post("/signup", async (req, res) => {
  const { username, email, password, firstname, lastname, address, date_of_birth, contact, role } = req.body;
  try {
    if (!username || !email || !password || !firstname || !lastname || !address || !date_of_birth || !contact || !role) {
      return res.status(400).json({ error: "Required fields are missing" });
    }

    const pool = await sql.connect(dbConfig);

    const result = await pool.request()
      .input('username', sql.VarChar, username)
      .input('email', sql.VarChar, email)
      .input('password', sql.VarChar, password)
      .input('firstname', sql.VarChar, firstname)
      .input('lastname', sql.VarChar, lastname)
      .input('address', sql.VarChar, address)
      .input('date_of_birth', sql.Date, date_of_birth)
      .input('contact', sql.VarChar, contact)
      .input('role', sql.VarChar, role)
      .query('INSERT INTO Signup (username, email, password, firstname, lastname, address, date_of_birth, contact, role) VALUES (@username, @email, @password, @firstname, @lastname, @address, @date_of_birth, @contact, @role)');
      
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error:", error);
    if (error.number === 2601) {
      return res.status(409).json({ error: "User already exists" });
    }
    res.status(500).json({ error: "Something went wrong during signup process" });
  }
});


app.put("/signup/:email", async (req, res) => {
  const email = req.params.email;
  const { username, password, firstname, lastname, address, date_of_birth, contact } = req.body;
  
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .input("email", sql.VarChar, email)
      .input("username", sql.VarChar, username)
      .input("password", sql.VarChar, password)
      .input("firstname", sql.VarChar, firstname)
      .input("lastname", sql.VarChar, lastname)
      .input("address", sql.VarChar, address)
      .input("date_of_birth", sql.Date, date_of_birth)
      .input("contact", sql.VarChar, contact)
      .query(
        `UPDATE Signup 
         SET username = @username,
             password = @password,
             firstname = @firstname,
             lastname = @lastname,
             address = @address,
             date_of_birth = @date_of_birth,
             contact = @contact
         WHERE email = @email` // Update based on email
      );

    if (result.rowsAffected[0] > 0) {
      return res
        .status(200)
        .json({ message: "User information updated successfully" });
    } else {
      return res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "Something went wrong during the update process" });
  }
});



app.patch("/forgotpassword/:email", async (req, res) => {
  const email = req.params.email;
  const { newPassword } = req.body;

  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .input("email", sql.VarChar, email)
      .input("password", sql.VarChar, newPassword)
      .query(
        `UPDATE Signup 
         SET password = @password 
         WHERE email = @email`
      );

    if (result.rowsAffected[0] > 0) {
      return res
        .status(200)
        .json({ message: "Password updated successfully" });
    } else {
      return res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "Something went wrong during the password update process" });
  }
});






// Middleware function to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; 
  if (!token) {
    return res.status(401).json({ error: "Token not provided" });
  }

  try {
    const decoded = jwt.verify(token, jwtKey);
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};




const jwtKey = "9h0uY9R#wQDZBn3X$nq5rZ7c6yA!E2G*W";

// Login endpoint
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ error: "Email or password missing" });
    }

    const pool = await sql.connect(dbConfig);

    const result = await pool.request()
      .input('email', sql.VarChar, email)
      .input('password', sql.VarChar, password)
      .query('SELECT * FROM Signup WHERE email = @email AND password = @password');

    const user = result.recordset[0];

    if (!user) {
      return res.status(401).json({ error: "No user found or incorrect email/password combination" });
    }

    const token = jwt.sign({ user }, jwtKey, { expiresIn: "48h" });

    res.json({ user, auth: token });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Something went wrong during authentication" });
  }
});

app.get("/protected", verifyToken, (req, res) => {
  const user = req.user;
  res.json({ message: "Access granted", user });
});













app.get('/shippingaddress', async (req, res) => { // Change from '/shippingaddresses' to '/shippingaddress'
  try {
    const result = await sql.query`
      SELECT *
      FROM Shipping_address`;
    res.json(result.recordset);
  } catch (error) {
    console.error('Error fetching all Shipping Addresses:', error);
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
app.post("/shippingaddress", async (req, res) => {
  const { fullName, email, address, city, zipCode, is_shipping_add_same } = req.body;
  try {
    if (!fullName || !email || !address || !city || !zipCode || is_shipping_add_same === undefined) {
      return res.status(400).json({ error: "Missing required fields for shipping address" });
    }

    const pool = await sql.connect(dbConfig);

    const result = await pool.request()
      .input('fullName', sql.VarChar, fullName)
      .input('email', sql.VarChar, email)
      .input('address', sql.VarChar, address)
      .input('city', sql.VarChar, city)
      .input('zipCode', sql.VarChar, zipCode)
      .input('is_shipping_add_same', sql.Bit, is_shipping_add_same)
      .query('INSERT INTO Shipping_address (fullName, email, address, city, zipCode, is_shipping_add_same) VALUES (@fullName, @email, @address, @city, @zipCode, @is_shipping_add_same)');
      
    res.status(201).json({ message: "Shipping address created successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Something went wrong during shipping address creation" });
  }
});








// Route for getting all billing addresses
app.get('/billing-addresses', async (req, res) => {
  try {
    const result = await sql.query`SELECT * FROM Billing_address`;
    res.json(result.recordset);
  } catch (error) {
    console.error('Error fetching billing address:', error);

    res.status(500).json({ error: error.message });
  }
});



app.get('/billing-address/:id', async (req, res) => {
  const addressId = req.params.id;
  try {
    const result = await sql.query`
      SELECT *
      FROM Billing_address 
      WHERE id = ${addressId}`;
    if (result.recordset.length > 0) {
      res.json(result.recordset[0]);
    } else {
      res.status(404).json({ error: 'Billing address not found' });
    }
  } catch (error) {
    console.error('Error fetching Billing Address by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.post('/billing-address', async (req, res) => {
  const { fullName, email, address, city, zipCode, createdBy} = req.body;
  try {
    const result = await sql.query`
      INSERT INTO Billing_address (fullName, email, address, city, zipCode) 
      VALUES (${fullName}, ${email}, ${address}, ${city}, ${zipCode})`;

    res.status(201).json({ message: 'Billing address created successfully' });
  } catch (error) {
    console.error('Error creating Billing address:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




// GET endpoint to fetch all orders
app.get("/ordersummary", async (req, res) => {
  try {
    const result = await sql.query`SELECT * FROM Order_summary`;
    res.json(result.recordset); // Assuming result.recordset contains the fetched orders
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get("/ordersummary/:usermail", async (req, res) => {
  const { usermail } = req.params; // Extracting usermail from route parameters
  if (!usermail) {
    return res.status(400).json({ error: 'Missing usermail parameter' });
  }

  try {
    const result = await sql.query`SELECT * FROM Order_summary WHERE usermail = ${usermail}`;
    res.json(result.recordset);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});






app.post("/ordersummary", async (req, res) => {
  const {
    usermail,
    product_brand,
    product_type,
    product_model,
    product_price,
    ship_fullName,
    ship_email,
    ship_address,
    ship_city,
    ship_zipCode,
    bill_fullName,
    bill_email,
    bill_address,
    bill_city,
    bill_zipCode,
  } = req.body;

  try {
    const result = await sql.query`
      INSERT INTO Order_summary (
        usermail,product_brand, product_type, product_model, product_price,
        ship_fullName, ship_email, ship_address, ship_city, ship_zipCode,
        bill_fullName, bill_email, bill_address, bill_city, bill_zipCode
      ) 
      VALUES (
        ${usermail},${product_brand}, ${product_type}, ${product_model}, ${product_price},
        ${ship_fullName}, ${ship_email}, ${ship_address}, ${ship_city}, ${ship_zipCode},
        ${bill_fullName}, ${bill_email}, ${bill_address}, ${bill_city}, ${bill_zipCode}
      )`;

    res.status(201).json({ message: 'Order created successfully' });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.get('/shippingaddress', async (req, res) => { // Change from '/shippingaddresses' to '/shippingaddress'
  try {
    const result = await sql.query`
      SELECT *
      FROM Shipping_address`;
    res.json(result.recordset);
  } catch (error) {
    console.error('Error fetching all Shipping Addresses:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




app.get('/productimages', async (req, res) => {
  try {
    const result=await sql.query`SELECT * FROM productImage`;
    res.json(result.recordset);
  } catch (error) {
    console.error('Error fetching product images:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST request to create a new product image
// POST request to create a new product image
app.post('/productimages', async (req, res) => {
  const { converted } = req.body;
  try {
    const result = await sql.query`
      INSERT INTO productImage (converted)
      VALUES (${converted})
    `;
    res.status(201).json({ message: 'Product image created successfully' });
  } catch (error) {
    console.error('Error creating product image:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



// DELETE request to delete a product image by ID
app.delete('/productimages/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const result = await sql.query`DELETE FROM productImage WHERE id = ${id}`;
    res.json({ message: 'Product image deleted successfully' });
  } catch (error) {
    console.error('Error deleting product image:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


