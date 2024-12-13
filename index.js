// TODO: add required modules

// require Common JS modules
const express = require('express');
const mongoose = require('mongoose');
require("dotenv").config();

const app = express();
const port = process.env.PORT;

// setup json middleware
app.use(express.json());

// start express server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

// connect to DB
const mongoDbUri = process.env.MONGO_DB_URI;

mongoose
  .connect(mongoDbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");

  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });


// route for get all users
// Example:
// GET http://localhost:3000/users
app.get('/users', async (req, res) => {
  try {
    // get all users from mongo
    res.json({message: "getting all users"});
  } catch (error) {
    res.status(500).json({
      message: 'error fetching users'
    });
  }
});

// route to get a single user by id
// Example:
// GET http://localhost:3000/users/123456789
app.get("/users/:uid", (req, res) => {
  res.json({
    "message": "hi user "
  });
});


app.post('/users', async (req, res) => {
  try {
    res.json({
      "message": "creating a new user..."
    });
  } catch (e) {
      console.error(e);
      res.status(500).json({ error: 'Failed to save user' });
  }
})

// update a specific user by id
app.put("/users/:uid", (req, res) => {
  res.json({
    message: "update the user"
  })
})

//Deleting a user 
app.delete('/users/:uid', async (req, res) => {
    const userId = req.params.uid;
    
    res.json({message: "delete the user " + userId});
})