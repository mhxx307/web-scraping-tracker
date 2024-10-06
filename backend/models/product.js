var mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productId: String,
    productName: String,
    price: Number,
    date: { type: Date, default: Date.now },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
