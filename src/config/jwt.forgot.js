const jwt = require("jsonwebtoken");
require("dotenv").config();

const getTokeen = (payload) => {
  return jwt.sign(
    {
      data: payload,
    },
    process.env.JWT_KEY,
    { expiresIn: "10m" }
  );
};

const getTokenData = (token) => {
  let data = null;
  jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
    if (err) {
      console.log("Error al obtener data del token");
    } else {
      data = decoded;
    }
  });

  return data;
};

module.exports = {
  getTokeen,
  getTokenData,
};
