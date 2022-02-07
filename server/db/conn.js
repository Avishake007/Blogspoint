// Third party import
const mongoose = require("mongoose");
//Local import
const DB = process.env.DATABASE;
//MongoDB Connection
mongoose
  .connect(DB, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Connection succesful");
  })
  .catch((err) => console.log(`no connection`));
