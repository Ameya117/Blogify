const mongoose = require("mongoose");

function connectToMongo(URL) {
  return mongoose.connect(URL).then(() => {
    console.log("Connected to mongo");
    } );;
}

module.exports = connectToMongo;
