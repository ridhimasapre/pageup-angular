// scripts/addUser.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

dotenv.config();

const User = require('./models/login'); 
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

async function addUser() {
  try {
    const newUser = new User({
    //   username: 'superadmin',
    //   password: 'super123',
    //   role: 'SuperAdmin'

    // ridhima admin123
     username: 'superadmin2',
      password: 'super1234',
      role: 'SuperAdmin'
    });

    await newUser.save(); // this will trigger pre-save password hash
    console.log('superadmin added successfully ');
    const admin = new User({
      username: 'admin1',
      password: 'admin123',
      role: 'Admin'
    });
    await admin.save();
    console.log(' Admin added successfully');

   const employee = new User({
      username: 'employee1',
      password: 'emp123',
      role: 'Employee'
    });
    await employee.save();
    console.log(' Employee added successfully');

    process.exit();
  } catch (err) {
    console.error(' Error adding user:', err.message);
    process.exit(1);
  }
}

addUser();