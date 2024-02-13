/**
 * @swagger
 * tags:
 *   - name: Roles
 *     description: Operations related to roles
 */

/**
 * @swagger
 * /roles:
 *   get:
 *     tags:
 *       - Roles
 *     summary: Get all roles
 *     description: Retrieve a list of all roles from the database.
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Successful response
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *       500:
 *         description: Internal Server Error
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 */

/**
 * @swagger
 * /roles/{id}:
 *   get:
 *     tags:
 *       - Roles
 *     summary: Get a specific role by ID
 *     description: Retrieve a role from the database based on the provided ID.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the role to retrieve
 *         required: true
 *         type: integer
 *         format: int64
 *     responses:
 *       200:
 *         description: Successful response
 *         schema:
 *           type: object
 *       404:
 *         description: Role not found
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *       500:
 *         description: Internal Server Error
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 */

/**
 * @swagger
 * /roles:
 *   post:
 *     tags:
 *       - Roles
 *     summary: Create a new role
 *     description: Create a new role in the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               roleName:
 *                 type: string
 *     responses:
 *       201:
 *         description: Role created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */

/**
 * @swagger
 * /roles/{id}:
 *   put:
 *     tags:
 *       - Roles
 *     summary: Update an existing role
 *     description: Update an existing role in the database based on the provided ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the role to update
 *         required: true
 *         type: integer
 *         format: int64
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               roleName:
 *                 type: string
 *     responses:
 *       200:
 *         description: Role updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */



/**
 * @swagger
 * /roles/{id}:
 *   delete:
 *     tags:
 *       - Roles
 *     summary: Delete a role
 *     description: Delete a role based on the provided ID.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Role ID
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Role deleted successfully
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *       404:
 *         description: Role not found
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *       500:
 *         description: Internal Server Error
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 */











/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: Operations related to users
 */

/**
 * @swagger
 * /users:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get all users
 *     description: Retrieve a list of all users from the database.
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Successful response
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *       500:
 *         description: Internal Server Error
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 */

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get a specific user by ID
 *     description: Retrieve a user from the database based on the provided ID.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the user to retrieve
 *         required: true
 *         type: integer
 *         format: int64
 *     responses:
 *       200:
 *         description: Successful response
 *         schema:
 *           type: object
 *       404:
 *         description: User not found
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *       500:
 *         description: Internal Server Error
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 */

/**
 * @swagger
 * /users:
 *   post:
 *     tags:
 *       - Users
 *     summary: Create a new user
 *     description: Create a new user in the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a user by ID
 *     description: Update user details like username and email.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to be updated
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: The user object with updated details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             example:
 *               message: User updated successfully
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             example:
 *               error: User not found
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     tags:
 *       - Users
 *     summary: Delete a user
 *     description: Delete a user based on the provided ID.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: User ID
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *       404:
 *         description: User not found
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *       500:
 *         description: Internal Server Error
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 */












/**
 * @swagger
 * tags:
 *   - name: UserCredentials
 *     description: Operations related to user credentials
 */

/**
 * @swagger
 * /usercredentials:
 *   get:
 *     tags:
 *       - UserCredentials
 *     summary: Get all user credentials
 *     description: Retrieve a list of all user credentials from the database.
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */


/**
 * @swagger
 * /usercredentials/{id}:
 *   get:
 *     tags:
 *       - UserCredentials
 *     summary: Get user credentials by ID
 *     description: Retrieve user credentials from the database based on the provided ID.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the user credentials to retrieve
 *         required: true
 *         type: integer
 *         format: int64
 *     responses:
 *       200:
 *         description: Successful response
 *         schema:
 *           type: object
 *       404:
 *         description: User credentials not found
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *       500:
 *         description: Internal Server Error
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 */


/**
 * @swagger
 * /usercredentials:
 *   post:
 *     tags:
 *       - UserCredentials
 *     summary: Create new user credentials
 *     description: Create new user credentials in the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User credentials created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */

