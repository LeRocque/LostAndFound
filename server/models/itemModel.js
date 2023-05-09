const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  itemName: {type: String, required: true},
  foundOn: {type: String, required: true}
})

module.exports = mongoose.model('Item', itemSchema);