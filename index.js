require("dotenv").config();
const PORT = process.env.PORT || 3001;
const app = require("./src/app");
const connection = require("./database");

app.listen(PORT, () => {
  connection();
  console.log("Server running on port", PORT);
});
