const mongoose = require ('mongoose');

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true, match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, "Veuillez entrer une adresse email correcte"] },
    password: { type: String, required: true }
  });
  
  module.exports = mongoose.model('User', userSchema);