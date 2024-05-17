const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    id: String,
    title: String,
    price: Number,
    description: String,
    category: String,
    image: String,
    dateOfSale: Date,  // Ensure dateOfSale field is included
});


module.exports = mongoose.model('Product', productSchema);