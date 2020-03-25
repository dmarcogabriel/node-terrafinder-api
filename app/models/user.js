const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: String,
  email: String,
  products: [ { type: Schema.Types.ObjectId, ref: 'Products' } ],
});

module.exports = model("User", userSchema);