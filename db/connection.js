const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.DB_URL, {
    // userNewUrlParser: true,
    // useCreateIndex: true,
    // useUnifiedTopology: true,
    // useFindAndModify: false,
  })
  .then(() => {
    console.log(`connection successful`);
  })
  .catch((e) => console.log(`no connection`));
