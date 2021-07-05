const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema({
  firstName:String,
  lastName:String,
  address: [String]
});

const UserModel = model("User", userSchema);

module.exports = UserModel;
