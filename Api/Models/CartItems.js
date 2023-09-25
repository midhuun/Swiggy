const mongoose = require('mongoose');
const CartSchema = new mongoose.Schema ({
    id:Number,
    count:Number
})
const CartModel = mongoose.model("Cart",CartSchema);
module.exports = CartModel