/**
 * @swagger
 * /usercredentials/{id}:
 *   put:
 *     tags:
 *       - UserCredentials
 *     summary: Update user credentials by ID
 *     description: Update user credentials in the database based on the provided ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the user credentials to update
 *         required: true
 *         type: integer
 *         format: int64
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User credentials updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: User credentials not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */

/**
 * @swagger
 * /usercredentials/{id}:
 *   delete:
 *     tags:
 *       - UserCredentials
 *     summary: Delete user credentials
 *     description: Delete user credentials based on the provided ID.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: User credentials ID
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: User credentials deleted successfully
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *       404:
 *         description: User credentials not found
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *       500:
 *         description: Internal Server Error
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 */













/**
 * @swagger
 * tags:
 *   - name: UserMapRoles
 *     description: Operations related to user-role mappings
 */

/**
 * @swagger
 * /usermaproles:
 *   get:
 *     tags:
 *       - UserMapRoles
 *     summary: Get all user-role mappings
 *     description: Retrieve a list of all user-role mappings from the database.
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Successful response
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *       500:
 *         description: Internal Server Error
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 */

/**
 * @swagger
 * /usermaproles/{userId}:
 *   get:
 *     tags:
 *       - UserMapRoles
 *     summary: Get user-role mappings by userId
 *     description: Retrieve user-role mappings from the database based on the provided userId.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: ID of the user to retrieve user-role mappings
 *         required: true
 *         type: integer
 *         format: int64
 *     responses:
 *       200:
 *         description: Successful response
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *       500:
 *         description: Internal Server Error
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 */

/**
 * @swagger
 * /usermaproles:
 *   post:
 *     tags:
 *       - UserMapRoles
 *     summary: Create a new user-role mapping
 *     description: Create a new user-role mapping in the database.
 *     produces:
 *       - application/json
 *     requestBody:
 *       description: User-role mapping details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *               roleId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: User-role mapping created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */

/**
 * @swagger
 * /usermaproles/{userId}/{roleId}:
 *   put:
 *     tags:
 *       - UserMapRoles
 *     summary: Update an existing user-role mapping
 *     description: Update an existing user-role mapping in the database based on the provided userId and roleId.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: ID of the user to update user-role mapping
 *         required: true
 *         type: integer
 *         format: int64
 *       - name: roleId
 *         in: path
 *         description: ID of the role to update user-role mapping
 *         required: true
 *         type: integer
 *         format: int64
 *     requestBody:
 *       description: New roleId for update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newRoleId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: User-role mapping updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: User-role mapping not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */

/**
 * @swagger
 * /usermaproles/{userId}/{roleId}:
 *   delete:
 *     tags:
 *       - UserMapRoles
 *     summary: Delete a user-role mapping
 *     description: Delete a user-role mapping based on the provided userId and roleId.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: ID of the user to delete user-role mapping
 *         required: true
 *         type: integer
 *         format: int64
 *       - name: roleId
 *         in: path
 *         description: ID of the role to delete user-role mapping
 *         required: true
 *         type: integer
 *         format: int64
 *     responses:
 *       200:
 *         description: User-role mapping deleted successfully
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *       404:
 *         description: User-role mapping not found
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *       500:
 *         description: Internal Server Error
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 */





/**
 * @swagger
 * tags:
 *   - name: Vehicle
 *     description: Operations related to cars
 */

/**
 * @swagger
 * /cars:
 *   get:
 *     tags:
 *       - Vehicle
 *     summary: Get all cars
 *     description: Retrieve a list of all cars from the database.
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Successful response
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *       500:
 *         description: Internal Server Error
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 */

/**
 * @swagger
 * /cars/{id}:
 *   get:
 *     tags:
 *       - Vehicle
 *     summary: Get a specific car by ID
 *     description: Retrieve a car from the database based on the provided ID.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the car to retrieve
 *         required: true
 *         type: integer
 *         format: int64
 *     responses:
 *       200:
 *         description: Successful response
 *         schema:
 *           type: object
 *       404:
 *         description: Car not found
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *       500:
 *         description: Internal Server Error
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 */

