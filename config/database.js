const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URL,{
  // gets rid of deprecation warnings
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

const db = mongoose.connection;

// database connection event
db.on("connected", function () {
  console.log(`Mongoose connected to: ${db.host}:${db.port}`);
});