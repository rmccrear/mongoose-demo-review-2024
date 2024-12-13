// TODO: add required modules

// require Common JS modules
const express = require('express');
const mongoose = require('mongoose');
require("dotenv").config();

const app = express();
const port = process.env.PORT;
const User = require("./models/users");



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
  // get all users from mongo
  const users = await User.find({})
  res.json(users);
});

// route to get a single user by id
// Example:
// GET http://localhost:3000/users/123456789
app.get("/users/:uid", async (req, res) => {
  const userId = req.params.uid;
  console.log(userId);
  const user = await User.findOne({ _id: userId })
  res.json(user);
});


app.post('/users', async (req, res) => {
  try {
    const data = req.body;
    const myNewUser = new User({
      name: data.name,
      email: data.email,
      password: data.password
    });
    await myNewUser.save();
    res.json(myNewUser);
  } catch (e) {
    console.log(e);
    res.json({
      error: "cannot create user"
    });
  }
})

// update a specific user by id
app.put("/users/:uid", (req, res) => {
  res.json({
    message: "update the user"
  })
});

app.put("/users/:uid/deactivate", async (req, res) => {
  // const { uid } = req.params;
  const id = req.params.uid;
  console.log(id);

  const deactivatedUser = await User.findByIdAndUpdate(id, { isActive: false }, { new: true });
  if (!deactivatedUser) {
    return res.status(404).send({ error: 'User not found' });
  } else {
    res.json(deactivatedUser);
  }
});

//Deleting a user 
app.delete('/users/:uid', async (req, res) => {
  try {
    const userId = req.params.uid;
    console.log(userId);
    const deletedUser = await User.deleteOne({ _id: userId });
    res.json(deletedUser);
  } catch (e) {
    console.log(e);
    res.json({message: "error deleting user"})
  }
})