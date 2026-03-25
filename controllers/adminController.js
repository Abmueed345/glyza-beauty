const Order = require("../models/Order");

// show all orders
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().lean(); // lean() => plain objects for EJS
    res.render("admin", { orders }); // admin.ejs
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching orders");
  }
};

// confirm order
exports.confirmOrder = async (req, res) => {
  try {
    await Order.findByIdAndUpdate(req.params.id, { status: "Confirmed" });
    res.redirect("/admin/orders");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error confirming order");
  }
};

// delete order
exports.deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.redirect("/admin/orders");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting order");
  }
};
