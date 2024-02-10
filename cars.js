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


//const multer = require('multer');
//const upload = multer({ dest: 'C:/Akshay pL Custom Folder/PROGRAMS/react-cars24-dummy-project/react-cars24page/cars-page/src/Components/Assets' });
//AWC BUCKET
//CLOUDINARY

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


/*



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
*/

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


