const mongoose = require("mongoose");
const { string } = require("prop-types");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  itemName: { type: String, required: true, unique: true },
  foundOn: {
    type: String,
    default: () => {
      const date = new Date();
      return `${
        date.getMonth() + 1
      }/${date.getDate()}/${date.getFullYear()} ${date
        .getHours()
        .toString()
        .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
    },
  },
});

module.exports = mongoose.model("Item", itemSchema);
