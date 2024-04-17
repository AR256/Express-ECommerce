const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    createdDate: {
        type: Date,
        default: Date.now
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;