const app = require("./app");
require("dotenv").config();

const port = process.env.PORT || 3003;

app.listen(port, () =>
  console.log("Event app is now listening in on port:", port)
);
