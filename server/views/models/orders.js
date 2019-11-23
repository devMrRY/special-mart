const mongoose = require("mongoose");
const Orders = mongoose.Schema;

const orders = new Orders({
  user_id: {
    type: String,
    required: true,
    trim: true
  },
  product_name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2
  }
});

const ordersmodel = mongoose.model("Orders", orders);

module.exports = ordersmodel;