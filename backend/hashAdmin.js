const bcrypt = require("bcryptjs");

bcrypt.hash("Admin1234!@#$", 10).then((hash) => {
  console.log(hash);
  console.log("Longueur :", hash.length);
});