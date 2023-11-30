const jwt = require("jsonwebtoken");
require("dotenv").config();

const getToken = (payload) => {
  return jwt.sign(
    {
      data: payload,
    },
    process.env.JWT_KEY,
    { expiresIn: "1h" }
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
  getToken,
  getTokenData,
};
