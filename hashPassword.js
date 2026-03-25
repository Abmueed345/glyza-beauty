const bcrypt = require('bcryptjs'); // Import bcryptjs library

const password = "12345";  // Plain text password (replace with your password)
bcrypt.hash(password, 10, function(err, hashedPassword) {
  if (err) {
    console.error("Error hashing password:", err);
  } else {
    console.log("Hashed Password: ", hashedPassword); // This will log the hashed password to the console
  }
});