/**
 * @swagger
 * /cars:
 *   post:
 *     tags:
 *       - Vehicle
 *     summary: Create a new car
 *     description: Create a new car in the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               brand:
 *                 type: string
 *               type:
 *                 type: string
 *               model:
 *                 type: string
 *               year:
 *                 type: integer
 *               price:
 *                 type: number
 *               stock_quantity:
 *                 type: integer
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Car created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */

/**
 * @swagger
 * /cars/{id}:
 *   put:
 *     tags:
 *       - Vehicle
 *     summary: Update a car by ID
 *     description: Update car details like brand,type, model, year, price, and stock quantity.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the car to be updated
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: The car object with updated details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               brand:
 *                 type: string
 *               type:
 *                 type: string
 *               model:
 *                 type: string
 *               year:
 *                 type: integer
 *               price:
 *                 type: number
 *               stock_quantity:
 *                 type: integer
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Car updated successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Car updated successfully
 *       404:
 *         description: Car not found
 *         content:
 *           application/json:
 *             example:
 *               error: Car not found
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */

/**
 * @swagger
 * /cars/{id}:
 *   delete:
 *     tags:
 *       - Vehicle
 *     summary: Delete a car
 *     description: Delete a car based on the provided ID.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Car ID
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Car deleted successfully
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *       404:
 *         description: Car not found
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *       500:
 *         description: Internal Server Error
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 */










  /**
 * @swagger
 * tags:
 *   - name: Orders
 *     description: Operations related to Orders
 */



  /**
 * @swagger
 * /orders:
 *   get:
 *     tags:
 *       - Orders
 *     summary: Get all orders
 *     description: Retrieve a list of all orders from the database.
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Successful response
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *       500:
 *         description: Internal Server Error
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 */



  /**
 * @swagger
 * /orders/{id}:
 *   get:
 *     tags:
 *       - Orders
 *     summary: Get order by ID
 *     description: Retrieve order details from the database based on the provided ID.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the order to retrieve
 *         required: true
 *         type: integer
 *         format: int64
 *     responses:
 *       200:
 *         description: Successful response
 *         schema:
 *           type: object
 *       404:
 *         description: Order not found
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *       500:
 *         description: Internal Server Error
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 */


  /**
 * @swagger
 * /orders:
 *   post:
 *     tags:
 *       - Orders
 *     summary: Create a new order
 *     description: Create a new order in the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *               order_date:
 *                 type: string
 *                 format: date-time
 *               total_amount:
 *                 type: number
 *     responses:
 *       201:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */


  /**
 * @swagger
 * /orders/{id}:
 *   put:
 *     tags:
 *       - Orders
 *     summary: Update an order by ID
 *     description: Update order details like customer ID, order date, and total amount.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the order to be updated
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: The order object with updated details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *               order_date:
 *                 type: string
 *                 format: date-time
 *               total_amount:
 *                 type: number
 *     responses:
 *       200:
 *         description: Order updated successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Order updated successfully
 *       404:
 *         description: Order not found
 *         content:
 *           application/json:
 *             example:
 *               error: Order not found
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */



  /**
 * @swagger
 * /orders/{id}:
 *   delete:
 *     tags:
 *       - Orders
 *     summary: Delete an order
 *     description: Delete an order based on the provided ID.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Order ID
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Order deleted successfully
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *       404:
 *         description: Order not found
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *       500:
 *         description: Internal Server Error
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 */







  /**
 * @swagger
 * tags:
 *   - name: OrderItems
 *     description: Operations related to OrderItems
 */




  /**
 * @swagger
 * /orderitems:
 *   get:
 *     tags:
 *       - OrderItems
 *     summary: Get all order items
 *     description: Retrieve a list of all order items from the database.
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Successful response
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *       500:
 *         description: Internal Server Error
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 */


  /**
 * @swagger
 * /orderitems/{id}:
 *   get:
 *     tags:
 *       - OrderItems
 *     summary: Get order item by ID
 *     description: Retrieve order item details from the database based on the provided ID.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the order item to retrieve
 *         required: true
 *         type: integer
 *         format: int64
 *     responses:
 *       200:
 *         description: Successful response
 *         schema:
 *           type: object
 *       404:
 *         description: Order item not found
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *       500:
 *         description: Internal Server Error
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 */



  /**
 * @swagger
 * /orderitems:
 *   post:
 *     tags:
 *       - OrderItems
 *     summary: Create a new order item
 *     description: Create a new order item in the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderId:
 *                 type: integer
 *               carId:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *               item_price:
 *                 type: number
 *     responses:
 *       201:
 *         description: Order item created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */



  /**
 * @swagger
 * /orderitems/{id}:
 *   put:
 *     tags:
 *       - OrderItems
 *     summary: Update an order item by ID
 *     description: Update order item details like order ID, car ID, quantity, and item price.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the order item to be updated
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: The order item object with updated details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderId:
 *                 type: integer
 *               carId:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *               item_price:
 *                 type: number
 *     responses:
 *       200:
 *         description: Order item updated successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Order item updated successfully
 *       404:
 *         description: Order item not found
 *         content:
 *           application/json:
 *             example:
 *               error: Order item not found
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */



  /**
 * @swagger
 * /orderitems/{id}:
 *   delete:
 *     tags:
 *       - OrderItems
 *     summary: Delete an order item
 *     description: Delete an order item based on the provided ID.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Order item ID
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Order item deleted successfully
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *       404:
 *         description: Order item not found
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *       500:
 *         description: Internal Server Error
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 */


