const mongoose = require("mongoose");

// mongoose.connect("mongodb://localhost/plants", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true,
// });

// replace your database connection string here
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
  // console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
});

// process.env.DATABASE_URL