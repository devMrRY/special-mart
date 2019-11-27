const express = require("express");
const router = express.Router();
const items = require("../views/models/items");
const user = require("../views/models/user");
const orders = require("../views/models/orders");
const productskeitems = require("../views/models/productskeitems");
const auth =require('../middlewares/auth');

// api to return list of items from items collection for page 2 of stepper form

router.get("/stepperform", auth, async (req, res, next) => {
  await items
    .find({})
    .then(val => {
      res.send(val);
    })
    .catch(err => {
      res.send("error " + err);
    });
});

// api to save products details for the first time that directly comes from stepper page 4

router.post("/save", auth, async (req, res, next) => {
  const { product_name, Itemlist, product_id } = req.body;
  const token = req.headers.authorization;
  const userdata = await user.findOne({ token });
  const user_id = userdata._id;
  try {
    if (product_id) {
      await orders.findByIdAndUpdate(product_id, {
        product_name: product_name
      });
      const arr = Itemlist.map(item => {
        return {
          product_id: product_id[0],
          item_name: Object.keys(item)[0],
          qty: item[Object.keys(item)]
        };
      });

      await productskeitems.deleteMany({ product_id: product_id });
      arr.forEach(ele => {
        productskeitems.insertMany(ele);
      });
      res.send("updated successfully");
    } else {
      await orders.insertMany({ user_id: user_id, product_name: product_name });
      const orderdata = await orders.findOne({ user_id, product_name });
      const product_id = orderdata._id;
      arr = Itemlist.map(item => {
        return {
          product_id: product_id,
          item_name: Object.keys(item)[0],
          qty: item[Object.keys(item)]
        };
      });
      try {
        arr.forEach(ele => {
          productskeitems.insertMany(ele);
        });
        return res.send("Product added successfully");
      } catch (e) {
        return res.send("Please fill all Fields!");
      }
    }
  } catch (e) {
    res.send("Error occured during product save please try again");
  }
});

// api to return productlist from orders collection for dashboard

router.get("/getproduct", auth, async (req, res) => {
  try {
    const token = req.headers.authorization;
    const data = await user.findOne({ token });
    const user_id = data._id;
    const productlist = await orders.find({ user_id });
    const arr = productlist.map(product => {
      return { [product._id]: product.product_name };
    });
    res.send(arr);
  } catch (e) {
    res.send("error occured");
  }
});

/* 
  api to delete product with product_id and user_id from orders collection
  and it's items also.
*/

router.get("/delete/:product_id", auth, async (req, res) => {
  try {
    const token = req.headers.authorization;
    const id = req.params.product_id;
    const userdata = await user.findOne({ token });
    const user_id = userdata._id;
    await productskeitems.deleteMany({ product_id: id });
    await orders.findOneAndDelete({ _id: id, user_id });
    res.send("ok");
  } catch {
    res.send("cannot delete due to some error");
  }
});

// api to return product items after it is saved in mongodb;

router.get("/edit_items/:product_id", auth, async (req, res) => {
  try {
    const { product_id } = req.params;
    const product = await orders.findOne({ _id: product_id });
    const product_name = product.product_name;
    const itemlist = await productskeitems.find({ product_id });
    const arr = itemlist.map(item => {
      return { [item.item_name]: item.qty };
    });
    res.send({ product_name: product_name, itemlist: arr });
  } catch (e) {
    res.send("error");
  }
});

module.exports = router;