/**
 * @swagger
 * /signup:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: User Signup
 *     description: Register a new user with username, email, and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user.
 *               email:
 *                 type: string
 *                 description: The email of the user.
 *               password:
 *                 type: string
 *                 description: The password of the user.
 *     responses:
 *       201:
 *         description: User successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: User created successfully.
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Username, Email, or password missing.
 *             example:
 *               error: "Username or Email or password missing"
 *       409:
 *         description: Conflict
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: User already exists.
 *             example:
 *               error: "User already exists"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Something went wrong during signup process.
 *             example:
 *               error: "Something went wrong"
 */

/**
 * @swagger
 * /login:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Authenticate user
 *     description: Authenticate a user by email and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email of the user.
 *               password:
 *                 type: string
 *                 description: The password of the user.
 *     responses:
 *       200:
 *         description: Successfully authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   description: The authenticated user's details (excluding password).
 *                 auth:
 *                   type: string
 *                   description: JWT token for authentication. Include this token in the Authorization header for subsequent requests.
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Email or password missing.
 *             example:
 *               error: "Email or password missing"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: No User found or incorrect email/password combination.
 *             example:
 *               error: "No User found or incorrect email/password combination"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Something went wrong during authentication.
 *             example:
 *               error: "Something went wrong during authentication"
 */






/**
 * @swagger
 * /uploadImage:
 *   get:
 *     summary: Retrieve all images
 *     description: Retrieve a list of all uploaded images from the database.
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Successful response
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               ID:
 *                 type: integer
 *               ImageData:
 *                 type: string
 *               Description:
 *                 type: string
 *       500:
 *         description: Internal Server Error
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 */





/**
 * @swagger
 * /uploadImage:
 *   post:
 *     summary: Uploads an image to the database
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - name: imageData
 *         in: formData
 *         description: The image file to be uploaded (JPEG, PNG, etc.)
 *         required: true
 *         type: file
 *       - name: description
 *         in: formData
 *         description: Description of the image
 *         required: true
 *         type: string
 *     responses:
 *       '200':
 *         description: Image uploaded successfully
 *         schema:
 *           type: string
 *       '500':
 *         description: Error uploading image
 *         schema:
 *           type: string
 */






