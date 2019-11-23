const mongoose = require("mongoose");
const productItems = mongoose.Schema;

const productitems = new productItems({
  product_id: {
    type: String,
    required: true,
    trim: true
  },
  item_name: {
    type: String,
    required: true,
    trim: true
  },
  qty: {
    type: Number,
    required: true,
    default: 0,
    validate(value) {
      if (value < 1) {
        throw new Error("quantity can not be negative");
      }
    }
  }
});

const productitemsmodel = mongoose.model("productItems", productitems);

module.exports = productitemsmodel;
